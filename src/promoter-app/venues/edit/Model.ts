import { observable, computed, runInAction, autorun, toJS } from "mobx";
import { getVenue, updateVenue } from "modules/DroverClient";


export default class EditVenueModel {
    venueID: number;
    @observable venueName: string;
    @observable regionID: string;
    @observable address: string;
    @observable photos: Array<string> = [];
    @observable location?: GeoJSON.Point;
    @observable filters?: IVenueFilters;
    @computed get isReady() {
        return this.venueName != null;
    }
    @computed get profilePhoto() {
        if (this.photos.length > 0)
            return { backgroundImage: `url(${this.photos[0]})` };
    }
    @computed get otherPhotos() {
        return this.photos.slice(1).map(url => {
            return { backgroundImage: `url(${url})` };
        });
    }
    async refresh() {
        const profile = await getVenue(this.venueID);
        runInAction(() => {
            Object.assign(this, profile);
        })
    }
    async save() {
        const newProfile = await updateVenue(this.venueID, this.venueName, this.photos);
        Object.assign(this, newProfile);
        return newProfile;
    }
    constructor(venueID: number) {
        this.venueID = venueID;
        this.refresh();
    }
}