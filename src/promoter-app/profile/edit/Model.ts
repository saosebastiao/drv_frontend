import { observable, computed, runInAction, autorun, toJS } from "mobx";
import { getPromoterProfile, updatePromoterProfile } from "modules/DroverClient";


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
        const profile = await getPromoterProfile();
        runInAction(() => {
            Object.assign(this, profile);
        })
    }
    async save() {
        const data = {
            userID: this.userID,
            name: this.name,
            email: this.email,
        };
        const newProfile = await updatePromoterProfile(data);
        Object.assign(this, newProfile);
        return true;

    }
    constructor() {
        this.refresh();
    }
}