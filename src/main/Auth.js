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

import React, { Suspense, useEffect, useState } from "react";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 PRO React themes
import theme from "assets_carrot/theme";

import { observer } from "mobx-react-lite";

import AuthErrorBoundary from "error/AuthErrorBoundary";
import AppErrorBoundary from "error/AppErrorBoundary";
import AuthSkeleton from "skeleton/AuthSkeleton"
import AppSkeleton from "skeleton/AppSkeleton"
import WithTimer from "utils/WithTimer";
import AuthProvider from "main/AuthProvider";
import App from "main/App";
import AuthStore from "store/AuthStore";


const Auth = () => {
  const [loaded, setLoaded] = useState(false);

  const syncAt = () => {
    const at = window.localStorage.getItem("cxmAccessToken");
    if (at) AuthStore.setAccessToken(at);

    setLoaded(true);
  };

  useEffect(() => {
    console.log("@@ Auth");
    syncAt();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthErrorBoundary>
        <Suspense fallback={<AuthSkeleton />}>
          {loaded &&
            <AuthProvider >
              {AuthStore.accessToken &&
                <WithTimer>
                  <AppErrorBoundary>
                    <Suspense fallback={<AppSkeleton />}>
                      <App />
                    </Suspense>
                  </AppErrorBoundary>
                </WithTimer>
              }
            </AuthProvider>
          }
        </Suspense>
      </AuthErrorBoundary>
    </ThemeProvider>
  );
};

export default observer(Auth);