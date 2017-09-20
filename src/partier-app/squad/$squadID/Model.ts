import { computed, observable, runInAction } from "mobx";
import {
    acceptInvite,
    deleteSquad,
    getSquad,
    getUserID,
    inviteToSquad,
    rejectInvite,
    uninviteFromSquad,
} from "modules/DroverClient";

export default class ViewSquadModel {
    @observable public userID: string = "";
    @observable public ownerID: string = "";
    @observable public squadID: number;
    @observable public auction: IAuction;
    @observable public squadName: string = "";
    @observable public filters: any;
    @observable public squadMembers: Array<ISquadMember>;
    @computed get potential() {
        return this.squadMembers.filter((x) => x.invited === false).map((x) => x.userID);
    }
    @computed get invited() {
        return this.squadMembers.filter((x) => x.invited === true && x.accepted == null).map((x) => x.userID);
    }
    @computed get accepted() {
        return this.squadMembers.filter((x) => x.invited === true && x.accepted === true).map((x) => x.userID);
    }
    @computed get rejected() {
        return this.squadMembers.filter((x) => x.invited === true && x.accepted === false).map((x) => x.userID);
    }
    @computed get myself() {
        return this.squadMembers.find((x) => x.userID === this.userID);
    }
    @computed get isOwned() {
        return this.userID === this.ownerID;
    }
    @computed get isReady() {
        return this.ownerID.length > 0;
    }
    public async inviteUser(userID: string) {
        if (this.isOwned) {
            await inviteToSquad(this.squadID, userID);
            this.refresh();
        }
    }
    public async uninviteUser(userID: string) {
        if (this.isOwned) {
            await uninviteFromSquad(this.squadID, userID);
            this.refresh();
        }
    }
    public async acceptInvite() {
        await acceptInvite(this.squadID);
        this.refresh();
    }
    public async rejectInvite() {
        await rejectInvite(this.squadID);
        this.refresh();
    }
    public async deleteSquad() {
        if (this.isOwned) {
            await deleteSquad(this.squadID);
            this.refresh();
        }
    }

    public async refresh() {
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
