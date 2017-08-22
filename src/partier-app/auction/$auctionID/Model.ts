import { observable, computed, runInAction } from "mobx";
import { getAuctionSquad } from "modules/DroverClient";


export default class AuctionModel {
	@observable mySquad: ISquad;
	@computed get isReady() {
		return this.mySquad != null;
	}
	async refresh() {
		const s = await getAuctionSquad(this.auctionID);
		runInAction(() => {
			this.mySquad = s;
		});
	}
	constructor(private auctionID: number) {
		this.refresh();
	}

}