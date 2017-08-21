import { action, observable, computed, runInAction } from "mobx";
import { getUserID, getSquad, inviteToSquad, uninviteFromSquad, acceptInvite, rejectInvite, deleteSquad } from "modules/DroverClient";

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
    @computed get potential() {
        return this.squadMembers.filter(x => x.invited === false).map(x => x.userID);
    }
    @computed get invited() {
        return this.squadMembers.filter(x => x.invited === true && x.accepted == null).map(x => x.userID);
    }
    @computed get accepted() {
        return this.squadMembers.filter(x => x.invited === true && x.accepted === true).map(x => x.userID);
    }
    @computed get rejected() {
        return this.squadMembers.filter(x => x.invited === true && x.accepted === false).map(x => x.userID);
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
        runInAction(() => {
            this.userID = userID || "";
            Object.assign(this, squad);
        });
    }
    constructor(squadID: number) {
        this.squadID = squadID;
        this.refresh();
    }
}