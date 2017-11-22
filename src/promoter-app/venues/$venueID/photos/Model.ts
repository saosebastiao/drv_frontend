import { computed, observable, runInAction } from "mobx";
import { getVenue, updateVenue } from "modules/DroverClient";

export default class EditPhotosModel {
  public venueID: number;
  @observable public venueName: string;
  @observable public regionID: string;
  @observable public address: string;
  @observable public photos: Array<string> = [];
  @observable public location?: GeoJSON.Point;
  @observable public filters?: IVenueFilters;
  @computed get isReady() {
    return this.venueName != null;
  }
  @computed get profilePhoto() {
    if (this.photos.length > 0) {
      return { backgroundImage: `url(${this.photos[0]})` };
    } else return undefined;
  }
  @computed get otherPhotos() {
    return this.photos.slice(1).map((url) => {
      return { backgroundImage: `url(${url})` };
    });
  }
  public async refresh() {
    const profile = await getVenue(this.venueID);
    runInAction(() => {
      Object.assign(this, profile);
    });
  }
  public async save() {
    const newProfile = await updateVenue(this.venueID, this.venueName, this.photos);
    Object.assign(this, newProfile);
    return newProfile;
  }
  constructor(venueID: number) {
    this.venueID = venueID;
    this.refresh();
  }
}
