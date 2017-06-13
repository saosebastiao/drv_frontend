import { observable } from "mobx";
import { getPartier } from "modules/DroverClient";


export default class ProfileModel {
    @observable name: string;
    @observable home: string;
    @observable gender: string;
    @observable photos: Array<string>;
    async refresh() {
        let x = await getPartier();
        console.log(x);
    }
    constructor() {
        this.name = "Daniel";
        this.home = "Seattle";
        this.gender = "Male"
        this.photos = [""];
        this.refresh();
    }
}