import { computed, observable, runInAction } from "mobx";
import {
  getUserID,
  inviteToSquad,
  uninviteFromSquad
} from "modules/DroverClient";
import ViewSquadModel from "../Model";

export default class EditMembersModel {
  private model: ViewSquadModel;
  @observable public squadID: number;
  @computed get isReady() {
    return this.squadMembers != null;
  }
  @observable public squadMembers: Array<ISquadMember> = [];
  @computed get potential() {
    return this.squadMembers
      .filter((x) => x.invited === false)
      .map((x) => x.userID);
  }
  @computed get invited() {
    return this.squadMembers
      .filter((x) => x.invited === true && x.accepted == null)
      .map((x) => x.userID);
  }
  @computed get accepted() {
    return this.squadMembers
      .filter((x) => x.invited === true && x.accepted === true)
      .map((x) => x.userID);
  }
  @computed get rejected() {
    return this.squadMembers
      .filter((x) => x.invited === true && x.accepted === false)
      .map((x) => x.userID);
  }
  @computed get myself() {
    return this.squadMembers.find((x) => x.userID === getUserID());
  }
  public inviteUser = async (userID: string) => {
    await inviteToSquad(this.squadID, userID);
    this.refresh();
  }
  public uninviteUser = async (userID: string) => {
    await uninviteFromSquad(this.squadID, userID);
    this.refresh();
  }
  public refresh = async () => {
    await this.model.refresh();
    runInAction(() => {
      this.squadID = this.model.squadID;
      this.squadMembers = this.model.squadMembers;
    });
  }
  constructor(model: ViewSquadModel) {
    this.model = model;
    this.squadID = this.model.squadID;
    this.squadMembers = this.model.squadMembers;
  }
}
