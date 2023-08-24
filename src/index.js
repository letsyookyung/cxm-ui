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

import React, { Suspense, useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider } from "context";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 PRO React themes
import theme from "assets_carrot/theme";

import { QueryClient, QueryClientProvider } from "react-query";

import RootErrorBoundary from "error/RootErrorBoundary";
import RootSkeleton from "main/RootSkeleton"

import AuthErrorBoundary from "error/AuthErrorBoundary";
import AuthProvider from "utils/AuthProvider";
import AuthSkeleton from "main/AuthSkeleton"
import Auth from "Auth";


// import App from "App";
// const App = React.lazy(() => import("App")); // test suspense
// const Auth = React.lazy(() => import("Auth")); // test suspense

const container = document.getElementById("app");
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      suspense: true
    }
  }
});

root.render(
  <QueryClientProvider client={queryClient}>
    <RootErrorBoundary>
      <Suspense fallback={<RootSkeleton />}>
        <BrowserRouter>
          <MaterialUIControllerProvider>
            <Auth />
          </MaterialUIControllerProvider>
        </BrowserRouter>
      </Suspense>
    </RootErrorBoundary>
  </QueryClientProvider>
);