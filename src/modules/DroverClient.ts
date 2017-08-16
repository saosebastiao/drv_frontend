import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/operator/toPromise";

import Logger from "./Logger";
import { getFBStatus } from "./FacebookAPI";


type DataMethod = "put" | "post" | "patch";
type NoDataMethod = DataMethod | "get" | "head" | "option" | "delete";
type DroverUserType = "admin" | "partier" | "promoter";


let USERID: string | null;


async function login(userType: DroverUserType) {
  const { userID, accessToken } = await getFBStatus();
  USERID = userID;
  Logger.debug("Attempting Drover Login");
  try {
    const url = `/api/${userType}/login`;
    const body = { userID: userID, fbToken: accessToken };
    const headers = { 'Content-Type': 'application/json' };
    const method = 'post';
    const res = await Observable.ajax({ method, url, headers, body }).toPromise();
    Logger.info("Logged in");
  } catch (err) {
    Logger.error("Error logging in");
  }
}
export function getUserID() {
  return USERID;
}
export function partierLogin() {
  return login("partier");
}
export function promoterLogin() {
  return login("promoter");
}
export function adminLogin() {
  return login("admin");
}

async function request<RES>(method: NoDataMethod, endpoint: string) {
  const url = `/api${endpoint}`;
  const res = await Observable.ajax({ method, url }).toPromise();
  Logger.debug(res.response);
  return res.response as RES
}

async function requestData<RES>(method: DataMethod, endpoint: string, body: any) {
  const url = `/api${endpoint}`;
  const headers = { 'Content-Type': 'application/json' };
  const res = await Observable.ajax({ method, headers, url, body }).toPromise();
  Logger.debug(res.response);
  return res.response as RES
}
export function logout() {
  return request<null>("get", "/logout");
}

export function getRegions() {
  return request<Array<IRegion>>("get", `/region/all`);
}
export function getRegion(regionID: string) {
  return request<IRegion>("get", `/region/${regionID}`);
}
export function getTimeZones() {
  return request<Array<string>>("get", `/auction/tz`);
}
export function getAdminProfile() {
  return request<IPartierProfile>("get", `/admin/${USERID}`);
}
export function getPartierProfile(userID?: string) {
  return request<IPartierProfile>("get", `/partier/${userID || USERID}`);
}
export function getVenue(venueID: number) {
  return request<IVenue>("get", `/venue/${venueID}`);
}
export function getParty(partyID: number) {
  return request<IParty>("get", `/party/${partyID}`);
}
export function createRegion(region: string, startTime: string, timeZone: string) {
  return requestData<IPartierProfile>("post", `/region/new`, {
    region,
    startTime,
    timeZone
  });
}
export function createNeighborhood(region: string, neighborhood: string) {
  return request<IRegion>("put", `/region/${region}/${neighborhood}`);
}
export function deleteNeighborhood(region: string, neighborhood: string) {
  return request<IRegion>("delete", `/region/${region}/${neighborhood}`);
}
export function getMyFriends() {
  return request<IPartierFriends>("get", `/friends/${USERID}`);
}
export function updateMyProfile(data: IUpdateProfileReq) {
  return requestData<IPartierProfile>("put", `/partier/${USERID}`, data);
}
export function deleteMyProfile() {
  return request<void>("delete", `/partier/${USERID}`);
}
export function getAuctions() {
  return request<Array<IAuction>>("get", `/auction`);
}
export function getMyAuctions() {
  return request<Array<IAuction>>("get", `/auction/my`);
}
export function getAuctionsForNight(partyNight: string) {
  return request<Array<IAuction>>("get", `/auction/${partyNight}`);
}
export function getPartyNights(userID?: string) {
  return request<Array<IPartyNight>>("get", `/squad/nights/${userID || USERID}`);
}
export function getSquad(squadID: number) {
  return request<ISquad>("get", `/squad/${squadID}`);
}
export function getMySquad(partyNight: string) {
  return request<ISquad>("get", `/squad/${USERID}/${partyNight}`);
}
export function createSquad(data: ICreateSquad) {
  return requestData<ISquad>("post", `/squad/new`, data);
}
export function deleteSquad(partyNight: string) {
  return request<ISquad>("delete", `/squad/${USERID}/${partyNight}`);
}
export function linkFriend(friendID: string) {
  return request<IPartierFriends>("post", `/friends/${USERID}/${friendID}/accept`);
}
export function unlinkFriend(friendID: string) {
  return request<IPartierFriends>("post", `/friends/${USERID}/${friendID}/reject`);
}
export function inviteToSquad(partyNight: string, userID: string) {
  return request<void>("post", `/invites/${partyNight}/${userID}`);
}
export function uninviteFromSquad(partyNight: string, userID: string) {
  return request<void>("delete", `/invites/${partyNight}/${userID}`);
}
export function acceptInvite(partyNight: string, ownerID: string) {
  return request<void>("put", `/invites/${partyNight}/${ownerID}/accept`);
}
export function rejectInvite(partyNight: string, ownerID: string) {
  return request<void>("put", `/invites/${partyNight}/${ownerID}/reject`);
}
export function getMyInvites(partyNight: string) {
  return request<Array<ISquadInvite>>("get", `/invites/${partyNight}`);
}
export function resetInvites(partyNight: string) {
  return request<void>("put", `/invites/${partyNight}/reset`);
}
export function geocodeAddress(address: string) {
  return request<Array<IGeocodedAddress>>("get", `/venue/geocode?address=${address}`)
}
export function getMyVenues() {
  return request<Array<IVenue>>("get", `/venue/all`);
}
export function createVenue(venueName: string, regionID: string, address: string) {
  return requestData<IVenue>("post", `/venue/new`, {
    venueName,
    regionID,
    address
  });
}
export function updateVenue(venueID: number, venueName: string, photos: Array<string>) {
  return requestData<IVenue>("put", `/venue/${venueID}`, {
    venueName,
    photos
  });
}
export function deleteVenue(venueID: number) {
  return request<void>("delete", `/venue/${venueID}`);
}
export function getMyParties() {
  return request<Array<IMyParty>>("get", `/party/all`);
}
export function createParty(partyName: string, partyNight: string, venueID: number) {
  return requestData<IParty>("post", `party/new`, {
    partyName,
    partyNight,
    venueID
  });
}
export function deleteParty(partyID: number) {
  return request<void>("delete", `/party/${partyID}`);
}