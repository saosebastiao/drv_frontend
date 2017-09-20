import { computed, observable, runInAction } from "mobx";
import { createSquad, getAuctionsForPartyNight, getPartierProfile } from "modules/DroverClient";

export default class CreateSquadModel {
    @observable public ownerID: string = "";
    @observable public partyNight: string;
    @observable public squadName: string = "";
    @observable public regionID: string = "boo";
    @observable public auctions: Array<IAuction> = [];
    @computed get auctionID() {
        const auction = this.auctions.find((x) => x.regionID === this.regionID);
        return auction && auction.auctionID;
    }
    @computed get isReady() {
        return this.auctions.length > 0;
    }
    public async create() {
        if (this.auctionID != null && this.squadName.length > 0) {
            const data = { squadName: this.squadName, auctionID: this.auctionID, ownerID: this.ownerID };
            const res = await createSquad(data);
            return res.squadID;
        } else throw new Error("boop");

    }
    public async refresh() {
        const profile = await getPartierProfile();
        const auctions = await getAuctionsForPartyNight(this.partyNight);
        runInAction(() => {
            this.auctions = auctions || [];
            this.regionID = profile.defaultRegion || "";
            this.ownerID = profile.userID;
        });
    }
    constructor(partyNight: string) {
        this.partyNight = partyNight;
        this.refresh();
    }
}
