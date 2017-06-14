import { observable, computed } from "mobx";
import { getPartier } from "modules/DroverClient";

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
        let x = await getPartier();
        console.log(x);
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