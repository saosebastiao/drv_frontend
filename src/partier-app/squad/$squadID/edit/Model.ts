import { computed, observable, runInAction } from "mobx";
import {
  getSquad,
  getUserID,
  inviteToSquad,
  uninviteFromSquad,
  updateSquad,
} from "modules/DroverClient";

export default class EditSquadModel {
  @observable public squad: ISquad;
  @computed get isReady() {
    return this.squad != null;
  }
  @observable public squadName: string;
  @observable public venueBlacklist: Map<number, void> = new Map();
  @observable public venueTypes: Map<string, boolean> = new Map();
  @observable public interactionTypes: Map<string, boolean> = new Map;
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
  public updateSquad = async () => {
    const squadName = this.squad.squadName !== this.squadName ? this.squadName : undefined;
    const filters = undefined;
    const squad = await updateSquad(this.squadID, { squadName, filters });
    runInAction(() => {
      this.squad = squad;
      if (squad.squadMembers) {
        this.squadMembers = squad.squadMembers;
        this.squadName = squad.squadName;
      }
    });
  }
  public refresh = async () => {
    const squad = await getSquad(this.squadID);
    runInAction(() => {
      this.squad = squad;
      if (squad.squadMembers) {
        this.squadMembers = squad.squadMembers;
      }
    });
  }
  constructor(public squadID: number) {
    this.refresh();
  }
}
