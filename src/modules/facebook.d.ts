// Facebook APIinterface

interface IFBAuthResponse {
  userID: string;
  accessToken: string;
  expiresIn?: number;
  signedRequest?: string;
}

type FBStatusCode = "connected" | "not_authorized" | "unknown";
interface IFBLoginStatus {
  status: FBStatusCode;
  authResponse: IFBAuthResponse;
}

interface FBFriends {
  data: Array<any>;
  summary: {
    total_count: number;
  }
}

interface FBIdentity {
  first_name?: string;
  email?: string;
  gender?: string;
  id: string;
}