import { action, observable, computed, runInAction } from "mobx";
import { getAuctionsForNight, getPartierProfile, createSquad } from "modules/DroverClient";

export default class CreateSquadModel {
    @observable partyNight: string;
    @observable squadName: string = "";
    @observable regionID: string = "boo";
    @observable auctions: Array<IAuction> = [];
    @computed get auctionID() {
        const auction = this.auctions.find(x => x.regionID === this.regionID);
        return auction && auction.auctionID;
    }
    @computed get isReady() {
        return this.auctions.length > 0;
    }
    async create() {
        if (this.auctionID != null && this.squadName.length > 0) {
            const res = await createSquad(this.partyNight, { squadName: this.squadName, auctionID: this.auctionID });
            return res.squadID;
        } else throw new Error("boop");

    }
    async refresh() {
        const profile = await getPartierProfile();
        const auctions = await getAuctionsForNight(this.partyNight);
        runInAction(() => {
            this.auctions = auctions || [];
            this.regionID = profile.defaultRegion || "";
        });
    }
    constructor(partyNight: string) {
        this.partyNight = partyNight;
        this.refresh();
    }
}