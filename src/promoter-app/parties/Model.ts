import { computed, observable, runInAction } from "mobx";
import { getPromoterParties } from "modules/DroverClient";

export default class PartyListModel {
  @observable public list: Array<IPromoterPartyNight> = [];

  @computed get isReady() {
    return this.list.length > 0;
  }
  public refresh = async () => {
    const x = await getPromoterParties();
    runInAction(() => {
      this.list = x;
    });

  }
  constructor() {
    this.refresh();
  }

}
