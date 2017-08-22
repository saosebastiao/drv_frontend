import { observable, computed, runInAction } from "mobx";
import { getPartierAuctions } from "modules/DroverClient";


export default class AuctionListModel {
	@observable auctions: Array<ISquad>;
	@computed get isReady() {
		return this.auctions != null;
	}
	async refresh() {
		const auctions = await getPartierAuctions();
		runInAction(() => {
			this.auctions = auctions;
		});
	}
	constructor() {
		this.refresh();
	}

}