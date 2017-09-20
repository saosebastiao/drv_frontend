import { computed, observable, runInAction } from "mobx";
import { createVenue, geocodeAddress, getRegions } from "modules/DroverClient";

export default class CreateVenueModel {
    @observable public venueID: string;
    @observable public venueName: string = "";
    @observable public address: string = "";
    @observable public regionID: string = "";
    @observable public regions: Array<string> = [];
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

    public async refresh() {
        const res = await getRegions();
        runInAction(() => {
            this.regions = res.map((x) => x.regionID);
        });
    }

    public async create() {
        const res = await createVenue(this.venueName, this.regionID, this.address);
        runInAction(() => {
            Object.assign(this, res);
        });
        return res;
    }

    public async geocode() {
        const res = await geocodeAddress(this.address);
        runInAction(() => {
            Object.assign(this, res);
        });
    }

    constructor() {
        this.refresh();
    }
}
