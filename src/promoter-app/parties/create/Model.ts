import { action, observable, computed, runInAction } from "mobx";
import { getAuctionsForPartyNight, getPromoterVenues, createParty } from "modules/DroverClient";

export default class CreatePartyModel {
    partyNight: string;
    @observable partyName: string;
    @observable venueID: number;
    @observable venues: Array<IVenue> = [];
    @observable auctions: Array<IAuction> = [];
    @computed get isReady() {
        return this.venues.length > 0;
    }
    @computed get venue() {
        return this.venues.find(x => x.venueID === this.venueID);
    }
    @computed get auction() {
        const regionID = this.venue && this.venue.regionID;
        return this.auctions.find(x => x.regionID === regionID);
    }
    async create() {
        if (this.venue && this.auction && this.partyName.length > 0) {
            const party = await createParty(this.partyName, this.auction.auctionID, this.venueID);
            return party.partyID;
        }
    }
    async refresh() {
        const auctions = await getAuctionsForPartyNight(this.partyNight);
        const venues = await getPromoterVenues();
        const firstVenue = venues.find(x => x.venueID != null)
        runInAction(() => {
            this.venues = venues;
            this.auctions = auctions;
            this.venueID = firstVenue && firstVenue.venueID || -1;
        });
    }
    constructor(partyNight: string) {
        console.log(partyNight);
        this.partyNight = partyNight;
        this.refresh();
    }
}