import {observable} from "mobx";


export default class ProfileModel {
    @observable name: string;
    @observable home: string;
    @observable gender: string;
    @observable photos: Array<string>;
    constructor(){
        this.name = "Daniel";
        this.home = "Seattle";
        this.gender = "Male"
        this.photos = [""];
    }
}