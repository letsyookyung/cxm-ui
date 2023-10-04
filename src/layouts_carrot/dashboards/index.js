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

import { Suspense, lazy, useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";
import CustomerCountCard from "./cards/CustomerCountCard";
import CarInsCountCard from "./cards/CarInsCountCard";
import CarInsCustomerCountCard from "./cards/CarInsCustomerCountCard";

function Analytics() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <CustomerCountCard
                      title="총 고객 수"
                    />
                  </Suspense>
                </AppErrorBoundary>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <CarInsCountCard
                      title="자동차보험 계약 수"
                    />
                  </Suspense>
                </AppErrorBoundary>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <CarInsCustomerCountCard
                      title="자동차보험 가입 고객 수"
                    />
                  </Suspense>
                </AppErrorBoundary>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
