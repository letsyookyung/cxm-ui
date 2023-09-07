import { flow, makeAutoObservable } from "mobx";
import Agent from "utils/Agent";
import UserStore from "./UserStore";

const { REACT_APP_HISTORY_PREFIX } = window.runConfig;

class PageClass {
  pageKey = "";
  pageName = "";
  pagePath = "";
  role = "";

  constructor() {
    makeAutoObservable(this);
  }

  setPageKey = (pageKey) => {
    this.pageKey = pageKey;
  }

  setPageName = (pageName) => {
    this.pageName = pageName;
  }

  setPagePath = (pagePath) => {
    this.pagePath = pagePath;
  }

  setRole = (role) => {
    this.role = role;
  }
}

const PageStore = new PageClass();
export default PageStore;
