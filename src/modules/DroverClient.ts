import axios from "axios";
import { observable, computed } from "mobx";
import Logger from "./Logger";
import FacebookAPI from "./FacebookAPI";


type DataMethod = "put" | "post" | "patch";
type NoDataMethod = DataMethod | "get" | "head" | "option" | "delete";
type DroverUserType = "admin" | "partier" | "bidder";

export default class DroverClient {
  @observable loggedIn = false;
  userToken: string;
  userID: string;

  /*
  // Watches FB Events for logout
  private FBListener = FB.Event.subscribe('auth.logout', res => {
    this.loggedIn = false;
  });
  */

  private userType: DroverUserType;
  private tokenInitializer: Promise<void>;

  private axiosClient = axios.create({
    baseURL: `${window.location.origin}/api`
  });


  private async login(retries: number) {
    let fbStatus = await FacebookAPI.getStatus();
    this.userID = fbStatus.userID;
    Logger.debug("Attempting Drover Login");
    try {
      let res = await this.axiosClient.post(`${this.userType}/login`, {
        userID: fbStatus.userID,
        fbToken: fbStatus.accessToken
      });
      this.axiosClient.defaults.headers.common['UserToken'] = res.data.token;
      this.loggedIn = true;
      let nextLogin = new Date(res.data.expiration).getTime() - (new Date()).getTime();
      Logger.debug(`Logging in again at ${new Date(res.data.expiration).toISOString()}`)
      setTimeout(() => {
        this.tokenInitializer = this.login(3);
      }, nextLogin);
    } catch (err) {
      Logger.error("error logging in");
      this.loggedIn = false;
      let nextRetries = retries - 1;
      if (nextRetries <= 0) {
        Logger.error("Couldn't log in!");
        this.tokenInitializer = Promise.reject("Could not Log In");
      } else {
        setTimeout(() => {
          this.tokenInitializer = this.login(nextRetries);
        }, 3000);
      }
    }
  }
  async getToken() {
    if (this.userToken != null) {
      return this.userToken;
    } else {
      let fb = await FacebookAPI.getStatus();
      this.userID = fb.userID;
      let url = `${this.userType}/login`
      let res = await this.axiosClient.post(url, {
        userID: fb.userID,
        fbToken: fb.accessToken
      });
      this.userToken = res.data.token;
      this.loggedIn = true;
      let nextLogin = new Date(res.data.expiration).getTime() - (new Date()).getTime();
      setTimeout(() => { this.userToken = null; }, nextLogin);
      return res.data.token;
    }
  }

  protected async request<RES>(method: NoDataMethod, url: string) {
    let token = await this.getToken();
    let headers = { 'UserToken': token };
    return this.axiosClient.request({ method, url, headers })
      .then((res) => {
        Logger.debug(res.data)
        return res.data as RES
      });
  }

  protected async requestData<RES>(method: DataMethod, url: string, data: any) {
    let token = await this.getToken();
    let headers = { 'UserToken': token };
    return this.axiosClient.request({ method, url, data, headers })
      .then((res) => {
        Logger.debug(res.data)
        return res.data as RES
      });
  }

  protected constructor(userType: DroverUserType) {
    this.userType = userType;
  }

  getRegions() {
    return this.request<Array<IRegion>>("get", `/region/all`);
  }
  getRegion(regionID: string) {
    return this.request<IRegion>("get", `/region/${regionID}`);
  }
  getTimeZones() {
    return this.request<Array<string>>("get", `/auction/tz`);
  }
  getSquad(squadID: number) {
    return this.request<ISquad>("get", `/squad/${squadID}`);
  }
  getPartier(userID: string) {
    return this.request<IPartierProfile>("get", `/partier/${userID}`);
  }
  getVenue(venueID: number) {
    return this.request<IVenue>("get", `/venue/${venueID}`);
  }
  getParty(partyID: number) {
    return this.request<IParty>("get", `/party/${partyID}`);
  }
}
