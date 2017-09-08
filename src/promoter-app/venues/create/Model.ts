import { observable, computed, runInAction } from "mobx";
import { getRegions, geocodeAddress, createVenue } from "modules/DroverClient";

export default class CreateVenueModel {
    @observable venueID: string;
    @observable venueName: string = "";
    @observable address: string = "";
    @observable regionID: string = "";
    @observable regions: Array<string> = [];
    @computed get isReady() {
        return this.regions.length > 0;
    }
    @computed get isGeocodable() {
        return this.address.length > 0;
    }
    @computed get isSearchable() {
        return this.venueName.length > 0 && this.regionID.length > 0;
    }
    @computed get isSubmitable() {
        return this.address.length > 0 && this.regionID.length > 0;
    }

    async refresh() {
        let res = await getRegions();
        runInAction(() => {
            this.regions = res.map(x => x.regionID);
        });
    }

    async create() {
        let res = await createVenue(this.venueName, this.regionID, this.address);
        runInAction(() => {
            Object.assign(this, res);
        });
        res;
    }

    async geocode() {
        let res = await geocodeAddress(this.address);
        runInAction(() => {
            Object.assign(this, res);
        })
    }

    constructor() {
        this.refresh();
    }
}