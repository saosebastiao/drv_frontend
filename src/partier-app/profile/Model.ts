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
  @observable public photos: Array<IPhoto> = [];
  @observable public stripeAccountID: string;
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
