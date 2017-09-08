import { observable, computed, runInAction } from "mobx";
import { getPromoterProfile } from "modules/DroverClient";

export default class ProfileModel {
    @observable userID: string;
    @computed get isReady() {
        return this.userID != null;
    }
    @observable name: string = "";
    @observable email: string = "";
    @observable validated: boolean = false;
    @observable complete: boolean = false;
    async refresh() {
        let res = await getPromoterProfile();
        runInAction(() => {
            Object.assign(this, res);
        })
    }
    constructor() {
        this.refresh();
    }
}