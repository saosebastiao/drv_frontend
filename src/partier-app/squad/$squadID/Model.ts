import { action, observable, computed, runInAction } from "mobx";
import { getUserID, getSquad, getPartierFriends, inviteToSquad, uninviteFromSquad, acceptInvite, rejectInvite, deleteSquad } from "modules/DroverClient";

export default class ViewSquadModel {
    @observable userID: string = "";
    @observable ownerID: string = "";
    @observable squadID: number;
    @observable auctionID: number;
    @observable partyNight: string = "";
    @observable squadName: string = "";
    @observable regionID: string = "";
    @observable filters: any;
    @observable squadMembers: Array<ISquadMember>;
    @observable friends: Array<string>;
    @computed get invited() {
        return this.squadMembers.filter(x => x.accepted == null).map(x => x.userID);
    }
    @computed get accepted() {
        return this.squadMembers.filter(x => x.accepted === true).map(x => x.userID);
    }
    @computed get myself() {
        return this.squadMembers.find(x => x.userID === this.userID);
    }
    @computed get isOwned() {
        return this.userID === this.ownerID;
    }
    @computed get isReady() {
        return this.ownerID.length > 0;
    }
    async inviteUser(userID: string) {
        if (this.isOwned) {
            const res = await inviteToSquad(this.squadID, userID);
            this.refresh();
        }
    }
    async uninviteUser(userID: string) {
        if (this.isOwned) {
            const res = await uninviteFromSquad(this.squadID, userID);
            this.refresh();
        }
    }
    async acceptInvite() {
        const res = await acceptInvite(this.squadID);
        this.refresh();
    }
    async rejectInvite() {
        const res = await rejectInvite(this.squadID);
        this.refresh();
    }
    async deleteSquad() {
        if (this.isOwned) {
            const res = await deleteSquad(this.squadID);
            this.refresh();
        }
    }

    async refresh() {
        const userID = getUserID();
        const squad = await getSquad(this.squadID);
        const friends = await getPartierFriends();
        runInAction(() => {
            this.userID = userID || "";
            Object.assign(this, squad);
            const allFriends = new Set(friends.accepted);
            squad.squadMembers.forEach(x => allFriends.delete(x.userID));
            const friendsArray = Array.from(allFriends);
            this.friends = friendsArray;
        });
    }
    constructor(squadID: number) {
        this.squadID = squadID;
        this.refresh();
    }
}