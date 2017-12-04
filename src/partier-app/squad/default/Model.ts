import { computed, observable, runInAction } from "mobx";
import { createSquad, getAuctionsForPartyNight, getPartierInvites, getPartierProfile } from "modules/DroverClient";

export default class SquadJoinModel {
  @observable public invites: Array<number> = [];
  @observable public ownerID: string = "";
  @observable private _partyNight: string;
  @computed get partyNight() {
    return this._partyNight;
  }
  set partyNight(val: string) {
    this._partyNight = val;
    this.refresh();
  }
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
  public async init() {
    const profile = await getPartierProfile();
    runInAction(() => {
      this.regionID = profile.defaultRegion || "";
      this.ownerID = profile.userID;
    });
    this.refresh();
  }
  public async refresh() {
    const auctions = await getAuctionsForPartyNight(this.partyNight);
    const invites = await getPartierInvites(this.partyNight);
    runInAction(() => {
      this.auctions = auctions || [];
      this.invites = invites.map(x => x.squadID);
    });
  }
  constructor(partyNight: string) {
    this.partyNight = partyNight;
    this.init();
  }
}
