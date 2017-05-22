import axios from "axios";

const Admin = "101605760262775";
const Venue1 = "115315928870303";
const Venue2 = "120262801707821";
const Partier1 = "133314987066620";
const Partier2 = "133807117017368";

interface TestUser {
  id: string;
  access_token: string;
}

export default class FacebookAPI {
  appID = "1063753666981488";
  appToken = "1063753666981488|86a7ec6d27bcd7b4942bdfdce88046dd";
  base = `https://graph.facebook.com/v2.8/${this.appID}/accounts/test-users`;
  params = `access_token=${this.appToken}`
  url = `${this.base}?${this.params}`;
  tokens = new Map<string, string>();
  activeUser: string;

  private async login() {
    let res = await axios.get(this.url);
    (res.data.data as TestUser[]).forEach(x => {
      this.tokens.set(x.id, x.access_token);
    });
    return {
      userID: this.activeUser,
      accessToken: this.tokens.get(this.activeUser)
    }
  }

  private getFBStatus() {
    return new Promise<IFBAuthResponse>((resolve, reject) => {
      if (this.activeUser != null && this.tokens.get(this.activeUser) != null) {
        resolve({
          userID: this.activeUser,
          accessToken: this.tokens.get(this.activeUser)
        });
      } else reject();
    });
  }

  async getStatus() {
    let res: IFBAuthResponse;
    try {
      res = await this.getFBStatus();
    } catch (err) {
      res = await this.login();
    }
    return res;
  }
  setAdmin() { this.activeUser = Admin; }
  setVenue1() { this.activeUser = Venue1; }
  setVenue2() { this.activeUser = Venue2; }
  setPartier1() { this.activeUser = Partier1; }
  setPartier2() { this.activeUser = Partier2; }

}