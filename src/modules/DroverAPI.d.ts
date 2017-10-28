// Drover API Interface

interface IPartierProfile {
  userID: string;
  name?: string;
  email?: string;
  defaultRegion?: string;
  gender?: string;
  photos?: Array<string>;
  stripeAccount?: string;
  validated: boolean;
  complete: boolean;
  filters: IPartierFilters;
}

interface IStripeLink {
  created: number;
  url: string;
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
  stripeAccount?: string;
  validated: boolean;
}

interface IUpdatePartierProfileReq {
  userID: string;
  name?: string;
  email?: string;
  defaultRegion?: string;
  gender?: string;
  photos?: Array<string>;
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
  filters: ISquadFilters;
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
  filters: IVenueFilters;
}

interface IParty {
  partyID: number;
  partyName: string;
  filters: IPartyFilters;
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
  partyBlacklist?: Array<number>;
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
  ownerID: string;
  filters: ISquadFilters;
  squadMembers?: Array<ISquadMember>;
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
  bidID: number;
  squadID: number;
  partyID: number;
  price: number;
  bidTime: string;
}

interface ISquadBidReceived {
  msg: 'SquadBidReceived';
  bidID: number;
  squadID: number;
  partyID: number;
  price: number;
  bidTime: string;
}

interface ISquadTaken {
  msg: 'SquadTaken';
  bidID: number;
  squadID: number;
  partyID: number;
  price: number;
  bidTime: string;
}

interface ISquadBidFailed {
  msg: 'SquadBidFailed';
  bidID: number;
  squadID: number;
  partyID: number;
  price: number;
  bidTime: string;
  bidRank: number;
}
interface ISquadBidDropped {
  msg: 'SquadBidDropped';
  bidID: number;
  squadID: number;
  partyID: number;
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

interface ISquadFiltersUpdated {
  msg: 'SquadFiltersUpdated';
  filters: ISquadFilters;
}

interface IPartyFiltersUpdated {
  msg: 'PartyFiltersUpdated';
  filters: IPartyFilters;
}

interface IBid {
  msg: 'Bid';
  squadID: number;
  price: number;
}
interface IDropBid {
  msg: 'DropBid';
  squadID: number;
}

type IPartyBidResponse = ISquadBidSuccessful | ISquadTaken | ISquadBidFailed | ISquadBidReceived | ISquadBidDropped;
type ISquadAuctionMessage = ICurrentState | ISquadFiltersUpdated | ISquadBidSuccessful;
type IPartyAuctionMessage = ICurrentState | IPartyFiltersUpdated | IPartyBidResponse;
type ISquadMessage = IGetState | ISetSquadFilters;
type IPartyMessage = IGetState | ISetPartyFilters | IBid | IDropBid;