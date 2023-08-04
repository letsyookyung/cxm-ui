import { observable, action, reaction } from "mobx";
import { createContext } from "react";

import Agent from "utils/Agent";
import UserStore from "./UserStore";

const { REACT_APP_HISTORY_PREFIX } = window.runConfig;

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable accessToken = window.localStorage.getItem("accessToken");
  @observable refreshToken = window.localStorage.getItem("refreshToken");

  @observable role = "";

  constructor() {
    reaction(
      () => this.accessToken,
      (accessToken) => {
        if (accessToken) {
          window.localStorage.setItem("accessToken", accessToken);
        } else {
          window.localStorage.removeItem("accessToken");
        }
      }
    );
    reaction(
      () => this.refreshToken,
      (refreshToken) => {
        if (refreshToken) {
          window.localStorage.setItem("refreshToken", refreshToken);
        } else {
          window.localStorage.removeItem("refreshToken");
        }
      }
    );
  }

  @action
  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  @action
  setRefreshToken(refreshToken) {
    this.refreshToken = refreshToken;
  }

  /**
   * @param {*} roleName
   * 현재 토큰 상의 role에 전달 받은 role 이 있는지 확인
   */
  static isAccessRole(roleName) {
    const role = UserStore.getUserRole();
    return role.indexOf(roleName) > -1;
  }

  @action
  async ssoLogin() {
    this.inProgress = true;
    this.errors = undefined;

    try {
      const response = await Agent.authRequests.post("/auth/sso/login", {
        redirectUrl: window.runConfig.REACT_APP_AUTH_REDIRECT_URL,
      });

      if (response.redirectUrl) {
        window.location.href = response.redirectUrl;
      }
      return response;
    } catch (err) {
      this.errors = err.response && err.response.body && err.response.body.errors;
      throw err;
    }
  }

  @action
  async jwtLogin(ssoId) {
    this.inProgress = true;
    this.errors = undefined;

    try {
      const jwtResponse = await Agent.authRequests.post("/auth/login", {
        id: ssoId,
        realm: window.runConfig.REACT_APP_AUTH_REALM,
      });

      console.log(jwtResponse);
      console.log(`@@ ssoId: ${ssoId}`);

      this.setAccessToken(jwtResponse.access_token);
      this.setRefreshToken(jwtResponse.refresh_token);

      return ssoId;
    } catch (err) {
      this.errors = err.response && err.response.body && err.response.body.errors;
      throw err;
    }
  }

  @action
  async logout() {
    window.localStorage.removeItem("accessToken");
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
}

export default createContext(new AuthStore());
