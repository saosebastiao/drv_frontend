// Drover API Interface

interface IPartierProfile {
  userID: string;
  name?: string;
  email?: string;
  gender?: string;
  defaultRegion?: string;
  validated: boolean;
  complete: boolean;
}

interface IUpdateProfileReq {
  userID: string;
  name?: string;
  email?: string;
  defaultRegion?: string;
  gender?: string;
}

interface IRegion {
  regionID: string;
  startTime: string;
  timeZone: string;
  currency: string;
  priceStart: number;
  priceDrop: number;
  dropInterval: string;
}

interface ISquadMember {
  userID: string;
  invited: boolean;
  accepted?: boolean;
}

interface ISquad {
  squadID: string;
  ownerID: string;
  auction: IAuction;
  squadName: string;
  squadMembers: Array<ISquadMember>;
}

interface ICreateSquad {
  ownerID: string;
  auctionID: number;
  squadName: string;
}

interface IAuction {
  auctionID: number;
  regionID: string;
  partyNight: string;
  startTime: string;
  endTime: string;
  entryFreeze: string;
  currency: string;
  priceStart: number;
  priceDrop: number;
  dropInterval: string;
}

interface IPartyNight {
  partyNight: string;
  squadID?: number;
  invites: number;
}
interface IPartierFriends {
  invited: Array<string>;
  invitations: Array<string>;
  accepted: Array<string>;
  rejected: Array<string>;
  potential: Array<string>;
}
interface ISquadInvite {
  squadID: number;
}

interface IVenue {
  venueID: number;
  ownerID: string;
  regionID: string;
  venueName: string;
  address: string;
  location: GeoJSON.Point;
  photos?: Array<string>;
}

interface IParty extends IVenue {
  partyID: number;
  auctionID: number;
  partyNight: string;
  partyName: string;
}

interface IMyParty {
  partyNight: string;
  parties: Array<IParty>;
}

interface IGeocodedAddress {
  address: string;
  regionID: string;
  location: { lat: number, lng: number };
}