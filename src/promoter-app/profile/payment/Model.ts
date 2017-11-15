import { computed, observable, runInAction } from "mobx";
import { getPromoterProfile, updatePromoterProfile } from "modules/DroverClient";

export default class ProfileModel {
  @observable public userID: string;
  @computed get isReady() {
    return this.userID != null;
  }
  @observable public name: string = "";
  @observable public email: string = "";
  @observable public validated: boolean = false;
  @observable public complete: boolean = false;
  public async refresh() {
    const profile = await getPromoterProfile();
    runInAction(() => {
      Object.assign(this, profile);
    });
  }
  public async save() {
    const data = {
      userID: this.userID,
      name: this.name,
      email: this.email
    };
    const newProfile = await updatePromoterProfile(data);
    Object.assign(this, newProfile);
    return true;
  }
  constructor() {
    this.refresh();
  }
}
