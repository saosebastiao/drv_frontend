import { observable, computed, runInAction, autorun, toJS } from "mobx";
import { getPartierProfile, getRegions, updateMyProfile } from "modules/DroverClient";


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
    @observable validated: boolean = false;
    @observable complete: boolean = false;
    @observable availRegions: Array<string> = [];
    async refresh() {
        const profile = await getPartierProfile();
        const regions = await getRegions();
        runInAction(() => {
            Object.assign(this, profile);
            this.availRegions = regions.map(x => x.regionID);
        })
    }
    async save() {
        const data = {
            userID: this.userID,
            name: this.name,
            gender: this.gender,
            photos: this.photos,
            defaultRegion: this.defaultRegion
        };
        const newProfile = await updateMyProfile(data);
        Object.assign(this, newProfile);
        return true;

    }
    constructor() {
        this.refresh();
    }
    debug = autorun(() => console.log(toJS(this.photos)))
}