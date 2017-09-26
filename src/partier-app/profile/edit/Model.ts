import { computed, observable, runInAction } from "mobx";
import { getPartierProfile, getRegions, updatePartierProfile } from "modules/DroverClient";

export default class ProfileModel {
  @observable public stripeCode: string;
  @observable public stripeURI: string;
  @observable public userID: string;
  @computed get isReady() {
    return this.userID != null;
  }
  @observable public name: string = "";
  @observable public defaultRegion: string = "none";
  @observable public gender: string = "";
  @observable public photos: Array<string> = [];
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
      photos: this.photos,
      defaultRegion: this.defaultRegion,
      stripeCode: this.stripeCode
    };
    const newProfile = await updatePartierProfile(data);
    Object.assign(this, newProfile);
    return true;
  }
  constructor(queryString: string) {
    const urlParams1 = new URLSearchParams();
    urlParams1.append("client_id", "ca_BT5Teu6PqNl6WPs7WJwmbkmDyBuCql57");
    urlParams1.append("redirect_uri", "http://localhost:8080/partier/profile/edit");
    urlParams1.append("stateToken", "BLAHBLAHBLAH");
    const baseURI = "https://connect.stripe.com/express/oauth/authorize";
    this.stripeURI = `${baseURI}?${urlParams1}`;
    // tslint:disable-next-line:no-console
    const params = new URLSearchParams(queryString);
    const code = params.get("code");
    if (code) {
      this.stripeCode = code;
    }
    this.refresh();
  }
}
