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

import React, { useState, useEffect, Suspense, useCallback, useContext } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";

// Material Dashboard 2 PRO React examples
// import Sidenav from "views/Sidenav";

import Configurator from "views/Configurator";

// Material Dashboard 2 PRO React themes
import theme from "assets_carrot/theme";

// Material Dashboard 2 PRO React layouts
import Analytics from "layouts_carrot/dashboards/analytics";

// Material Dashboard 2 PRO React routes
import routes from "routes";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import carrotBrand from "assets_carrot/images/logo_square.png";

import UserStore from "store/UserStore";
import AuthStore from "store/AuthStore";
import AuthErrorBoundary from "error/AuthErrorBoundary";
import AuthProvider from "utils/AuthProvider";
import AuthSkeleton from "main/AuthSkeleton"
import AppSkeleton from "main/AppSkeleton"
import App from "App";
import { Provider, observer } from "mobx-react";
import { trace } from "mobx";
// import useStores from "store/useStores";

const { REACT_APP_HISTORY_PREFIX } = window.runConfig;

const Auth = observer(() => {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  // const UserStore = useContext(UserStore);
  // const { getAccessToken } = useContext(AuthStore);
  // const { userStore } = useStores();
  trace(true)
  const userStore = useContext(UserStore);

  const getRoutes = useCallback((allRoutes) => 
    allRoutes
      .filter((route) => userStore.getUserRole.indexOf(route.role) > -1)
      .map((route) => {
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route exact path={REACT_APP_HISTORY_PREFIX + route.route} element={route.component} key={route.key} />;
        }
      return null;
    }), []);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  useEffect(() => {
    console.log(`@@ Auth: layout: ${layout}`);
    console.log(userStore.getUserRole);
  }, [userStore]);

  // const Sidenav = React.lazy(() => import("views/Sidenav")); // test suspense

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthErrorBoundary>
        <Suspense fallback={<AuthSkeleton />}>
          <AuthProvider>
            <Suspense fallback={<AppSkeleton />}>
              {/* <Provider userStore={userStore}> */}
                {userStore.getUserRole && <App />}
              {/* </Provider> */}
              {/* <App /> */}
            </Suspense>
          </AuthProvider>
        </Suspense>
      </AuthErrorBoundary>
    </ThemeProvider>
  );
})

export default Auth;