import DroverClient from "./DroverClient"

export class VenueClient extends DroverClient {
  static instance: VenueClient;
  static getClient() {
    if (!VenueClient.instance) {
      VenueClient.instance = new VenueClient();
    }
    return VenueClient.instance;
  }
  private constructor() {
    super("bidder");
  }
  geocodeAddress(address: string) {
    return this.request<Array<IGeocodedAddress>>("get", `/venue/geocode?address=${address}`)
  }
  getMyVenues() {
    return this.request<Array<IVenue>>("get", `/venue/all`);
  }
  createVenue(venueName: string, regionID: string, address: string) {
    return this.requestData<IVenue>("post", `/venue/new`, {
      venueName,
      regionID,
      address
    });
  }
  updateVenue(venueID: number, venueName: string, photos: Array<string>) {
    return this.requestData<IVenue>("put", `/venue/${venueID}`, {
      venueName,
      photos
    });
  }
  deleteVenue(venueID: number) {
    return this.request<void>("delete", `/venue/${venueID}`);
  }
  getMyParties() {
    return this.request<Array<IMyParty>>("get", `/party/all`);
  }
  createParty(partyName: string, partyNight: string, venueID: number) {
    return this.requestData<IParty>("post", `party/new`, {
      partyName,
      partyNight,
      venueID
    });
  }
  deleteParty(partyID: number) {
    return this.request<void>("delete", `/party/${partyID}`);
  }
}

const Instance = VenueClient.getClient();
export default Instance;