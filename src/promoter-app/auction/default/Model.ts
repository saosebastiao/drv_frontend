import { observable, computed, runInAction } from "mobx";
import { getPartierAuctions } from "modules/DroverClient";


export default class AuctionModel {
	@observable squads: Array<ISquad>;
	@computed get isReady() {
		return this.squads != null;
	}
	async refresh() {
		const auction = await getPartierAuctions();
		runInAction(() => {
			this.squads = auction;
		});
	}
	constructor() {
		this.refresh();
	}

}