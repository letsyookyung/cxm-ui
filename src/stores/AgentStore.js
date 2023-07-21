import { observable, action } from "mobx";
import React, { createContext } from "react";

import AddAlertIcon from '@mui/icons-material/AddAlert';
import CircularProgress from '@mui/material/CircularProgress';
import MDSnackbar from "components_carrot/MDSnackbar";

import Agent from "utils/Agent";

const { REACT_APP_HISTORY_PREFIX } = window.runConfig;

class AgentStore {
  @observable requestErrorNoti = null;
  @observable requestSuccessNoti = null;
  @observable requestLoaded = true;
  @observable spinner = null;

  @observable type = null;
  @observable title = null;
  @observable subTitle = "오류";
  @observable description = "불편을 드려 죄송합니다 잠시 후에 다시 이용해 주세요";

  @observable pageName = "";
  @observable pagePath = "";

  handleErrors = (err, handler) => {
    let errCode = 0;

    if (err.status) errCode = JSON.parse(err.message).code;

    switch (err.status) {
      case 401:
        return this.tokenRefreshRequest(handler);
      case 400:
        if (errCode == -6 || errCode == -7) {
          this.setRequestErrorNoti(i18n.t("error.bad_request"));
        } else if (errCode == -100) {
          this.setRequestErrorNoti("중복된 데이터입니다.");
        } else if (errCode == -101) {
          this.setRequestErrorNoti("데이터가 존재하지 않습니다.");
        } else if (errCode == -102) {
          this.setRequestErrorNoti(JSON.parse(err.message).message);
        } else if (errCode == -250) {
          this.setRequestErrorNoti("유효한 토큰이 없습니다.");
        } else {
          this.setRequestErrorNoti(JSON.parse(err.message).message);
        }
        break;
      case 409:
        if (errCode == -102) {
          this.setRequestErrorNoti(JSON.parse(err.message).message);
        } else {
          this.setRequestErrorNoti(i18n.t("error.conflict.default"));
        }
        break;
      case 500:
        if (errCode == -900 || errCode == -901) {
          this.setRequestErrorNoti(i18n.t("error.timeout"));
        } else {
          this.setRequestErrorNoti(JSON.parse(err.message).message);
          // this.type = "server";
          // this.title = null;
          // this.subTitle = "서버 에러";
          // this.description = "관리자에게 문의주시기 바랍니다.";
        }
        break;
      default:
        this.type = "server";
        this.title = null;
        this.subTitle = "서버 에러";
        this.description = "관리자에게 문의주시기 바랍니다.";
        break;
    }
    throw err;
  };

  authHandleErrors = (err, handler) => {
    let errCode = 0;
    try {
      errCode = JSON.parse(err.message).code;
    } catch (e) {
      // ignore
    }

    switch (err.status) {
      case 401:
        return this.tokenRefreshRequest(handler);
      case 400:
        if (errCode == -100) {
          this.setRequestErrorNoti(i18n.t("error.duplicated"));
        }
        break;
      case 409:
        if (errCode == -102) {
          this.setRequestErrorNoti(i18n.t("error.conflict.realm"));
        } else {
          this.setRequestErrorNoti(i18n.t("error.conflict.default"));
        }
        break;
      default:
        this.type = "server";
        this.title = null;
        this.subTitle = "서버 에러";
        this.description = "관리자에게 문의주시기 바랍니다.";
    }
    throw err;
  };

  @action setRequestLoaded(load) {
    this.requestLoaded = load;
    if (load && this.spinner === null) {
      this.spinner = <CircularProgress />;
    } else {
      this.spinner = null;
    }
  }

  @action setRequestErrorNoti(message) {
    if (this.requestErrorNoti === null && message !== null) {
      this.requestErrorNoti = (
        <MDSnackbar
          place="tc"
          color="danger"
          message={message}
          icon={AddAlertIcon}
          open
          closeNotification={() => this.setRequestErrorNoti(null)}
          close
        />
      );

      setTimeout(() => {
        this.requestErrorNoti = null;
      }, 1500);
    } else if (message === null) {
      this.requestErrorNoti = null;
    }
  }

  @action setRequestInfoNoti(message) {
    if (this.requestInfoNoti === null && message !== null) {
      this.requestInfoNoti = (
        <MDSnackbar
          place="tc"
          color="info"
          message={message}
          icon={AddAlertIcon}
          open
          closeNotification={() => this.setRequestInfoNoti(null)}
          close
        />
      );

      setTimeout(() => {
        this.requestInfoNoti = null;
      }, 1500);
    } else if (message === null) {
      this.requestInfoNoti = null;
    }
  }

