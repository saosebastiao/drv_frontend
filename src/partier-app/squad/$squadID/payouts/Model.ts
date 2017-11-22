import { computed, observable, runInAction } from "mobx";
import ViewSquadModel from "../Model";

export default class EditPayoutsModel {
  @observable public allocations = new Map<string, number>();
  @observable public squadMembers: Array<ISquadMember>;
  @computed get isReady() {
    return this.squadMembers != null;
  }
  public save = async () => {
    await Promise.resolve(); // replace with save API method
    await this.refresh();
  }
  public refresh = async () => {
    this.source.refresh();
    runInAction(() => {
      this.squadMembers = this.source.squadMembers || [];
    });
  }
  constructor(private source: ViewSquadModel) {
    this.squadMembers = this.source.squadMembers || [];
    const totMembers = this.squadMembers.length + 1;
    const evenAlloc = 1 / totMembers;
    this.allocations.set(source.ownerID, evenAlloc);
    for (const member of this.squadMembers) {
      if (member.invited && (member.accepted == null || member.accepted)) {
        this.allocations.set(member.userID, evenAlloc);
      }
    }
  }
}
