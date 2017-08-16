import { action, observable, computed, runInAction } from "mobx";
import { getPartyNights, getPartierProfile, createSquad } from "modules/DroverClient";

export default class ViewInvitesModel {
    @observable partyNight: string;
    async refresh() {
        const profile = await getPartierProfile();
        const auctions = await getPartyNights();
        runInAction(() => {
        });
    }
    constructor(partyNight: string) {
        this.partyNight = partyNight;
        this.refresh();
    }
}