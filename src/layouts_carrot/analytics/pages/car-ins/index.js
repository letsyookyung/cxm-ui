import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
// import MDTypography from "components_carrot/MDTypography";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";

import VerticalBarChart from "views/Charts/BarCharts/VerticalBarChart";
import HorizontalBarChart from "views/Charts/BarCharts/HorizontalBarChart";
import PieChart from "views/Charts/PieChart";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";
import { sdList, aggbList, afccdNmList } from "variables/constantList";

import verticalBarChartData from "layouts_carrot/pages/charts/data/verticalBarChartData";
import horizontalBarChartData from "layouts_carrot/pages/charts/data/horizontalBarChartData";
import pieChartData from "layouts_carrot/pages/charts/data/pieChartData";

import SearchBox from "./SearchBox";
import RegionChart from "./chart/RegionChart";
import AgeChart from "./chart/AgeChart";
import AffiliateChart from "./chart/AffiliateChart";

const apiURL = "/ui/cs/customer";

const CarIns = () => {
  
  const searchDataInit = {
    ctmno: "",
    age: "",
    region: null,
  };

  const searchForm = [
    {
      label: "시/도",
      key: "sd",
      type: "select",
      options: [{ label: "선택 안함", id: null }, ...sdList],
    },
    {
      label: "나이대",
      key: "aggb",
      type: "select",
      options: [{ label: "선택 안함", id: null }, ...aggbList],
    },
    {
      label: "제휴사코드명",
      key: "afccd_nm",
      type: "select",
      options: [{ label: "선택 안함", id: null }, ...afccdNmList],
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3} lineHeight={1}>
          <SearchBox
            searchDataInit={searchDataInit}
            searchForm={searchForm}
            // searchURL={`${apiURL}/retrieve`}
          />
          <MDBox p={3}>
            {/* <MDTypography variant="h5" fontWeight="medium">
            </MDTypography> */}
          </MDBox>

          {/* chart */}
          <MDBox mb={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} container spacing={3}>
                <Grid item xs={12} md={12}>
                  <AppErrorBoundary>
                    <Suspense fallback={<AppSkeleton />}>
                      <RegionChart/>
                      {/* <VerticalBarChart
                        icon={{ color: "dark", component: "leaderboard" }}
                        title="Bar chart"
                        height="20rem"
                        description="Sales related to age average"
                        chart={verticalBarChartData}
                      /> */}
                    </Suspense>
                  </AppErrorBoundary>
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppErrorBoundary>
                    <Suspense fallback={<AppSkeleton />}>
                      <AgeChart/>
                      {/* <PieChart
                        icon={{ color: "success", component: "donut_small" }}
                        title="Pie chart"
                        height="20rem"
                        description="Analytics Insights"
                        chart={pieChartData}
                      /> */}
                    </Suspense>
                  </AppErrorBoundary>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} >
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <AffiliateChart/>
                    {/* <HorizontalBarChart
                      icon={{ color: "dark", component: "splitscreen" }}
                      title="Bar chart horizontal"
                      height="45rem"
                      description="Sales related to age average"
                      chart={horizontalBarChartData}
                    /> */}
                  </Suspense>
                </AppErrorBoundary>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CarIns;
