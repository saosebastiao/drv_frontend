import { computed, observable } from "mobx";
import { updateSquad, inviteToSquad, uninviteFromSquad } from "modules/DroverClient";

export default class EditSquadModel {
  @observable public squadID: number;
  @observable private _isDirty: boolean = false;
  @observable private _squadName: string;
  @computed get squadName() {
    return this._squadName;
  }
  set squadName(val: string) {
    this._isDirty = true;
    this._squadName = val;
  }

  @computed get isReady() {
    return true;
  }

  public inviteUser = async (userID: string) => {
    await inviteToSquad(this.squadID, userID);
  }
  public uninviteUser = async (userID: string) => {
    await uninviteFromSquad(this.squadID, userID);
  }

  public updateSquad = async () => {
    if (this._isDirty) {
      const x = await updateSquad(this.squadID, { squadName: this._squadName });
      return x;
    } else {
      return null;
    }
  }
  constructor(squadID: number, squadName: string) {
    this.squadID = squadID;
    this.squadName = squadName;
  }
}
