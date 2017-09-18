import { observable, computed, runInAction } from "mobx";
import { getSquad, getPartierAuctionWS } from "modules/DroverClient";


function msgProcessor() {

}

export default class AuctionModel {
	@observable allSquads: Array<ISquad>;
	@observable allParties: null;
	@observable mySquad: ISquad;
	@computed get isReady() {
		return this.mySquad != null;
	}
	subscription = getPartierAuctionWS(this.squadID)
	quit() {
		this.subscription.complete();
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
			(msg: any) => console.log(msg),
			(err: any) => console.log(err),
			() => console.log("complete")
		);
	}

}