import { observable, computed, runInAction } from "mobx";
//import { getPartierProfile } from "modules/DroverClient";

export default class ProfileModel {
    @observable userID: string;
    @computed get isReady() {
        return this.userID != null;
    }
    @observable name: string;
    @observable defaultRegion: string;
    @observable gender: string;
    @observable photos: Array<string>;
    async refresh() {
        //let x = await getPartierProfile();
        runInAction(() => {
            //Object.assign(this, x);
        })
    }
    constructor() {
        this.userID = "";
        this.name = "Daniel";
        this.defaultRegion = "Seattle";
        this.gender = "Male"
        this.photos = [""];
        this.refresh();
    }
}