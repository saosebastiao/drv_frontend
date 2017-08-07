import { observable, runInAction } from "mobx";
import { getPartyNights } from "modules/DroverClient";


export default class SquadListModel {
	@observable list: Array<IPartyNight> = [];
	async refresh() {
		let x = await getPartyNights();
		runInAction(() => {
			this.list = x;
		});

	}
	constructor() {
		this.refresh();
	}

}