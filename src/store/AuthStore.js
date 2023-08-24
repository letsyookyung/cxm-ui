import { makeAutoObservable } from "mobx";

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
