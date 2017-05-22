// Drover API Interface

interface IPartierProfile {
  userID: string;
  name?: string;
  email?: string;
  gender?: "m" | "f" | "o";
  defaultRegion?: string;
  validated: boolean;
  complete: boolean;
}

interface IUpdateProfileReq {
  userID: string;
  name?: string;
  email?: string;
  defaultRegion?: string;
  gender?: "m" | "f" | "o";
}

interface IRegion {
  regionID: string;
  startTime: string;
  timeZone: string;
}

interface ISquadMember {
  inviteID: number;
  userID: string;
  accepted?: boolean;
}

interface ISquad {
  squadID: string;
  ownerID: string;
  regionID: string;
  partyNight: string;
  squadName: string;
  squadMembers: Array<ISquadMember>;
}

interface ICreateOrUpdateSquad {
  auctionID: number;
  squadName: string;
}

interface IAuction {
  auctionID: number;
  regionID: string;
  partyNight: string;
  startTime: string;
}

interface IPartyNight {
  partyNight: string;
  squad?: string;
  invites: number;
}
interface IPartierFriends {
  pending: Array<string>;
  accepted: Array<string>;
  potential: Array<string>;
}
interface ISquadInvite {
  inviteID: number;
  squadID: number;
  ownerID: string;
  partyNight: string;
  regionID: string;
  squadName: string;
  accepted?: boolean;
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