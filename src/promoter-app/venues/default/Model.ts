import { observable, runInAction } from "mobx";
import { getPromoterVenues } from "modules/DroverClient";


export default class SquadListModel {
	@observable list: Array<IVenue> = [];
	async refresh() {
		let x = await getPromoterVenues();
		runInAction(() => {
			this.list = x;
		});

	}
	constructor() {
		this.refresh();
	}

}