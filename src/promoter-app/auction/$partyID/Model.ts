import { observable, computed, runInAction } from "mobx";
import { getParty } from "modules/DroverClient";


export default class AuctionModel {
	@observable allSquads: Array<ISquad>;
	@observable allParties: Array<IParty>;
	@observable myParty: IParty;
	@computed get isReady() {
		return this.myParty != null;
	}
	async refresh() {
		const party = await getParty(this.partyID);
		runInAction(() => {
			this.myParty = party;
		});
	}
	constructor(private partyID: number) {
		this.refresh();
	}

}