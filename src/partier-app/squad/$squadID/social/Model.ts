import { computed, observable, runInAction } from "mobx";
import { getSquad } from "modules/DroverClient";

export default class EditSocialModel {
  @observable public squad: ISquad;
  @computed public get isReady() {
    return this.squad != null;
  }
  public refresh = async () => {
    const squad = await getSquad(this.squadID);
    runInAction(() => {
      this.squad = squad;
    });
  }
  constructor(public squadID: number) {
    this.refresh();
  }
}
