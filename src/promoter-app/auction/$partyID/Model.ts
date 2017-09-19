import { computed, observable, runInAction } from "mobx";
import { getParty } from "modules/DroverClient";

export default class AuctionModel {
  @observable public allSquads: Array<ISquad>;
  @observable public allParties: Array<IParty>;
  @observable public myParty: IParty;
  @computed get isReady() {
    return this.myParty != null;
  }
  public async refresh() {
    const party = await getParty(this.partyID);
    runInAction(() => {
      this.myParty = party;
    });
  }
  constructor(private partyID: number) {
    this.refresh();
  }

}
