import { observable, computed, runInAction } from "mobx";
import { getPartierInvites } from "modules/DroverClient";


export default class InvitesListModel {
	@observable partyNight: string;
	@observable squads: Array<number>;
	@computed get isReady() {
		return this.squads != null;
	}
	async refresh() {
		const squads = await getPartierInvites(this.partyNight);
		runInAction(() => {
			this.squads = squads.map(x => x.squadID);
		});
	}
	constructor(partyNight: string) {
		this.partyNight = partyNight;
		this.refresh();
	}

}