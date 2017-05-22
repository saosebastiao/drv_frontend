import DroverClient from "modules/DroverClient"

export class AdminClient extends DroverClient {
  static instance: AdminClient;
  static getClient() {
    if (!AdminClient.instance) {
      AdminClient.instance = new AdminClient();
    }
    return AdminClient.instance;
  }
  private constructor() {
    super("admin");
  }
  getMyProfile() {
    return this.request<IPartierProfile>("get", `/admin/${this.userID}`);
  }
  createRegion(region: string, startTime: string, timeZone: string) {
    return this.requestData<IPartierProfile>("post", `/region/new`, {
      region,
      startTime,
      timeZone
    });
  }
  createNeighborhood(region: string, neighborhood: string) {
    return this.request<IRegion>("put", `/region/${region}/${neighborhood}`);
  }
  deleteNeighborhood(region: string, neighborhood: string) {
    return this.request<IRegion>("delete", `/region/${region}/${neighborhood}`);
  }
}

const Instance = AdminClient.getClient();
export default Instance;
