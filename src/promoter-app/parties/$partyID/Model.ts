import { computed, observable, runInAction } from "mobx";
import { getParty } from "modules/DroverClient";

export default class ViewPartyModel {
    public partyID: number;
    @observable public partyName: string;
    @observable public filters?: IPartyFilters;
    @observable public venue: IVenue;
    @observable public auction: IAuction;
    @computed get isReady() {
        return this.partyName != null;
    }
    public async refresh() {
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
