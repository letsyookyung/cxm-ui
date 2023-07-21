import { observable, action, reaction } from "mobx";
import { createContext } from "react";
import jwtDecode from "jwt-decode";

class UserStore {
  @observable currentUserAud; // 로그인 직원 번호
  @observable currentUserRole; // 로그인 직원 권한 배열
  @observable currentUserName; // 로그인 직원 이름
  @observable currentUserPosition; // 로그인 직원 직책
  @observable currentUserDept; // 로그인 직원 부서
  @observable currentUserDeptCode; // 로그인 직원 부서번호
  @observable ssoId;
  @observable email;
  @observable jwtInfo = window.localStorage.getItem("jwtInfo");
  @observable history = [];

  constructor() {
    reaction(
      () => this.jwtInfo,
      (jwtInfo) => {
        if (jwtInfo) {
          window.localStorage.setItem("jwtInfo", JSON.stringify(jwtInfo));
        } else {
          window.localStorage.removeItem("jwtInfo");
        }
      }
    );
  }

  @action pullUser(token) {
    const jwtObj = jwtDecode(token);

    this.currentUserRole = jwtObj.pri_auth.split(",");

    if (jwtObj.aud != null) this.currentUserAud = jwtObj.aud;
    else this.currentUserAud = "UNKNOWN";

    if (jwtObj.pri_username != null) this.currentUserName = jwtObj.pri_username;
    else this.currentUserName = "UNKNOWN";

    if (jwtObj.pri_position != null) this.currentUserPosition = jwtObj.pri_position;
    else this.currentUserPosition = "UNKNOWN";

    if (jwtObj.pri_dept != null) this.currentUserDept = jwtObj.pri_dept;
    else this.currentUserDept = "UNKNOWN";

    if (jwtObj.pri_dept_code != null) this.currentUserDeptCode = jwtObj.pri_dept_code;
    else this.currentUserDeptCode = "UNKNOWN";

    if (jwtObj.aud != null) {
      this.ssoId = jwtObj.aud;
    } else {
      this.ssoId = "UNKNOWN";
    }

    if (jwtObj.pri_email != null) {
      this.email = jwtObj.pri_email;
    } else {
      this.email = undefined;
    }
  }

  // logout시 호출
  @action forgetUser() {
    this.currentUserAud = undefined;
    this.currentUserRole = undefined;
    this.currentUserName = undefined;
    this.currentUserPosition = undefined;
    this.currentUserDept = undefined;
    this.currentUserDeptCode = undefined;
    this.email = undefined;
    this.history = [];
  }

  @action setCurrentUserRole(role) {
    this.currentUserRole = role;
  }

  @action setCurrentUserName(name) {
    this.currentUserName = name;
  }

  @action setEmail(email) {
    this.email = email;
  }

  @action setJwtInfo(jwtInfo) {
    this.jwtInfo = jwtInfo;
  }

  @action initHistory() {
    let totalHistoryObj = JSON.parse(localStorage.getItem("MAPHistory"));

    if (!localStorage.getItem("MAPHistory")) {
      localStorage.setItem("MAPHistory", JSON.stringify({}));
      totalHistoryObj = {};
    }

    let historyArr = totalHistoryObj[this.currentUserAud];

    if (!historyArr) {
      totalHistoryObj[this.currentUserAud] = [];
      localStorage.setItem("MAPHistory", JSON.stringify(totalHistoryObj));

      historyArr = [];
    }

    this.history = historyArr;
  }

  @action setHistory(history) {
    if (this.history.length === 20) this.history.pop();

    this.history.unshift(history);

    const totalHistoryObj = JSON.parse(localStorage.getItem("MAPHistory"));
    totalHistoryObj[this.currentUserAud] = this.history;

    localStorage.setItem("MAPHistory", JSON.stringify(totalHistoryObj));
  }

  @action resetHistory() {
    this.history = [];
  }

  @action getUserRole() {
    return this.currentUserRole;
  }

  @action getUserName() {
    return this.currentUserName;
  }

  @action getEmail() {
    return this.email;
  }
}

export default createContext(new UserStore());
