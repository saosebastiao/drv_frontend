import { observable, computed, action, runInAction } from "mobx";
import { getSquad, getPartierAuctionWS } from "modules/DroverClient";
import Logger from "modules/Logger";

export default class AuctionModel {
	@observable auctionState: IAuctionState;
	@observable allSquads: Array<ISquadConfig> = [];
	@observable allParties: Array<IPartyConfig> = [];
	@observable mySquad: ISquad;
	@computed get isReady() {
		return this.mySquad != null && this.auctionState != null;
	}
	subscription = getPartierAuctionWS(this.squadID)
	@action private processEvents(message: IAuctionMessage) {
		if (message.msg === 'CurrentState') {
			Logger.info(message);
			this.auctionState = message.state;
			this.allParties = message.parties || [];
			this.allSquads = message.squads || [];
		} else if (message.msg === 'SquadBidSuccessful') {
			Logger.info(`Squad bid success: ${message.squadID}, ${message.partyID}`);
		} else if (message.msg === 'SquadBidFailed') {
			Logger.info(`Squad bid failed: ${message.squadID}, ${message.partyID}, ${message.reason}`);
		}
	}
	@action setSquadFilters(filters: ISquadFilters) {
		this.mySquad.filters = filters;
		const msg: ISetSquadFilters = { msg: 'SetSquadFilters', filters };
		this.subscription.next(JSON.stringify(msg));
	}
	quit() {
		this.subscription.complete();
	}
	getState() {
		this.subscription.next(JSON.stringify({ msg: 'GetState' }));
	}
	async refresh() {
		const s = await getSquad(this.squadID);
		runInAction(() => {
			this.mySquad = s;
		});
	}
	constructor(private squadID: number) {
		this.refresh();
		this.subscription.subscribe(
			(msg: IAuctionMessage) => this.processEvents(msg),
			(err: any) => Logger.error(err),
			() => Logger.info("Closing Auction Page websocket")
		);
	}

}