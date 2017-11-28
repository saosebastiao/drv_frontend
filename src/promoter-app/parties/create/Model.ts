import { computed, observable, runInAction } from "mobx";
import {
  createParty,
  getAuctionsForPartyNight,
  getPromoterPartiesByPartyNight,
  getPromoterVenues
} from "modules/DroverClient";

export default class CreatePartyModel {
  @observable public _partyNight: string;
  @computed get partyNight() {
    return this._partyNight;
  }
  set partyNight(val: string) {
    this._partyNight = val;
    this.refresh();
  }
  @observable public partyName: string = "";
  @observable public venueID: number;
  @observable public venues: Array<IVenue> = [];
  @observable public auctions: Array<IAuction> = [];
  @computed get isReady() {
    return this.venues.length > 0;
  }
  @computed get venue() {
    return this.venues.find((x) => x.venueID === this.venueID);
  }
  @computed get auction() {
    const regionID = this.venue && this.venue.regionID;
    return this.auctions.find((x) => x.regionID === regionID);
  }
  public async create() {
    if (this.venue && this.auction && this.partyName.length > 0) {
      const party = await createParty(this.partyName, this.auction.auctionID, this.venueID);
      return party.partyID;
    } else return undefined;
  }
  public async refresh() {
    const auctions = await getAuctionsForPartyNight(this.partyNight);
    const existingParties = await getPromoterPartiesByPartyNight(this.partyNight);
    const removeList = new Set(existingParties.map((x) => x.venue.venueID));
    const venues = await getPromoterVenues();
    const validVenues = venues.filter((x) => !removeList.has(x.venueID));
    const firstVenue = validVenues.find((x) => x.venueID != null);
    runInAction(() => {
      this.venues = validVenues;
      this.venueID = firstVenue && firstVenue.venueID || -1;
      this.auctions = auctions;
    });
  }
  constructor(partyNight: string) {
    this.partyNight = partyNight;
    this.refresh();
  }
}
