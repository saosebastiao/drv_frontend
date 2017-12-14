import { computed, observable } from "mobx";
import { updatePartierProfile, getUserID } from "modules/DroverClient";

export default class ProfileModel {
  private userID: string;
  @computed get isReady() {
    return this.photos != null;
  }
  @observable public photos: Array<IPhoto>;
  public save = async (photos: Array<IPhoto>) => {
    const data = {
      userID: this.userID,
      photos
    };
    const newProfile = await updatePartierProfile(data);
    this.photos = newProfile.photos || [];
    return this.photos;
  }
  constructor(photos?: Array<IPhoto>) {
    this.userID = getUserID() || "";
    this.photos = photos || [];
  }
}
