import { action, computed, observable, runInAction } from "mobx";
import { getSquad, getSquadAuctionWS } from "modules/DroverClient";
import Logger from "modules/Logger";

export default class AuctionModel {
  @observable public auctionState: IAuctionState;
  @observable public allSquads: Array<ISquadConfig> = [];
  @observable public allParties: Array<IPartyConfig> = [];
  @observable public mySquad: ISquad;
  public isVenueBlacklisted(venueID: number) {
    const s = new Set(this.mySquad.filters.venueBlacklist);
    return s.has(venueID);
  }
  public isPartyBlacklisted(partyID: number) {
    const s = new Set(this.mySquad.filters.partyBlacklist);
    return s.has(partyID);
  }
  @action public toggleVenueBlacklist(venueID: number) {
    const s = new Set(this.mySquad.filters.venueBlacklist);
    if (s.has(venueID)) {
      s.delete(venueID);
    } else {
      s.add(venueID);
    }
    const filters: ISquadFilters = Object.assign({}, this.mySquad.filters, { venueBlacklist: Array.from(s) });
    const msg: ISetSquadFilters = { msg: "SetSquadFilters", filters };
    this.subscription.next(JSON.stringify(msg));
  }
  @action public togglePartyBlacklist(partyID: number) {
    const s = new Set(this.mySquad.filters.partyBlacklist);
    if (s.has(partyID)) {
      s.delete(partyID);
    } else {
      s.add(partyID);
    }
    const filters: ISquadFilters = Object.assign({}, this.mySquad.filters, { partyBlacklist: Array.from(s) });
    const msg: ISetSquadFilters = { msg: "SetSquadFilters", filters };
    this.subscription.next(JSON.stringify(msg));
  }
  @action public setSquadFilters() {
    const msg: ISetSquadFilters = { msg: "SetSquadFilters", filters: this.mySquad.filters };
    Logger.debug(JSON.stringify(msg));
    this.subscription.next(JSON.stringify(msg));
  }

  @computed get isReady() {
    return this.mySquad != null && this.auctionState != null;
  }
  private subscription = getSquadAuctionWS(this.squadID);
  @action private processEvents(message: ISquadAuctionMessage) {
    if (message.msg === "CurrentState") {
      Logger.info(message);
      this.auctionState = message.state;
      this.allParties = message.parties || [];
      this.allSquads = message.squads || [];
    } else if (message.msg === "SquadBidSuccessful") {
      Logger.info(`Squad bid success: ${JSON.stringify(message)}`);
    } else if (message.msg === "SquadFiltersUpdated") {
      Logger.info(message);
      this.mySquad.filters = message.filters;
    }
  }
  public quit() {
    this.subscription.complete();
    this.subscription.unsubscribe();
  }
  public getState() {
    this.subscription.next(JSON.stringify({ msg: "GetState" }));
  }
  public async refresh() {
    const s = await getSquad(this.squadID);
    runInAction(() => {
      this.mySquad = s;
    });
  }
  constructor(private squadID: number) {
    this.refresh();
    this.subscription.subscribe(
      (msg: ISquadAuctionMessage) => this.processEvents(msg),
      (err: any) => Logger.error(err),
      () => Logger.info("Closing Auction Page websocket")
    );
  }
}
