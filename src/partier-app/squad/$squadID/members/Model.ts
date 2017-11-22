import { computed, observable, runInAction } from "mobx";
import {
  getUserID,
  getSquad,
  inviteToSquad,
  uninviteFromSquad
} from "modules/DroverClient";

export default class EditMembersModel {
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
    const res = await getSquad(this.squadID);
    runInAction(() => {
      this.squadMembers = res.squadMembers || [];
    });
  }
  public uninviteUser = async (userID: string) => {
    await uninviteFromSquad(this.squadID, userID);
    const res = await getSquad(this.squadID);
    runInAction(() => {
      this.squadMembers = res.squadMembers || [];
    });
  }
  constructor(squadID: number, squadMembers: Array<ISquadMember>) {
    this.squadID = squadID;
    this.squadMembers = squadMembers;
  }
}
