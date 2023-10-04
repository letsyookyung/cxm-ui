import { makeAutoObservable } from "mobx";
import JwtDecode from "jwt-decode";

class UserClass {
  currentUserAud; // 로그인 직원 번호
  currentUserRole; // 로그인 직원 권한 배열
  currentUserName; // 로그인 직원 이름
  currentUserPosition; // 로그인 직원 직책
  currentUserDept; // 로그인 직원 부서
  currentUserDeptCode; // 로그인 직원 부서번호
  ssoId;
  email;
  history = [];

  constructor() {
    makeAutoObservable(this);
  }

  pullUser = (token) => {
    const jwtObj = JwtDecode(token);
    this.currentUserRole = jwtObj.pri_auth.split(",");
    this.currentUserAud = jwtObj.aud ?? "UNKNOWN";
    this.currentUserName = jwtObj.pri_username ?? "UNKNOWN";
    this.currentUserPosition = jwtObj.pri_position ?? "UNKNOWN";
    this.currentUserDept = jwtObj.pri_dept ?? "UNKNOWN";
    this.currentUserDeptCode = jwtObj.pri_dept_code ?? "UNKNOWN";
    this.ssoId = jwtObj.aud ?? "UNKNOWN";
    this.email = jwtObj.pri_email ?? "UNKNOWN";
  }

  forgetUser = () => {
    this.currentUserAud = undefined;
    this.currentUserRole = undefined;
    this.currentUserName = undefined;
    this.currentUserPosition = undefined;
    this.currentUserDept = undefined;
    this.currentUserDeptCode = undefined;
    this.ssoId = undefined;
    this.email = undefined;
    this.history = [];
  }

  initHistory = () => {
    let totalHistoryObj = JSON.parse(localStorage.getItem("cxmHistory"));

    if (!localStorage.getItem("cxmHistory")) {
      localStorage.setItem("cxmHistory", JSON.stringify({}));
      totalHistoryObj = {};
    }

    let historyArr = totalHistoryObj[this.currentUserAud];

    if (!historyArr) {
      totalHistoryObj[this.currentUserAud] = [];
      localStorage.setItem("cxmHistory", JSON.stringify(totalHistoryObj));

      historyArr = [];
    }

    this.history = historyArr;
  }

  setHistory = (history) => {
    if (this.history.length === 20) this.history.pop();

    this.history.unshift(history);

    const totalHistoryObj = JSON.parse(localStorage.getItem("cxmHistory"));
    totalHistoryObj[this.currentUserAud] = this.history;

    localStorage.setItem("cxmHistory", JSON.stringify(totalHistoryObj));
  }

  resetHistory = () => {
    this.history = [];
  }

  setCurrentUserRole = (role) => {
    this.currentUserRole = role;
  }

  setCurrentUserName = (name) => {
    this.currentUserName = name;
  }

  setEmail = (email) => {
    this.email = email;
  }
}

const UserStore = new UserClass();
export default UserStore;