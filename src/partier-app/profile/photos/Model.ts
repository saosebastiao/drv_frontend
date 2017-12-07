import { computed, observable, runInAction } from "mobx";
import { getPartierProfile, getRegions, updatePartierProfile } from "modules/DroverClient";

export default class ProfileModel {
  @observable public userID: string;
  @observable public email: string;
  @computed get isReady() {
    return this.userID != null;
  }
  @observable public name: string = "";
  @observable public defaultRegion: string = "none";
  @observable public gender: string = "";
  @observable public photos: Array<string | undefined> = [, , , ,];
  @observable public validated: boolean = false;
  @observable public complete: boolean = false;
  @observable public availRegions: Array<string> = [];
  public async refresh() {
    const profile = await getPartierProfile();
    const regions = await getRegions();
    runInAction(() => {
      Object.assign(this, profile);
      this.availRegions = regions.map((x) => x.regionID);
    });
  }
  public async save() {
    const data = {
      userID: this.userID,
      name: this.name,
      gender: this.gender,
      photos: this.photos.filter(x => x) as Array<string>,
      defaultRegion: this.defaultRegion
    };
    const newProfile = await updatePartierProfile(data);

    Object.assign(this, newProfile);
    return true;
  }
  constructor() {
    this.refresh();
  }
}
