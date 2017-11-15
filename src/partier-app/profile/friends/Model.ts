import { computed, observable, runInAction } from "mobx";
import { getPartierProfile } from "modules/DroverClient";

export default class ProfileModel {
  @observable public userID: string;
  @computed get isReady() {
    return this.userID != null;
  }
  @observable public name: string = "";
  @observable public defaultRegion: string = "";
  @observable public gender: string = "";
  @observable public photos: Array<string> = [];
  @observable public stripeAccountID: string;
  @computed get profilePhoto() {
    if (this.photos.length > 0) {
      return { backgroundImage: `url(${this.photos[0]})` };
    } else return undefined;
  }
  @computed get otherPhotos() {
    return this.photos.slice(1).map((url) => {
      return { backgroundImage: `url(${url})` };
    });
  }
  @observable public validated: boolean = false;
  @observable public complete: boolean = false;
  public async refresh() {
    const res = await getPartierProfile();
    runInAction(() => {
      Object.assign(this, res);
    });
  }
  constructor() {
    this.refresh();
  }
}
