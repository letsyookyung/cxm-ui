import { flow, makeAutoObservable } from "mobx";
import Agent from "utils/Agent";
import UserStore from "./UserStore";

const { REACT_APP_HISTORY_PREFIX } = window.runConfig;

class AuthClass {
  accessToken = undefined;
  refreshToken = undefined;

  constructor() {
    makeAutoObservable(this, {
      logout: flow,
      tokenRefreshRequest: flow,
    });
  }

  setAccessToken = (accessToken) => {
    this.accessToken = accessToken;
    if (accessToken) window.localStorage.setItem("cxmAccessToken", accessToken);
    else window.localStorage.removeItem("cxmAccessToken");
  }

  setRefreshToken = (refreshToken) => {
    this.refreshToken = refreshToken;
    if (refreshToken) window.localStorage.setItem("cxmRefreshToken", refreshToken);
    else window.localStorage.removeItem("cxmRefreshToken");
  }

  *logout() {
    try {
      yield Agent.authRequests.put("/auth/sso/logout");
    } catch(error) {
      // session.invalidate() failure
      console.log("sso logout failure.");
    }
    UserStore.forgetUser();
    this.setAccessToken(undefined);
    this.setRefreshToken(undefined);
    window.location.href = `${REACT_APP_HISTORY_PREFIX}/`;
  }

  // RT 로 AT 신규 발급 시도
  *tokenRefreshRequest() {
    window.localStorage.removeItem("cxmAccessToken");
    const rt = window.localStorage.getItem("cxmRefreshToken");
    if (rt) {
      const payload = {
        refreshToken: rt,
      };

      try {
        const response = yield Agent.authRequests.post("/auth/refresh", payload);
        this.setAccessToken(response.access_token);
        this.setRefreshToken(response.refresh_token);
      } catch (e) {
        console.log("@@ Refresh token failure.")
        console.log(e);
        this.logout();
      }
    }
  }
}

const AuthStore = new AuthClass();
export default AuthStore;
