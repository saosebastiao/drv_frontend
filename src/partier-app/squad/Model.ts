import { observable, runInAction } from "mobx";
import { getPartyNights } from "modules/DroverClient";

export default class SquadListModel {
  @observable public list: Array<IPartierPartyNight> = [];
  public async refresh() {
    const x = await getPartyNights();
    runInAction(() => {
      this.list = x;
    });

  }
  constructor() {
    this.refresh();
  }
}
