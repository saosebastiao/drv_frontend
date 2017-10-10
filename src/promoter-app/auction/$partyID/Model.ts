import { action, computed, observable, runInAction } from "mobx";
import { getParty, getPartyAuctionWS } from "modules/DroverClient";
import Logger from "modules/Logger";

export default class AuctionModel {
  @observable public auctionState: IAuctionState;
  @observable public allSquads: Array<ISquadConfig> = [];
  @observable public allParties: Array<IPartyConfig> = [];
  @observable public myParty: IParty;
  @computed get isReady() {
    return this.myParty != null && this.auctionState != null;
  }
  @computed get isBiddable() {
    return this.auctionState.state === "ActiveAuction";
  }
  private subscription = getPartyAuctionWS(this.partyID);
  @action private processEvents(message: IAuctionMessage) {
    if (message.msg === "CurrentState") {
      Logger.info(message);
      this.auctionState = message.state;
      this.allParties = message.parties;
      this.allSquads = message.squads;
    } else if (message.msg === "SquadBidSuccessful") {
      Logger.info(`Squad bid success: ${message.squadID}, ${message.partyID}`);
    } else if (message.msg === "SquadBidFailed") {
      Logger.info(`Squad bid failed: ${message.squadID}, ${message.partyID}, ${message.reason}`);
    }
  }
  @action public setPartyFilters(filters: IPartyFilters) {
    this.myParty.filters = filters;
    const msg: ISetSquadFilters = { msg: "SetSquadFilters", filters };
    this.subscription.next(JSON.stringify(msg));
  }
  public quit() {
    this.subscription.complete();
    this.subscription.unsubscribe();
  }
  public bid = (squadID: number) => {
    if (this.auctionState.state === "ActiveAuction") {
      const bidMessage: IBid = {
        msg: "Bid",
        squadID,
        price: this.auctionState.price
      };
      this.subscription.next(JSON.stringify(bidMessage));
    }
  }
  public getState() {
    this.subscription.next(JSON.stringify({ msg: "GetState" }));
  }
  public async refresh() {
    const p = await getParty(this.partyID);
    runInAction(() => {
      this.myParty = p;
    });
  }
  constructor(private partyID: number) {
    this.refresh();
    this.subscription.subscribe(
      (msg: IAuctionMessage) => this.processEvents(msg),
      (err: any) => Logger.error(err),
      () => Logger.info("Closing Auction Page websocket")
    );
  }
}
