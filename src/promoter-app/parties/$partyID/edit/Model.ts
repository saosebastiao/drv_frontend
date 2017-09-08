import { observable, computed, runInAction } from "mobx";
import { getParty } from "modules/DroverClient";


export default class PartyEditModel {
	@observable partyName: string;
	@observable filters?: IPartyFilters;
	@observable venue: IVenue;
	@observable auction: IAuction;
	@computed get isReady() {
		return this.partyName != null;
	}
	async refresh() {
		const party = await getParty(this.partyID);
		runInAction(() => {
			Object.assign(this, party);
		});
	}
	constructor(public partyID: number) {
		this.refresh();
	}

}