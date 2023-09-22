import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
// import MDTypography from "components_carrot/MDTypography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";

import CustomerCountCard from "layouts_carrot/dashboards/cards/CustomerCountCard";
import CarInsCountCard from "layouts_carrot/dashboards/cards/CarInsCountCard";
import CarInsCustomerCountCard from "layouts_carrot/dashboards/cards/CarInsCustomerCountCard";
import SearchBox from "./SearchBox";
import RegionChart from "./chart/RegionChart";
import AgeChart from "./chart/AgeChart";
import SexcdChart from "./chart/SexcdChart";
import AffiliateChart from "./chart/AffiliateChart";
import CatcdNmChart from "./chart/CatcdNmChart";
import CramtChart from "./chart/CramtChart";
import CrPrdCmpcdNmChart from "./chart/CrPrdCmpcdNmChart";
import DcXcGrdcdChart from "./chart/DcXcGrdcdChart";
import FomaYnChart from "./chart/FomaYnChart";
import RnwYnChart from "./chart/RnwYnChart";
import ContractAliveChart from "./chart/ContractAliveChart";

const apiURL = "/ui/cs/customer";

const CarIns = () => {

  const searchDataInit = {
    sd: null,
    aggb: null,
    sexcd: null,
    afccdNm: null,
    rnwYn: null,
    undCrYn: null,
    catcdNm: null,
    crPrdCmpcdNm: null,
    fomaYn: null,
    dcXcGrdcd: null,
    cramt: null,
  };

  const [sdArray, setSdArray] = useState([]);
  const [aggbArray, setAggbArray] = useState([]);
  const [sexcdArray, setSexcdArray] = useState([]);
  const [afccdNmArray, setAfccdNmArray] = useState([]);
  const [rnwYnArray, setRnwYnArray] = useState([]);
  const [undCrYnArray, setUndCrYnArray] = useState([]);
  const [catcdNmArray, setCatcdNmArray] = useState([]);
  const [crPrdCmpcdNmArray, setCrPrdCmpcdNmArray] = useState([]);
  const [fomaYnArray, setFomaYnArray] = useState([]);
  const [dcXcGrdcdArray, setDcXcGrdcdArray] = useState([]);
  const [cramtArray, setCramtArray] = useState([]);

  const searchForm = [
    {
      label: "시/도",
      key: "sd",
      type: "select",
      options: [{ label: "전체", id: null }, ...sdArray],
      defaultValue: "전체",
    },
    {
      label: "나이대",
      key: "aggb",
      type: "select",
      options: [{ label: "전체", id: null }, ...aggbArray],
      defaultValue: "전체",
    },
    {
      label: "성별",
      key: "sexcd",
      type: "select",
      options: [{ label: "전체", id: null }, ...sexcdArray],
      defaultValue: "전체",
    },
    {
      label: "제휴사코드명",
      key: "afccdNm",
      type: "select",
      options: [{ label: "전체", id: null }, ...afccdNmArray],
      defaultValue: "전체",
    },
    {
      label: "갱신여부",
      key: "rnwYn",
      type: "select",
      options: [{ label: "전체", id: null }, ...rnwYnArray],
      defaultValue: "전체",
    },
    {
      label: "계약유지여부",
      key: "undCrYn",
      type: "select",
      options: [{ label: "전체", id: null }, ...undCrYnArray],
      defaultValue: "전체",
    },
    {
      label: "차종",
      key: "catcdNm",
      type: "select",
      options: [{ label: "전체", id: null }, ...catcdNmArray],
      defaultValue: "전체",
    },
    {
      label: "제조사",
      key: "crPrdCmpcdNm",
      type: "select",
      options: [{ label: "전체", id: null }, ...crPrdCmpcdNmArray],
      defaultValue: "전체",
    },
    {
      label: "국외산유무",
      key: "fomaYn",
      type: "select",
      options: [{ label: "전체", id: null }, ...fomaYnArray],
      defaultValue: "전체",
    },
    {
      label: "할인할증코드",
      key: "dcXcGrdcd",
      type: "select",
      options: [{ label: "전체", id: null }, ...dcXcGrdcdArray],
      defaultValue: "전체",
    },
    {
      label: "차량가액",
      key: "cramt",
      type: "select",
      options: [{ label: "전체", id: null }, ...cramtArray],
      defaultValue: "전체",
    },
  ];

  const [params, setParams] = useState({});

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
            <Grid item xs={12} md={4}>
              <MDBox mb={1.5}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <CustomerCountCard
                      params={params}
                      title="총 고객 수"
                    />
                  </Suspense>
                </AppErrorBoundary>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox mb={1.5}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <CarInsCountCard
                      params={params}
                      title="자동차보험 계약 수"
                    />
                  </Suspense>
                </AppErrorBoundary>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4}>
              <MDBox mb={1.5}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <CarInsCustomerCountCard
                      params={params}
                      title="자동차보험 가입 고객 수"
                    />
                  </Suspense>
                </AppErrorBoundary>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={4} container spacing={3}>
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
              <Grid item xs={12} md={12}>
                <AppErrorBoundary>
                  <Suspense fallback={<AppSkeleton />}>
                    <SexcdChart
                      params={params}
                      setSexcdArray={setSexcdArray}
                    />
                  </Suspense>
                </AppErrorBoundary>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} container spacing={3}>
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
                    <FomaYnChart
                      params={params}
                      setFomaYnArray={setFomaYnArray}
                    />
                  </Suspense>
                </AppErrorBoundary>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} >
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <AffiliateChart
                    params={params}
                    setAfccdNmArray={setAfccdNmArray}
                  />
                </Suspense>
              </AppErrorBoundary>
            </Grid>
            <Grid item xs={12} md={4}>
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <CatcdNmChart
                    params={params}
                    setCatcdNmArray={setCatcdNmArray}
                  />
                </Suspense>
              </AppErrorBoundary>
            </Grid>
            <Grid item xs={12} md={4}>
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <CramtChart
                    params={params}
                    setCramtArray={setCramtArray}
                  />
                </Suspense>
              </AppErrorBoundary>
            </Grid>
            <Grid item xs={12} md={4}>
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <CrPrdCmpcdNmChart
                    params={params}
                    setCrPrdCmpcdNmArray={setCrPrdCmpcdNmArray}
                  />
                </Suspense>
              </AppErrorBoundary>
            </Grid>
            <Grid item xs={12} md={4}>
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <RnwYnChart
                    params={params}
                    setRnwYnArray={setRnwYnArray}
                  />
                </Suspense>
              </AppErrorBoundary>
            </Grid>
            <Grid item xs={12} md={4}>
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <DcXcGrdcdChart
                    params={params}
                    setDcXcGrdcdArray={setDcXcGrdcdArray}
                  />
                </Suspense>
              </AppErrorBoundary>
            </Grid>
            <Grid item xs={12} md={4}>
              <AppErrorBoundary>
                <Suspense fallback={<AppSkeleton />}>
                  <ContractAliveChart
                    params={params}
                    setUndCrYnArray={setUndCrYnArray}
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
