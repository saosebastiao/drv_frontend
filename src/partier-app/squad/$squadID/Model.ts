import { action, observable, computed, runInAction } from "mobx";
import { getUserID, getSquad } from "modules/DroverClient";

export default class ViewSquadModel {
    @observable userID: string = "";
    @observable ownerID: string = "";
    @observable squadID: number;
    @observable partyNight: string;
    @observable squadName: string = "";
    @observable regionID: string = "boo";
    @computed get isOwned() {
        return this.userID === this.ownerID;
    }
    @computed get isReady() {
        return this.ownerID.length > 0;
    }
    async refresh() {
        const userID = getUserID();
        const squad = await getSquad(this.squadID);
        runInAction(() => {
            this.userID = userID || "";
        });
    }
    constructor(squadID: number) {
        this.squadID = squadID;
        this.refresh();
    }
}