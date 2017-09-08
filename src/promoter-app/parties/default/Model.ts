import { observable, computed, runInAction } from "mobx";
import { getPromoterParties } from "modules/DroverClient";


export default class SquadListModel {
	@observable list: Array<IPromoterPartyNight> = [];

	@computed get isReady() {
		return this.list.length > 0;
	}
	async refresh() {
		let x = await getPromoterParties();
		runInAction(() => {
			this.list = x;
		});

	}
	constructor() {
		this.refresh();
	}

}