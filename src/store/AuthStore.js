import { flow, makeAutoObservable } from "mobx";
import Agent from "utils/Agent";

const { REACT_APP_HISTORY_PREFIX } = window.runConfig;

class AuthClass {
  accessToken = "";
  refreshToken = "";
  role = "";

  constructor() {
    makeAutoObservable(this, {
      logout: flow
    });
    // this.accessToken = window.localStorage.getItem("cxmAccessToken");
    // this.refreshToken = window.localStorage.getItem("cxmRefreshToken");
  }

  setAccessToken = (accessToken) => {
    this.accessToken = accessToken;
    window.localStorage.setItem("cxmAccessToken", accessToken);
  }

  setRefreshToken = (refreshToken) => {
    this.refreshToken = refreshToken;
    window.localStorage.setItem("cxmRefreshToken", refreshToken);
  }

  setRole = (role) => {
    this.role = role;
  }

  *logout() {
    try {
      const response = yield Agent.authRequests.put("/auth/sso/logout");
    } catch(error) {
      console.log("sso logout failure.");
      // session.invalidate() failure
    }
    window.localStorage.removeItem("cxmAccessToken");
    window.localStorage.removeItem("cxmRefreshToken");
    this.setAccessToken(undefined);
    this.setRefreshToken(undefined);
    window.location.href = `${REACT_APP_HISTORY_PREFIX}/`;
  }

  // get getAccessToken() {
  //     return this.accessToken;
  // }

  // get getRefreshToken() {
  //     return this.refreshToken;
  // }

  // get getRole() {
  //   return this.role;
  // }
}

const AuthStore = new AuthClass();
export default AuthStore;
