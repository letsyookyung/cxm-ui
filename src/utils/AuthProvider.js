import React, { useContext, useState, useEffect, lazy } from "react";
import Swal from "sweetalert2";

import AuthStore from "store/AuthStore";
import UserStore from "store/UserStore";
import AgentStore from "store/AgentStore";

const { REACT_APP_HISTORY_PREFIX, REACT_APP_ENV } = window.runConfig;

const events = ["load", "click", "keypress"];

const AuthProvider = ({ children }) => {
  // const authStore = useContext(AuthStore);
  // const userStore = useContext(UserStore);
  const agentStore = useContext(AgentStore);

  const [showModal, setShowModal] = useState(false);

  const init = async () => {
    let ssoId = "";
    let resultCode = "";

    if (!AuthStore.getAccessToken) {
      try {
        // SSO 로그인 시도
        const response = await AuthStore.ssoLogin();
        ssoId = response.ssoId ? response.ssoId : "";
        resultCode = response.resultCode ? response.resultCode : "";
      } catch(err) {
        switch (err.status) {
          // TODO 에러 문구 세분화
          case 401:
            err.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
            break;
          case 403:
            err.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
            break;
          case 404:
            err.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
            break;
          case 500:
            err.display = "SSO 서버 오류, 잠시 후 다시 이용해주세요.";
            break;
          default:
            err.display = "SSO 연결 오류, 잠시 후 다시 이용해주세요.";
            break;
        }
        throw err;
      }
    }

    // SSO 로그인 결과가 성공인 경우 === 1
    if (ssoId && resultCode === "1") {
      try {
        // JWT 로그인 시도
        const response = await AuthStore.jwtLogin(ssoId);
        // 인증 처리
        UserStore.pullUser(AuthStore.getAccessToken);
        UserStore.initHistory();
      } catch(err) {
        switch (err.status) {
          case 400:
            err.display = "잘못된 요청입니다 확인 후 다시 이용해주세요.";
            break;
          case 401:
            err.display = "허용되지 않은 요청입니다 확인 후 다시 이용해주세요.";
            break;
          case 403:
            err.display = "허용되지 않은 IP 입니다 확인 후 다시 이용해주세요.";
            break;
          case 500:
            err.display = "서버 오류입니다 잠시 후 다시 이용해주세요.";
            break;
          default:
            err.display = "서버와의 연결이 원활하지 않습니다 잠시 후 다시 이용해주세요.";
            break;
        }
        throw err;
      }
    } else {
      console.log(`SSO 로그인 실패, ssoId: ${ssoId}, resultCode: ${resultCode}`);
      // SSO 로그인 페이지로 리다이렉트 된 상태
    }
  };

  // 로컬 환경 테스트 용도
  const localInit = async () => {
    try {
      // window.localStorage.removeItem("cxmAccessToken");
      // window.localStorage.removeItem("cxmRefreshToken");
      // JWT 로그인 시도
      const response = await AuthStore.jwtLogin("9999997");

      UserStore.pullUser(AuthStore.getAccessToken);
      UserStore.initHistory();
    } catch (err) {
      switch (err.status) {
        case 400:
          err.display = "잘못된 요청입니다 확인 후 다시 이용해주세요.";
          break;
        case 401:
          err.display = "허용되지 않은 요청입니다 확인 후 다시 이용해주세요.";
          break;
        case 403:
          err.display = "허용되지 않은 IP 입니다 확인 후 다시 이용해주세요.";
          break;
        case 500:
          err.display = "서버 오류입니다 잠시 후 다시 이용해주세요.";
          break;
        default:
          err.display = "서버와의 연결이 원활하지 않습니다 잠시 후 다시 이용해주세요.";
          break;
      }
      throw err;
    }
  };

  useEffect(() => {
    if (REACT_APP_ENV.startsWith("LOCAL")) {
      localInit();
    } else {
      init();
    }
  }, []);

  const resetStore = () => {
    UserStore.forgetUser();
    AuthStore.logout();
  };

  const logout = () => {
    UserStore.forgetUser();
    AuthStore.logout();
  };

  const keepLogin = () => {
    setShowModal(false);
    resetTimeout();
  };

  return children;
};

export default AuthProvider;
