import Logger from "./Logger";

Logger.debug("fbclient init");
FB.init({
  appId: '1063753666981488',
  status: true, //listen to status messages somewhere?
  cookie: true,
  version: 'v2.8',
});

function loginFB() {
  return new Promise<IFBAuthResponse>((resolve, reject) => {
    FB.login(res => {
      if (res.status === "connected") {
        Logger.debug("Connected to Facebook");
        resolve(res.authResponse);
      } else {
        Logger.error("Could not log into Facebook");
        reject();
      }
    }, { scope: 'email,user_friends' });
  });
}

function getFBStatus() {
  return new Promise<IFBAuthResponse>((resolve, reject) => {
    FB.getLoginStatus(x => {
      if (x.status !== 'connected') {
        reject();
      }
      resolve(x.authResponse);
    });
  });
}

export async function getStatus() {
  let res: IFBAuthResponse;
  try {
    res = await getFBStatus();
  } catch (err) {
    Logger.debug("Attempting Facebook Login");
    res = await loginFB();
  }
  return res;
}


export function getFBUserInfo(userID?: string) {
  let params = { fields: 'first_name,email,gender' };
  let user = userID ? `/${userID}` : "/me";
  return new Promise<IPartierProfile>((resolve, reject) => {
    FB.api(user, "get", params, (x: FBIdentity) => {
      let gender: "m" | "f" | "o";
      if (x.gender && x.gender === "male") {
        gender = "m";
      } else if (x.gender && x.gender === "female") {
        gender = "f";
      } else {
        gender = "o";
      };
      let out = {
        name: x.first_name,
        email: x.email,
        userID: x.id,
        gender,
        complete: false,
        validated: false
      } as IPartierProfile;
      resolve(out);
    });
  });
}

export function getMyFriends() {
  return new Promise<FBFriends>((resolve, reject) => {
    FB.api(`/me/friends`, "get", (x: FBFriends) => {
      resolve(x);
    });
  });
}