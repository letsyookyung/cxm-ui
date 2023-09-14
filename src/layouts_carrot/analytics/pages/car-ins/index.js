import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
// import MDTypography from "components_carrot/MDTypography";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";
import { sdList, aggbList, afccdNmList } from "variables/constantList";

import SearchBox from "./SearchBox";
import RegionChart from "./chart/RegionChart";
import AgeChart from "./chart/AgeChart";
import AffiliateChart from "./chart/AffiliateChart";

const apiURL = "/ui/cs/customer";

const CarIns = () => {
  
  const searchDataInit = {
    sd: null,
    aggb: null,
    afccdNm: null,
  };

  const [sdArray, setSdArray] = useState(sdList);
  const [aggbArray, setAggbArray] = useState(aggbList);
  const [afccdNmArray, setAfccdNmArray] = useState(afccdNmList);

  const searchForm = [
    {
      label: "시/도",
      key: "sd",
      type: "select",
      options: [{ label: "전체", id: null }, ...sdList],
      defaultValue: "전체",
    },
    {
      label: "나이대",
      key: "aggb",
      type: "select",
      options: [{ label: "전체", id: null }, ...aggbList],
      defaultValue: "전체",
    },
    {
      label: "제휴사코드명",
      key: "afccd_nm",
      type: "select",
      options: [{ label: "전체", id: null }, ...afccdNmList],
      defaultValue: "전체",
    },
  ];

  const [params, setParams] = useState({});

  // useEffect(() => {
  //   console.log(params)
  // }, [params]);

  // useEffect(() => {
  //   console.log(afccdNmArray)
  // }, [afccdNmArray]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3} lineHeight={1}>
          <SearchBox
            searchDataInit={searchDataInit}
            searchForm={searchForm}
            setParams={setParams}
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
                      <RegionChart
                        params={params}
                        setSdArray={setSdArray}
                      />
                    </Suspense>
                  </AppErrorBoundary>
                </Grid>
                <Grid item xs={12} md={12}>
                  <AppErrorBoundary>
                    <Suspense fallback={<AppSkeleton />}>
                      <AgeChart
                        params={params}
                        setAggbArray={setAggbArray}
                      />
                    </Suspense>
                  </AppErrorBoundary>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6} >
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <AffiliateChart
                      params={params}
                      setAfccdNmArray={setAfccdNmArray}
                    />
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
