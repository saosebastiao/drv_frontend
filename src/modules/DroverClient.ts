import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/dom/ajax";
import "rxjs/add/observable/dom/webSocket";
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

export function getAdminProfile() {
  return request<IAdminProfile>("get", `/admin/${USERID}`);
}

export function getPartierProfile(userID?: string) {
  return request<IPartierProfile>("get", `/partier/${userID || USERID}`);
}

export function getPromoterProfile(userID?: string) {
  return request<IPromoterProfile>("get", `/promoter/${userID || USERID}`);
}

export function updatePromoterProfile(data: IUpdatePromoterProfileReq) {
  return requestData<IPromoterProfile>("put", `/promoter/${data.userID || USERID}`, data);
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

export function getPartierFriends() {
  return request<IPartierFriends>("get", `/friends/${USERID}`);
}

export function updatePartierProfile(data: IUpdatePartierProfileReq) {
  return requestData<IPartierProfile>("put", `/partier/${USERID}`, data);
}

export function deletePartierProfile() {
  return request<void>("delete", `/partier/${USERID}`);
}

export function getAuctions() {
  return request<Array<IAuction>>("get", `/auction`);
}

export function getAuctionsForPartyNight(partyNight: string) {
  return request<Array<IAuction>>("get", `/auction/${partyNight}`);
}

export function getPartyNights(userID?: string) {
  return request<Array<IPartierPartyNight>>("get", `/squad/nights/${userID || USERID}`);
}

export function getSquad(squadID: number) {
  return request<ISquad>("get", `/squad/${squadID}`);
}

export function getAuctionSquad(auctionID: number, userID?: string) {
  return request<ISquad>("get", `/squad/auction/${auctionID}/${userID || USERID}`);
}

export function getPartierAuctions(userID?: string) {
  return request<Array<ISquad>>("get", `/squad/auction/${userID || USERID}`);
}

export function createSquad(data: ICreateSquad) {
  return requestData<ISquad>("post", `/squad/new`, data);
}

export function deleteSquad(squadID: number) {
  return request<null>("delete", `/squad/${squadID}`);
}

export function linkFriend(friendID: string) {
  return request<IPartierFriends>("post", `/friends/${USERID}/${friendID}/accept`);
}

export function unlinkFriend(friendID: string) {
  return request<IPartierFriends>("post", `/friends/${USERID}/${friendID}/reject`);
}

export function inviteToSquad(squadID: number, userID: string) {
  return request<void>("post", `/invites/${squadID}/${userID}`);
}

export function uninviteFromSquad(squadID: number, userID: string) {
  return request<void>("delete", `/invites/${squadID}/${userID}`);
}

export function acceptInvite(squadID: number) {
  return request<void>("put", `/invites/${squadID}/${USERID}/accept`);
}

export function rejectInvite(squadID: number) {
  return request<void>("put", `/invites/${squadID}/${USERID}/reject`);
}

export function getPartierInvites(partyNight: string, userID?: string) {
  return request<Array<ISquadInvite>>("get", `/invites/${partyNight}/${userID || USERID}`);
}

export function resetPartierInvites(partyNight: string, userID?: string) {
  return request<void>("put", `/invites/${partyNight}/${userID || USERID}/reset`);
}

export function geocodeAddress(address: string) {
  return request<Array<IGeocodedAddress>>("get", `/venue/geocode?address=${address}`)
}

export function getPromoterVenues() {
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

export function getPromoterParties(partyNight?: string) {
  return request<Array<IPromoterPartyNight>>("get", `/party/all`);
}

export function getPromoterPartiesByPartyNight(partyNight: string) {
  return request<Array<IParty>>("get", `/party/night/${partyNight}`);
}


export function createParty(partyName: string, auctionID: number, venueID: number) {
  return requestData<IParty>("post", `/party/new`, {
    partyName,
    auctionID,
    venueID
  });
}

export function deleteParty(partyID: number) {
  return request<void>("delete", `/party/${partyID}`);
}

export function getPartierAuctionWS(squadID: number) {
  return Observable.webSocket(`ws://localhost:9000/auction/squad/${squadID}`);
}