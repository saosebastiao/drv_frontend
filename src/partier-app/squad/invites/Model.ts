import { observable, computed, runInAction } from "mobx";
import { getPartierInvites, getSquad } from "modules/DroverClient";


export default class InvitesListModel {
	@observable partyNight: string;
	@observable squads: Map<number, ISquad>;
	@computed get squadList() {
		const list: Array<ISquad> = [];
		this.squads.forEach((v, k) => {
			list.push(v);
		});
		return list;
	}
	@computed get isReady() {
		return this.squads != null;
	}
	async refresh() {
		const squads = new Map<number, ISquad>();
		const list = await getPartierInvites(this.partyNight);
		for (let { squadID } of list) {
			const squad = await getSquad(squadID);
			squads.set(squadID, squad);
		}
		runInAction(() => {
			this.squads = squads;
		});
	}
	constructor(partyNight: string) {
		this.partyNight = partyNight;
		this.refresh();
	}

}