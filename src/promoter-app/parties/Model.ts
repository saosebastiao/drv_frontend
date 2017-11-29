import { computed, observable, runInAction } from "mobx";
import { getPromoterVenues, getPromoterParties } from "modules/DroverClient";

export default class PartyListModel {
  @observable public partyNights: Array<IPromoterPartyNight> = [];
  @observable public venues: Array<IVenue> = [];
  @computed get isReady() {
    return this.partyNights.length > 0;
  }
  public refresh = async () => {
    const v = await getPromoterVenues();
    const p = await getPromoterParties();
    runInAction(() => {
      this.partyNights = p;
      this.venues = v.sort((a, b) => a.venueID - b.venueID);
    });
  }
  constructor() {
    this.refresh();
  }

}
