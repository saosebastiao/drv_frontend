import { observable, runInAction } from "mobx";
import { getPromoterVenues } from "modules/DroverClient";

export default class SquadListModel {
  @observable public list: Array<IVenue> = [];
  public async refresh() {
    const x = await getPromoterVenues();
    runInAction(() => {
      this.list = x;
    });

  }
  constructor() {
    this.refresh();
  }

}