  @action setRequestSuccessNoti(message) {
    if (this.requestSuccessNoti === null && message !== null) {
      this.requestSuccessNoti = (
        <MDSnackbar
          place="tc"
          color="success"
          message={message}
          icon={AddAlertIcon}
          open
          closeNotification={() => this.setRequestSuccessNoti(null)}
          close
        />
      );

      setTimeout(() => {
        this.requestSuccessNoti = null;
      }, 1500);
    } else if (message === null) {
      this.requestSuccessNoti = null;
    }
  }

  @action setType(type) {
    this.type = type;
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setSubTitle(subTitle) {
    this.subTitle = subTitle;
  }

  @action setDescription(description) {
    this.description = description;
  }

  @action resetError() {
    this.type = null;
    this.title = null;
    this.subTitle = null;
    this.description = null;
  }

  @action setPageName(pageName) {
    this.pageName = pageName;
  }

  @action setPagePath(pagePath) {
    this.pagePath = pagePath;
  }

  requests = {
    del: async (url, body) => {
      try {
        return await Agent.requests.del(url, body);
      } catch (error) {
        return this.handleErrors(error, () => Agent.requests.del(url, body));
      }
    },
    get: async (url, param) => {
      try {
        return await Agent.requests.get(url, param);
      } catch (error) {
        return this.handleErrors(error, () => Agent.requests.get(url, param));
      }
    },
    getFile: async (url, param) => {
      try {
        return await Agent.requests.getFile(url, param);
      } catch (error) {
        return this.handleErrors(error, () => Agent.requests.getFile(url, param));
      }
    },
    put: async (url, body) => {
      try {
        return await Agent.requests.put(url, body);
      } catch (error) {
        return this.handleErrors(error, () => Agent.requests.put(url, body));
      }
    },
    post: async (url, body) => {
      try {
        return await Agent.requests.post(url, body);
      } catch (error) {
        return this.handleErrors(error, () => Agent.requests.post(url, body));
      }
    },
    postFile: async (url, body, file) => {
      try {
        return await Agent.requests.postFile(url, body, file);
      } catch (error) {
        return this.handleErrors(error, () => Agent.requests.postFile(url, body, file));
      }
    },
    patch: async (url, body) => {
      try {
        return await Agent.requests.patch(url, body);
      } catch (error) {
        return this.handleErrors(error, () => Agent.requests.patch(url, body));
      }
    },
  };

  authRequests = {
    del: async (url, body) => {
      try {
        return await Agent.authRequests.del(url, body);
      } catch (error) {
        return this.authHandleErrors(error, () => Agent.authRequests.del(url, body));
      }
    },
    get: async (url, param) => {
      try {
        return await Agent.authRequests.get(url, param);
      } catch (error) {
        return this.authHandleErrors(error, () => Agent.authRequests.get(url, param));
      }
    },
    put: async (url, body) => {
      try {
        return await Agent.authRequests.put(url, body);
      } catch (error) {
        return this.authHandleErrors(error, () => Agent.authRequests.put(url, body));
      }
    },
    post: async (url, body) => {
      try {
        return await Agent.authRequests.post(url, body);
      } catch (error) {
        return this.authHandleErrors(error, () => Agent.authRequests.post(url, body));
      }
    },
  };

  tokenRefreshRequest = async (handler) => {
    const rt = localStorage.getItem("refreshToken");
    window.localStorage.removeItem("accessToken");
    try {
      const response = await Agent.authRequests.post("/auth/refresh", {
        refreshToken: rt,
      });
      localStorage.setItem("accessToken", response.access_token);
      localStorage.setItem("refreshToken", response.refresh_token);

      return await handler();
    } catch (error) {
      const response = await Agent.authRequests.put("/auth/sso/logout");

      if (response.redirectUrl === undefined) {
        return;
      }

      window.localStorage.removeItem("accessToken");
      window.localStorage.removeItem("refreshToken");

      Agent.superagent
        .get(response.redirectUrl)
        .withCredentials()
        .then(() => {})
        .finally(() => {
          window.location.href = `${REACT_APP_HISTORY_PREFIX}/`;
        });
    }
  };
}

export default createContext(new AgentStore());
