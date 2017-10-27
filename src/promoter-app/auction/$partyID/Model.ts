import { action, computed, observable, runInAction } from "mobx";
import { getParty, getPartyAuctionWS } from "modules/DroverClient";
import Logger from "modules/Logger";

export default class AuctionModel {
  @observable public auctionState: IAuctionState;
  @observable public allSquads: Array<ISquadConfig> = [];
  @observable public allParties: Array<IPartyConfig> = [];
  @observable public myParty: IParty;
  @observable public myBids: Map<number, IPartyBidResponse> = new Map();

  @observable public sortType: "f" | "r" = "f";
  @action public toggleSort = () => {
    if (this.sortType === "f") {
      this.sortType = "r";
    } else {
      this.sortType = "f";
    }
  }

  @computed get allSquadsSorted() {
    let sortFunc: (a: ISquadConfig, b: ISquadConfig) => number;
    if (this.sortType === "f") {
      sortFunc = (a, b) => a.squadID - b.squadID;
    } else {
      sortFunc = (a, b) => b.squadID - a.squadID;
    }
    const x = this.allSquads.slice().sort(sortFunc);
    return x;
  }

  @computed get isReady() {
    return this.myParty != null && this.auctionState != null;
  }
  @computed get isBiddable() {
    return this.auctionState.state === "ActiveAuction";
  }
  public isSquadBlacklisted(squadID: number) {
    const s = new Set(this.myParty.filters.squadBlacklist);
    return s.has(squadID);
  }
  @action public toggleSquadBlacklist(squadID: number) {
    const s = new Set(this.myParty.filters.squadBlacklist);
    if (s.has(squadID)) {
      s.delete(squadID);
    } else {
      s.add(squadID);
    }
    const filters: IPartyFilters = Object.assign({}, this.myParty.filters, { squadBlacklist: Array.from(s) });
    const msg: ISetPartyFilters = { msg: "SetPartyFilters", filters };
    this.subscription.next(JSON.stringify(msg));
  }
  private subscription = getPartyAuctionWS(this.partyID);
  @action private processEvents(message: IPartyAuctionMessage) {
    if (message.msg === "CurrentState") {
      Logger.info(message);
      this.auctionState = message.state;
      this.allParties = message.parties;
      this.allSquads = message.squads;
    } else if (message.msg === "SquadBidReceived") {
      this.myBids.set(message.squadID, message);
      Logger.info(`Squad bid received: ${JSON.stringify(message)}`);
    } else if (message.msg === "SquadBidSuccessful") {
      this.myBids.set(message.squadID, message);
      Logger.info(`Squad bid success: ${JSON.stringify(message)}`);
    } else if (message.msg === "SquadBidFailed") {
      this.myBids.set(message.squadID, message);
      Logger.info(`Squad bid failed: ${JSON.stringify(message)}`);
    } else if (message.msg === "SquadBidDropped") {
      this.myBids.delete(message.squadID);
      Logger.info(`Squad bid failed: ${JSON.stringify(message)}`);
    } else if (message.msg === "SquadTaken") {
      Logger.info(`Squad taken: ${JSON.stringify(message)}`);
    } else if (message.msg === "PartyFiltersUpdated") {
      Logger.info(message);
      this.myParty.filters = message.filters;
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
  public submitSealedBid = (squadID: number, price: number) => {
    const validStates = new Set(["ActiveAuction", "EntryFreeze", "PreAuction"]);
    if (validStates.has(this.auctionState.state)) {
      const bidMessage: IBid = {
        msg: "Bid",
        squadID,
        price
      };
      Logger.debug(bidMessage);
      this.subscription.next(JSON.stringify(bidMessage));
    }
  }
  public submitBid = (squadID: number) => {
    if (this.auctionState.state === "ActiveAuction") {
      const bidMessage: IBid = {
        msg: "Bid",
        squadID,
        price: this.auctionState.price
      };
      this.subscription.next(JSON.stringify(bidMessage));
    }
  }
  public dropBid = (squadID: number) => {
    const bidMessage: IDropBid = {
      msg: "DropBid",
      squadID
    };
    this.subscription.next(JSON.stringify(bidMessage));
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
      (msg: IPartyAuctionMessage) => this.processEvents(msg),
      (err: any) => Logger.error(err),
      () => Logger.info("Closing Auction Page websocket")
    );
  }
}
