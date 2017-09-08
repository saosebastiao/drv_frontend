import { observable, computed, runInAction } from "mobx";
import { getPromoterParties } from "modules/DroverClient";


export default class AuctionListModel {
	@observable partyNights: Array<IPromoterPartyNight>;
	@computed get isReady() {
		return this.partyNights != null;
	}
	async refresh() {
		const parties = await getPromoterParties();
		runInAction(() => {
			this.partyNights = parties.filter(x => x.parties.length > 0);
		});
	}
	constructor() {
		this.refresh();
	}

}