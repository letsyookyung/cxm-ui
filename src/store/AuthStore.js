import { makeAutoObservable } from "mobx";

import Agent from "utils/Agent";

const { REACT_APP_AUTH_REDIRECT_URL, REACT_APP_HISTORY_PREFIX } = window.runConfig;

class AuthClass {
  accessToken = "";
  refreshToken = "";
  role = "";

  constructor() {
    makeAutoObservable(this);
    this.accessToken = window.localStorage.getItem("cxmAccessToken");
    this.refreshToken = window.localStorage.getItem("cxmRefreshToken");
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

  ssoLogin = async () => {
    const response = await Agent.authRequests.post("/auth/sso/login", {
      redirectUrl: REACT_APP_AUTH_REDIRECT_URL,
    });

    if (response.redirectUrl) {
      window.location.href = response.redirectUrl;
    }
    return response;
  }

  jwtLogin = async (ssoId) => {
    const jwtResponse = await Agent.authRequests.post("/auth/login", {
      id: ssoId,
      realm: window.runConfig.REACT_APP_AUTH_REALM,
    });

    console.log(jwtResponse);
    console.log(`@@ ssoId: ${ssoId}`);

    this.setAccessToken(jwtResponse.access_token);
    this.setRefreshToken(jwtResponse.refresh_token);

    return ssoId;
  }

  logout = async () => {
    window.localStorage.removeItem("cxmAccessToken");
    window.localStorage.removeItem("cxmRefreshToken");
    const response = await Agent.authRequests.put("/auth/sso/logout");

    if (response.redirectUrl === undefined) {
      return;
    }

    this.setAccessToken(undefined);
    this.setRefreshToken(undefined);

    Agent.superagent
    .get(response.redirectUrl)
    .withCredentials()
    .then(() => {})
    .finally(() => {
      window.location.href = `${REACT_APP_HISTORY_PREFIX}/`;
    });
  }

  get getAccessToken() {
      return this.accessToken;
  }

  get getRefreshToken() {
      return this.refreshToken;
  }

  get getRole() {
    return this.role;
  }
}

const AuthStore = new AuthClass();
export default AuthStore;