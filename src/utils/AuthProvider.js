import React, { useContext, useState, useEffect, lazy, useCallback, useRef } from "react";
import Swal from "sweetalert2";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDButton from "components_carrot/MDButton";
import MDTypography from "components_carrot/MDTypography";

import { useMutation, useQuery } from "react-query";
import axios from "axios";
import qs from "qs";

import AuthStore from "store/AuthStore";
import UserStore from "store/UserStore";
import Agent from "utils/Agent";
// import useStores from "store/useStores";
import { observer } from "mobx-react";

const { REACT_APP_ENV, REACT_APP_AUTH_REDIRECT_URL, REACT_APP_AUTH_REALM } = window.runConfig;

axios.defaults.paramsSerializer = (params) => qs.stringify(params);

const AuthProvider = observer(({ children }) => {
  // const authStore = useContext(AuthStore);
  const userStore = useContext(UserStore);
  // const { userStore } = useStores();

  // SSO 로그인
  const ssoLogin = useMutation({
    mutationFn: (payload) => Agent.authRequests.post("/auth/sso/login", payload),
    useErrorBoundary: true
  });

  // JWT 로그인
  const jwtLogin = useMutation({
    mutationFn: (payload) => Agent.authRequests.post("/auth/login", payload),
    useErrorBoundary: true
  });

  // 로그아웃
  const logout = useMutation({
    mutationFn: (payload) => Agent.authRequests.put("/auth/sso/logout", payload),
    useErrorBoundary: true
  });

  const init = () => {
    // window.localStorage.removeItem("cxmAccessToken");
    // window.localStorage.removeItem("cxmRefreshToken");

    if (REACT_APP_ENV.startsWith("LOCAL")) {
      localLogin();
    } else {
      login();
    }
  };

  // 로그인(sso, jwt)
  const login = async () => {
    let ssoId = "";
    let resultCode = "";

    if (!AuthStore.getAccessToken) {
      // SSO 로그인 시도
      const payload = {
        redirectUrl: REACT_APP_AUTH_REDIRECT_URL,
      };
      const jwtResponse = ssoLogin.mutate(payload, {
        onSuccess: (data, variables, context) => {
          // 인증 처리
          ssoId = data.ssoId ? data.ssoId : "";
          resultCode = data.resultCode ? data.resultCode : "";
        },
        onError: (error, variables, context) => {
          switch (error.response.status) {
            // TODO 에러 문구 세분화
            case 401:
              error.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
              break;
            case 403:
              error.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
              break;
            case 404:
              error.display = "SSO 인증 실패, 확인 후 다시 이용해주세요.";
              break;
            case 500:
              error.display = "SSO 서버 오류, 잠시 후 다시 이용해주세요.";
              break;
            default:
              error.display = "SSO 연결 오류, 잠시 후 다시 이용해주세요.";
              break;
          }
          throw error;
        },
      });
    }

    // SSO 로그인 결과가 성공인 경우 === 1
    if (resultCode === "1") {
      // JWT 로그인 시도
      const payload = {
        id: ssoId,
        realm: REACT_APP_AUTH_REALM,
      };
      const jwtResponse = jwtLogin.mutate(payload, {
        onSuccess: (data, variables, context) => {
          // 인증 처리
          AuthStore.setAccessToken(data.access_token);
          AuthStore.setRefreshToken(data.refresh_token);
          userStore.pullUser(AuthStore.getAccessToken);
          userStore.initHistory();
        },
        onError: (error, variables, context) => {
          switch (error.response.status) {
            case 400:
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
  const localLogin = async () => {
      // JWT 로그인 시도
      const payload = {
        id: "9999997",
        realm: REACT_APP_AUTH_REALM,
      };
      const jwtResponse = jwtLogin.mutate(payload, {
        onSuccess: (data, variables, context) => {
          // 인증 처리
          AuthStore.setAccessToken(data.access_token);
          AuthStore.setRefreshToken(data.refresh_token);
          userStore.pullUser(AuthStore.getAccessToken);
          userStore.initHistory();
          console.log(userStore.getUserRole);
        },
        onError: (error, variables, context) => {
          switch (error.response.status) {
            case 400:
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
  };

  useEffect(() => {
    console.log("@@ auth init");
    init();
    console.log("@@ auth complete");
  }, []);

    // return
    // <>
    //   {userStore.getUserRole ? {children} : (
    //     <MDBox my={25}>
    //       <Grid container spacing={3} justifyContent="center">
    //         <Grid item xs={12} md={8} lg={6}>
    //           <Card>
    //             <MDBox pt={2} px={2} textAlign="center">
    //               <MDTypography component="p" variant="h4" fontWeight="regular" color="text">
    //                 {/* <b>{error.response.data.code ?? error.response.status}: {error.display ?? error.response.data.message}</b> */}
    //               </MDTypography>
    //             </MDBox>
    //             <MDBox my={5} />
    //             <Divider />
    //             <MDBox pt={2} px={2}>
    //               <Grid container spacing={3} justifyContent="flex-end">
    //                 {/* <MDButton variant="outlined" color="dark" sx={{ marginY: 2, marginLeft: 2}} onClick={() => navigate(-1)}>
    //                   이전 화면
    //                 </MDButton> */}
    //                 <MDButton variant="outlined" color="dark" sx={{ marginY: 2, marginLeft: 2}} onClick={() => init()}>
    //                   로그인
    //                 </MDButton>
    //               </Grid>
    //             </MDBox>
    //           </Card>
    //         </Grid>
    //       </Grid>
    //     </MDBox>
    //   )}
    // </>;

  // return <>{userStore.getUserRole && (children)}</>;
  return children;
})

export default AuthProvider;
