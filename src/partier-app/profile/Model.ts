import { computed, observable, runInAction } from "mobx";
import { getPartierProfile, getPartierFriends } from "modules/DroverClient";

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
  @observable public friends: IPartierFriends;
  @computed get rejected() {
    return this.friends && this.friends.rejected || [];
  }
  @computed get invited() {
    return this.friends && this.friends.invited || [];
  }
  @computed get invitations() {
    return this.friends && this.friends.invitations || [];
  }
  @computed get accepted() {
    return this.friends && this.friends.accepted || [];
  }
  @computed get potential() {
    return this.friends && this.friends.potential || [];
  }
  public async refresh() {
    const profile = await getPartierProfile();
    const friends = await getPartierFriends();
    runInAction(() => {
      Object.assign(this, profile);
      this.friends = friends;
    });
  }
  constructor() {
    this.refresh();
  }
}
