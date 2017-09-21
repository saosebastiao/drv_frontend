import { computed, observable, runInAction } from "mobx";
import { acceptInvite, getSquad, getUserID, rejectInvite } from "modules/DroverClient";

export default class ViewSquadModel {
    @observable public squad: ISquad;
    @observable public userID: string = "";
    @observable public ownerID: string = "";
    @observable public squadID: number;
    @observable public auction: IAuction;
    @observable public squadName: string = "";
    @observable public filters: ISquadFilters;
    @observable public squadMembers: Array<ISquadMember>;
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
        return this.squadMembers.find((x) => x.userID === this.userID);
    }
    @computed get isOwned() {
        return this.userID === this.ownerID;
    }
    @computed get isReady() {
        return this.ownerID.length > 0;
    }
    public isSelf = (userID: string) => {
        return this.userID === userID;
    }
    public acceptInvite = async () => {
        await acceptInvite(this.squadID);
        this.refresh();
    }
    public rejectInvite = async () => {
        await rejectInvite(this.squadID);
        this.refresh();
    }

    public refresh = async () => {
        const userID = getUserID();
        const squad = await getSquad(this.squadID);
        runInAction(() => {
            this.userID = userID || "";
            this.squad = squad;
            Object.assign(this, squad);
        });
    }
    constructor(squadID: number) {
        this.squadID = squadID;
        this.refresh();
    }
}
