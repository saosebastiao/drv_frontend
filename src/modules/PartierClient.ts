import DroverClient from "./DroverClient"

export class PartierClient extends DroverClient {
  static instance: PartierClient;
  static getClient() {
    if (!PartierClient.instance) {
      PartierClient.instance = new PartierClient();
    }
    return PartierClient.instance;
  }
  private constructor() {
    super("partier");
  }
  getMyProfile() {
    return this.request<IPartierProfile>("get", `/partier/${this.userID}`);
  }
  getMyFriends() {
    return this.request<IPartierFriends>("get", `/friends`);
  }
  updateMyProfile(data: IUpdateProfileReq) {
    return this.requestData<IPartierProfile>("put", `/partier/${this.userID}`, data);
  }
  deleteMyProfile() {
    return this.request<void>("delete", `/partier/${this.userID}`);
  }
  getAuctions() {
    return this.request<Array<IAuction>>("get", `/auction`);
  }
  getMyAuctions() {
    return this.request<Array<IAuction>>("get", `/auction/my`);
  }
  getAuctionsForNight(partyNight: string) {
    return this.request<Array<IAuction>>("get", `/auction/${partyNight}`);
  }
  getPartyNights() {
    return this.request<Array<IPartyNight>>("get", `/auction/nights`);
  }
  getSquad(squadID: number) {
    return this.request<ISquad>("get", `/squad/${squadID}`);
  }
  getMySquad(partyNight: string) {
    return this.request<ISquad>("get", `/squad/my/${partyNight}`);
  }
  createSquad(partyNight: string, data: ICreateOrUpdateSquad) {
    return this.requestData<ISquad>("post", `/squad/my/${partyNight}`, data);
  }
  updateSquad(partyNight: string, data: ICreateOrUpdateSquad) {
    return this.requestData<ISquad>("put", `/squad/my/${partyNight}`, data);
  }
  deleteSquad(partyNight: string) {
    return this.request<ISquad>("delete", `/squad/my/${partyNight}`);
  }
  linkFriend(friendID: string) {
    return this.request<void>("post", `/friends/${friendID}`);
  }
  unlinkFriend(friendID: string) {
    return this.request<void>("delete", `/friends/${friendID}`);
  }
  acceptLinkRequest(friendID: string) {
    return this.request<void>("put", `/friends/${friendID}/accept`);
  }
  rejectLinkRequest(friendID: string) {
    return this.request<void>("put", `/friends/${friendID}/reject`);
  }
  inviteToSquad(partyNight: string, userID: string) {
    return this.request<void>("post", `/invites/${partyNight}/${userID}`);
  }
  uninviteFromSquad(partyNight: string, userID: string) {
    return this.request<void>("delete", `/invites/${partyNight}/${userID}`);
  }
  acceptInvite(partyNight: string, ownerID: string) {
    return this.request<void>("put", `/invites/${partyNight}/${ownerID}/accept`);
  }
  rejectInvite(partyNight: string, ownerID: string) {
    return this.request<void>("put", `/invites/${partyNight}/${ownerID}/reject`);
  }
  getMyInvites(partyNight: string) {
    return this.request<Array<ISquadInvite>>("get", `/invites/${partyNight}`);
  }
  resetInvites(partyNight: string) {
    return this.request<void>("put", `invites/${partyNight}/reset`);
  }
}

const Instance = PartierClient.getClient();
export default Instance;