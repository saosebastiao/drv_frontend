import { computed, observable, runInAction } from "mobx";
import { getPromoterParties } from "modules/DroverClient";

export default class SquadListModel {
  @observable public list: Array<IPromoterPartyNight> = [];

  @computed get isReady() {
    return this.list.length > 0;
  }
  public async refresh() {
    const x = await getPromoterParties();
    runInAction(() => {
      this.list = x;
    });

  }
  constructor() {
    this.refresh();
  }

}
