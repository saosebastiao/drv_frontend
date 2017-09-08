// Drover API Interface

interface IPartierProfile {
  userID: string;
  name?: string;
  email?: string;
  defaultRegion?: string;
  gender?: string;
  photos?: Array<string>;
  validated: boolean;
  complete: boolean;
  filters?: IPartierFilters;
}

interface IAdminProfile {
  userID: string;
  name?: string;
  email?: string;
  validated: boolean;
}

interface IPromoterProfile {
  userID: string;
  name?: string;
  email?: string;
  validated: boolean;
}

interface IUpdateProfileReq {
  userID: string;
  name?: string;
  email?: string;
  defaultRegion?: string;
  gender?: string;
  photos?: Array<string>;
}

interface IRegion {
  regionID: string;
  entryFreeze: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  currency: string;
  priceStart: number;
  priceDrop: number,
  dropInterval: string,
  geom?: GeoJSON.MultiPolygon;
}

interface ISquadMember {
  userID: string;
  invited?: boolean;
  accepted?: boolean;
}

interface ISquad {
  squadID: string;
  ownerID: string;
  auction: IAuction;
  squadName: string;
  filters?: ISquadFilters;
  squadMembers?: Array<ISquadMember>;
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
  entryFreeze: string;
  startTime: string;
  endTime: string;
  currency: string;
  priceStart: number;
  priceDrop: number;
  dropInterval: string;
  geom?: GeoJSON.MultiPolygon;
}

interface IPartierPartyNight {
  partyNight: string;
  squadID?: number;
  auctionID?: number;
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
  accepted?: boolean;
}

interface IVenue {
  venueID: number;
  venueName: string;
  regionID: string;
  address: string;
  photos?: Array<string>;
  location?: GeoJSON.Point;
  filters?: IVenueFilters;
}

interface IParty {
  partyID: number;
  partyName: string;
  filters?: IPartyFilters;
  venue: IVenue;
  auction: IAuction;
}

interface IPromoterPartyNight {
  partyNight: string;
  parties: Array<IParty>;
}

interface IGeocodedAddress {
  address: string;
  regionID: string;
  location: { lat: number, lng: number };
}

interface IPartierFilters {
  x: any;
}

interface ISquadFilters {
  x: any;
}

interface IPromoterFilters {
  x: any;
}

interface IVenueFilters {
  x: any;
}

interface IPartyFilters {
  x: any;
}