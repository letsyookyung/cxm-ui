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

import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Material Dashboard 2 PRO React Context Provider
import { MaterialUIControllerProvider } from "context_carrot";

import { QueryClient, QueryClientProvider } from "react-query";

import RootErrorBoundary from "error/RootErrorBoundary";
import RootSkeleton from "skeleton/RootSkeleton"
import Auth from "main/Auth";

const { REACT_APP_HISTORY_PREFIX } = window.runConfig;

const container = document.getElementById("app");
const root = createRoot(container);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      suspense: true,
      useErrorBoundary: true,
    },
    mutations: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: Infinity,
      suspense: true,
      useErrorBoundary: true,
    },
  }
});

root.render(
  <QueryClientProvider client={queryClient}>
    <RootErrorBoundary>
      <Suspense fallback={<RootSkeleton />}>
        <BrowserRouter basename={REACT_APP_HISTORY_PREFIX}>
          <MaterialUIControllerProvider>
            <Auth />
          </MaterialUIControllerProvider>
        </BrowserRouter>
      </Suspense>
    </RootErrorBoundary>
  </QueryClientProvider>
);