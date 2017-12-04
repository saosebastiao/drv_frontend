import { computed, observable, action, runInAction } from "mobx";
import { getPromoterVenues, getPromoterParties, getAuctionsForPartyNight, createParty } from "modules/DroverClient";

export default class PartyListModel {
  @observable public partyNights: Array<IPromoterPartyNight> = [];
  @observable public venues: Array<IVenue> = [];
  @observable public partyID: number | null = null;
  @observable private _venueID: number;
  @computed get venueID() {
    return this._venueID;
  }
  set venueID(val: number) {
    this._venueID = val;
    this.setPartyID();
  }
  @observable private _partyNight: string;
  @computed get partyNight() {
    return this._partyNight;
  }
  set partyNight(val: string) {
    this._partyNight = val;
    this.setPartyID();
  }
  @action private setPartyID() {
    if (this._venueID && this._partyNight) {
      const defaultPn: IPromoterPartyNight = { partyNight: "", parties: [] };
      const pn = this.partyNights.find(p => p.partyNight === this.partyNight) || defaultPn;
      const selected = pn.parties.find(p => p.venue.venueID === this._venueID);
      this.partyID = selected && selected.partyID || null;
    } else {
      this.partyID = null;
    }
  }
  @computed get isReady() {
    return this.partyNights.length > 0;
  }

  public createParty = async (partyName: string) => {
    const venue = this.venues.find(x => x.venueID === this.venueID) as IVenue;
    const auctions = await getAuctionsForPartyNight(this.partyNight);
    const auction = auctions.find(x => x.regionID === venue.regionID) as IAuction;
    const res = await createParty(partyName, auction.auctionID, venue.venueID);
    return res;
  }

  public refresh = async () => {
    const v = await getPromoterVenues();
    const sortedVenues = v.sort((a, b) => a.venueID - b.venueID);
    const defaultVenue = sortedVenues[0];
    const p = await getPromoterParties();
    const defaultPartyNight = p[0];
    runInAction(() => {
      this.partyNights = p;
      this.venues = v;
      if (defaultVenue) {
        this._venueID = defaultVenue.venueID;
      }
      if (defaultPartyNight) {
        this._partyNight = defaultPartyNight.partyNight;
      }
    });
  }
  constructor() {
    this.refresh();
  }

}
