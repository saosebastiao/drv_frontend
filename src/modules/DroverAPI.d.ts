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

interface IUpdatePartierProfileReq {
  userID: string;
  name?: string;
  email?: string;
  defaultRegion?: string;
  gender?: string;
  photos?: Array<string>;
  stripeCode?: string;
}

interface IUpdateAdminProfileReq {
  userID: string;
  name?: string;
  email?: string;
}

interface IUpdatePromoterProfileReq {
  userID: string;
  name?: string;
  email?: string;
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
  squadID: number;
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
  venueBlacklist?: Array<number>;
  musicTypes?: Array<string>;
  venueTypes?: Array<string>;
  interactionTypes?: Array<string>;
}

interface ISquadFilters {
  inAuction?: boolean;
  minimumPrice?: number;
  venueBlacklist?: Array<number>;
  musicTypes?: Array<string>;
  venueTypes?: Array<string>;
  interactionTypes?: Array<string>;
}

interface IPromoterFilters {
  partierBlacklist?: Array<string>;
  genders: Array<string>;
  musicTypes: Array<string>;
  interactionTypes: Array<string>;
}

interface IVenueFilters {
  partierBlacklist?: Array<string>;
  genders: Array<string>;
  musicTypes: Array<string>;
  venueTypes: Array<string>;
  interactionTypes: Array<string>;
}

interface IPartyFilters {
  partierBlacklist?: Array<string>;
  squadBlacklist: Array<number>;
  genders: Array<string>;
  musicTypes: Array<string>;
  venueTypes: Array<string>;
  interactionTypes: Array<string>;
}

interface IPreAuction {
  state: 'PreAuction';
  effective: string;
}

interface IEntryFreeze {
  state: 'EntryFreeze';
  effective: string;
}

interface IActiveAuction {
  state: 'ActiveAuction';
  effective: string;
  price: number;
}

interface IPostAuction {
  state: 'PostAuction';
  effective: string;
}

interface ISquadConfig {
  squadID: number;
  squadName: string;
  ownerID: string;
  filters: ISquadFilters;
}

interface IPartyConfig {
  partyID: number;
  partyName: string;
  venueID: number;
  filters: IPartyFilters;
}

type IAuctionState = IPreAuction | IEntryFreeze | IActiveAuction | IPostAuction;
interface ICurrentState {
  msg: 'CurrentState';
  state: IAuctionState
  squads: Array<ISquadConfig>;
  parties: Array<IPartyConfig>;
}

interface ISquadBidSuccessful {
  msg: 'SquadBidSuccessful';
  squadID: number;
  partyID: number;
}

interface ISquadBidFailed {
  msg: 'SquadBidFailed';
  squadID: number;
  partyID: number;
  reason: string;
}

interface IGetState {
  msg: 'GetState';
}

interface ISetSquadFilters {
  msg: 'SetSquadFilters';
  filters: ISquadFilters;
}

interface ISetPartyFilters {
  msg: 'SetPartyFilters';
  filters: IPartyFilters;
}

interface IBid {
  msg: 'Bid';
  squadID: number;
  price: number;
}

type IAuctionMessage = ICurrentState | ISquadBidSuccessful | ISquadBidFailed;
type ISquadMessage = IGetState | ISetSquadFilters;
type IPartyMessage = IGetState | ISetPartyFilters | IBid;