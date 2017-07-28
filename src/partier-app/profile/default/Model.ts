import { observable, computed, runInAction } from "mobx";
import { getPartierProfile, getMyFriends } from "modules/DroverClient";

export default class ProfileModel {
    @observable userID: string;
    @computed get isReady() {
        return this.userID != null;
    }
    @observable name: string = "";
    @observable defaultRegion: string = "";
    @observable gender: string = "";
    @observable photos: Array<string> = [];
    @computed get profilePhoto() {
        if (this.photos.length > 0)
            return { backgroundImage: `url(${this.photos[0]})` };
    }
    @computed get otherPhotos() {
        return this.photos.slice(1).map(url => {
            return { backgroundImage: `url(${url})` };
        });
    }
    @observable friends: IPartierFriends;
    @computed get pendingFriends() {
        return this.friends && this.friends.pending || [];
    }
    @computed get acceptedFriends() {
        return this.friends && this.friends.accepted || [];
    }
    @computed get potential() {
        return this.friends && this.friends.potential || [];
    }
    @observable validated: boolean = false;
    @observable complete: boolean = false;
    async refresh() {
        let res = await getPartierProfile();
        let friends = await getMyFriends();
        console.log(friends);
        runInAction(() => {
            Object.assign(this, res);
            this.friends = friends;
        })
    }
    constructor() {
        this.refresh();
    }
}