import { action, observable, computed, runInAction } from "mobx";
import { getParty } from "modules/DroverClient";

export default class ViewPartyModel {
    partyID: number;
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
    constructor(partyID: number) {
        this.partyID = partyID;
        this.refresh();
    }
}