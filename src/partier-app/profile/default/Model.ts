import { observable, computed, runInAction } from "mobx";
import { getPartierProfile } from "modules/DroverClient";

export default class ProfileModel {
    @observable userID: string;
    @computed get isReady() {
        return this.userID != null;
    }
    @observable name: string = "";
    @observable defaultRegion: string = "";
    @observable gender: string = "";
    @observable photos: Array<string> = [""];
    @observable validated: boolean = false;
    @observable complete: boolean = false;
    async refresh() {
        let res = await getPartierProfile();
        runInAction(() => {
            Object.assign(this, res);
        })
    }
    constructor() {
        this.refresh();
    }
}