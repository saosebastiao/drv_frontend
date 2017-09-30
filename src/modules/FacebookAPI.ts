import Logger from "./Logger";

Logger.debug("fbclient init");
FB.init({
  appId: "1063753666981488",
  status: true, // listen to status messages somewhere?
  cookie: true,
  version: "v2.8"
});

function loginFB() {
  return new Promise<IFBAuthResponse>((resolve, reject) => {
    FB.login((res) => {
      if (res.status === "connected") {
        Logger.debug("Connected to Facebook");
        resolve(res.authResponse);
      } else {
        Logger.error("Could not log into Facebook");
        reject();
      }
    }, { scope: "email,user_friends,user_photos" });
  });
}

function getFBLoginStatus() {
  return new Promise<IFBAuthResponse>((resolve, reject) => {
    FB.getLoginStatus((x) => {
      if (x.status !== "connected") {
        reject();
      }
      resolve(x.authResponse);
    });
  });
}

export async function getFBStatus() {
  let res: IFBAuthResponse;
  try {
    res = await getFBLoginStatus();
  } catch (err) {
    Logger.debug("Attempting Facebook Login");
    res = await loginFB();
  }
  return res;
}

export function getMyFriends() {
  return new Promise<FBFriends>((resolve) => {
    FB.api(`/me/friends`, "get", (x: FBFriends) => {
      resolve(x);
    });
  });
}
