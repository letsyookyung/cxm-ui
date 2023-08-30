/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React, { Suspense, useEffect } from "react";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 PRO React themes
import theme from "assets_carrot/theme";

import AuthErrorBoundary from "error/AuthErrorBoundary";
import AppErrorBoundary from "error/AppErrorBoundary";
import AuthProvider from "utils/AuthProvider";
import AuthSkeleton from "main/AuthSkeleton"
import AppSkeleton from "main/AppSkeleton"
import WithTimer from "utils/WithTimer";
import App from "App";
import AuthStore from "store/AuthStore";
// import UserStore from "store/UserStore";

const Auth = () => {

  useEffect(() => {
    const at = AuthStore.accessToken !== undefined
    console.log(`at=${at}`);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthErrorBoundary>
        <Suspense fallback={<AuthSkeleton />}>
          <AuthProvider >
          {AuthStore.accessToken === undefined
            ? <div>로그인해주세요</div>
            : 
              <WithTimer>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <App />
                  </Suspense>
                </AppErrorBoundary>
              </WithTimer>
          }
          </AuthProvider>
        </Suspense>
      </AuthErrorBoundary>
    </ThemeProvider>
  );
};

export default Auth;