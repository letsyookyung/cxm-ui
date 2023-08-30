import { useEffect, useCallback } from "react";

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

  // SSO 로그아웃
  // const logout = useMutation({
  //   mutationFn: (payload) => Agent.authRequests.put("/auth/sso/logout", payload),
  //   useErrorBoundary: true
  // });

  const init = () => {
    if (REACT_APP_ENV.startsWith("LOCAL")) {
      localLogin();
    } else {
      login();
    }
  };

  // 로그인(sso, jwt)
  const login = useCallback(() => {
    let ssoId = "";
    let resultCode = "";

    if (!AuthStore.accessToken) {
      // SSO 로그인 시도
      const payload = {
        redirectUrl: REACT_APP_AUTH_REDIRECT_URL,
      };
      useSsoLogin.mutate(payload, {
        onSuccess: (data, variables, context) => {
          // 인증 처리
          resultCode = data.resultCode ? data.resultCode : "";
          ssoId = data.ssoId ? data.ssoId : "";
          jwtLogin(resultCode, jwtLogin);
        },
        // onError: (error, variables, context) => {
        //   switch (error.response.status) {
        //     // TODO 에러 문구 세분화
        //     case 401:
        //       error.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
        //       break;
        //     case 403:
        //       error.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
        //       break;
        //     case 404:
        //       error.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
        //       break;
        //     case 500:
        //       error.display = "SSO 서버 오류, 잠시 후 다시 이용해주세요.";
        //       break;
        //     default:
        //       error.display = "SSO 연결 오류, 잠시 후 다시 이용해주세요.";
        //       break;
        //   }
        //   throw error;
        // },
      });
    } else {
      // AT 만 존재할 경우 유저정보 재 세팅
      UserStore.pullUser(AuthStore.accessToken);
      UserStore.initHistory();
    }
  }, []);

  const jwtLogin = (resultCode, ssoId) => {
    // SSO 로그인 결과가 성공인 경우 === 1
    if (resultCode === "1") {
      // JWT 로그인 시도
      const payload = {
        id: ssoId,
        realm: REACT_APP_AUTH_REALM,
      };
      useJwtLogin.mutate(payload, {
        onSuccess: (data, variables, context) => {
          console.log(`@@ login success=${data}`);
          // 인증 처리
          AuthStore.setAccessToken(data.access_token);
          AuthStore.setRefreshToken(data.refresh_token);
          UserStore.pullUser(AuthStore.accessToken);
          UserStore.initHistory();
        },
        onError: (error, variables, context) => {
          console.log(`@@ login failure`);
          console.log(`${error}`);
          switch (error.response.status) {
            case 400:
              if (error.response.data.code === -101)
                error.display = "권한이 없거나 만료되었습니다 확인 후 다시 이용해주세요.";
              else
                error.display = "잘못된 요청입니다 확인 후 다시 이용해주세요.";
              break;
            case 401:
              error.display = "허용되지 않은 요청입니다 확인 후 다시 이용해주세요.";
              break;
            case 403:
              error.display = "허용되지 않은 IP 입니다 확인 후 다시 이용해주세요.";
              break;
            case 500:
              error.display = "서버 오류입니다 잠시 후 다시 이용해주세요.";
              break;
            default:
              error.display = "서버와의 연결이 원활하지 않습니다 잠시 후 다시 이용해주세요.";
              break;
          }
          throw error;
        },
      });
    } else {
      console.log(`SSO 로그인 실패, ssoId: ${ssoId}, resultCode: ${resultCode}`);
      // SSO 로그인 페이지로 리다이렉트 된 상태
    }
  };

  // 로컬 환경 테스트 용도(sso 제외, jwt 만)
  // const localLogin = useCallback(() => {
  const localLogin = () => {
    if (!AuthStore.accessToken) {
      // JWT 로그인 시도
      const payload = {
        id: "9999995",
        realm: REACT_APP_AUTH_REALM,
      };
      useJwtLogin.mutate(payload, {
        onSuccess: (data, variables, context) => {
          // 인증 처리
          console.log(`authProvider login true`);
          AuthStore.setAccessToken(data.access_token);
          AuthStore.setRefreshToken(data.refresh_token);
          UserStore.pullUser(AuthStore.accessToken);
          UserStore.initHistory();
        },
        // onError: (error, variables, context) => {
        //   console.log(`authProvider login failure`);
        //   console.log(error);
        //   // throw error;
        //   switch (error.response.status) {
        //     case 400:
        //       error.display =  error.response.data.code === -101
        //         ? "권한이 없거나 만료되었습니다 확인 후 다시 이용해주세요."
        //         : "잘못된 요청입니다 확인 후 다시 이용해주세요."
        //       break;
        //     case 401:
        //       error.display = "허용되지 않은 요청입니다 확인 후 다시 이용해주세요.";
        //       break;
        //     case 403:
        //       error.display = "허용되지 않은 IP 입니다 확인 후 다시 이용해주세요.";
        //       break;
        //     case 500:
        //       error.display = "서버 오류입니다 잠시 후 다시 이용해주세요.";
        //       break;
        //     default:
        //       error.display = "서버와의 연결이 원활하지 않습니다 잠시 후 다시 이용해주세요.";
        //       break;
        //   }
        //   throw error;
        // },
      });
    } else {
      // AT 만 존재할 경우 유저정보 재 세팅
      UserStore.pullUser(AuthStore.accessToken);
      UserStore.initHistory();
    }
  // }, [UserStore]);
  };

  useEffect(() => {
    console.log("@@ authProvider init");
    init();
    console.log("@@ authProvider complete");
  }, []);

  return children;
};

export default AuthProvider;
