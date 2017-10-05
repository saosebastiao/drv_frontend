import { computed, observable, runInAction } from "mobx";
import { getPromoterProfile } from "modules/DroverClient";

export default class ProfileModel {
  @observable public userID: string;
  @computed get isReady() {
    return this.userID != null;
  }
  @observable public name: string = "";
  @observable public email: string = "";
  @observable public stripeAccount: string = "";
  @observable public validated: boolean = false;
  @observable public complete: boolean = false;
  public async refresh() {
    const res = await getPromoterProfile();
    runInAction(() => {
      Object.assign(this, res);
    });
  }
  constructor() {
    this.refresh();
  }
}
