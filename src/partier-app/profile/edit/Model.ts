import { computed, observable, runInAction } from "mobx";
import { getPartierProfile, getRegions, getStripeLink, updatePartierProfile } from "modules/DroverClient";

export default class ProfileModel {
  @observable public stripeCode: string;
  @observable public stripeAccountID: string;
  @observable public stripeLink: string;
  @observable public userID: string;
  @observable public email: string;
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
    if (profile.stripeAccountID) {
      const link = await getStripeLink(profile.stripeAccountID);
      runInAction(() => {
        this.stripeLink = link.url;
      });
    }
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
  @computed get stripeURI() {
    const baseURI = "https://connect.stripe.com/express/oauth/authorize";
    const urlParams = new URLSearchParams();
    urlParams.set("client_id", "ca_BT5Teu6PqNl6WPs7WJwmbkmDyBuCql57");
    urlParams.set("redirect_uri", "http://localhost:8080/partier/profile/edit");
    urlParams.set("stripe_user[email]", this.email);
    urlParams.set("stripe_user[first_name]", this.name);
    return `${baseURI}?${urlParams}`;
  }
  constructor(public queryString: string) {
    const params = new URLSearchParams(queryString);
    const code = params.get("code");
    if (code) {
      this.stripeCode = code;
    }
    this.refresh();
  }
}
