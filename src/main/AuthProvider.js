import { useEffect } from "react";

import { observer } from "mobx-react-lite";
import { useMutation } from "react-query";

import AuthStore from "store/AuthStore";
import UserStore from "store/UserStore";
import Agent from "utils/Agent";

const { REACT_APP_ENV, REACT_APP_AUTH_REDIRECT_URL, REACT_APP_AUTH_REALM } = window.runConfig;

const AuthProvider = ({ children }) => {
  // SSO 로그인
  const useSsoLogin = useMutation({
    mutationFn: (payload) => Agent.authRequests.post("/auth/sso/login", payload),
    useErrorBoundary: true
  });

  // JWT 로그인
  const useJwtLogin = useMutation({
    mutationFn: (payload) => Agent.authRequests.post("/auth/login", payload),
    useErrorBoundary: true
  });

  const init = () => {
    if (REACT_APP_ENV.startsWith("LOCAL")) {
      localLogin();
    } else {
      login();
    }
  };

  // 로그인(sso, jwt)
  const login = () => {
    if (AuthStore.accessToken) {
      // AT 존재할 경우 유저정보 재 세팅
      UserStore.pullUser(AuthStore.accessToken);
      UserStore.initHistory();
    } else {
      // SSO 로그인 시도
      ssoLogin();
    }
  };

  // 로컬 환경 테스트 용도(sso 제외, jwt 만)
  const localLogin = () => {
    if (AuthStore.accessToken) {
      // AT 존재할 경우 유저정보 재 세팅
      UserStore.pullUser(AuthStore.accessToken);
      UserStore.initHistory();
    } else {
      // JWT 로그인 시도
      jwtLogin("1", "9999997");
    }
  };

  const ssoLogin = () => {
      // SSO 로그인 시도
      const payload = {
        redirectUrl: REACT_APP_AUTH_REDIRECT_URL,
      };
      useSsoLogin.mutate(payload, {
        onSuccess: (data) => {
          // 인증 처리
          const resultCode = data.resultCode ? data.resultCode : "";
          const ssoId = data.ssoId ? data.ssoId : "";
          // SSO 로그인 결과로 JWT 로그인 시도
          jwtLogin(resultCode, ssoId);
        },
      });
  };

  const jwtLogin = (resultCode, ssoId) => {
    // SSO 로그인 결과가 성공인 경우 === 1
    if (resultCode === "1") {
      // JWT 로그인 시도
      const payload = {
        id: ssoId,
        realm: REACT_APP_AUTH_REALM,
      };
      useJwtLogin.mutate(payload, {
        onSuccess: (data) => {
          console.log("@@ login success");
          console.log(data);
          // 인증 처리
          AuthStore.setAccessToken(data.access_token);
          AuthStore.setRefreshToken(data.refresh_token);
          UserStore.pullUser(AuthStore.accessToken);
          UserStore.initHistory();
        },
      });
    } else {
      console.log(`SSO 로그인 실패, ssoId: ${ssoId}, resultCode: ${resultCode}`);
      // SSO 로그인 페이지로 리다이렉트 된 상태
    }
  };

  useEffect(() => {
    console.log("@@ AuthProvider");
    init();
  }, []);

  return children;
};

export default observer(AuthProvider);
