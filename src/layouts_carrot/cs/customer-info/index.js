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

import React, { useEffect, useContext, useCallback, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDDatePicker from "components_carrot/MDDatePicker";
import MDTypography from "components_carrot/MDTypography";
import MDButton from "components_carrot/MDButton";
import MDInput from "components_carrot/MDInput";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
// import DataTable from "views/Tables/DataTable";
import CarrotTable from "views/Tables/CarrotTable";

// NewProduct page components
import FormField from "layouts_carrot/ecommerce/products/edit-product/components/FormField";

// Store
import Agent from "utils/Agent";
import AuthStore from "store/AuthStore";

import { pageOptionInit, pageTotalInit } from "variables/page"

// // Data
// import dataTableData from "layouts_carrot/applications/data-tables/data/dataTableData";
import { useQuery } from "react-query";
import { Suspense } from "react";
import moment from "moment";

import SearchBox from "views/Tables/SearchBox";
import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";

const apiURL = "/ui/cs/customer";

const CustomerInfo = () => {
  const [pageOption, setPageOption] = useState(pageOptionInit);
  const [pageTotal, setPageTotal] = useState(pageTotalInit);
  const [rows, setRows] = useState([]);

  const [path, setPath] = useState("/retrieve");
  const [param, setParam] = useState({
    ...pageOption,
    pageNo: 0,
  });
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: param,
    queryFn: () => Agent.requests.get(`${apiURL}${path}`, param),
    enabled: false,
  });

  const searchDataInit = {
    startDate: moment().subtract(1, "months").set({
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    }),
    endDate: moment().set({
      hour: 23,
      minute: 59,
      second: 0,
      millisecond: 0,
    }),
    ctmno: "",
    plyno: "",
  };

  const searchForm = [
    {
      label: "From",
      key: "startDate",
      type: "dateTime",
    },
    {
      label: "To",
      key: "endDate",
      type: "dateTime",
    },
    {
      label: "고객번호",
      key: "ctmno",
      type: "text",
    },
    {
      label: "나이",
      key: "age",
      type: "number",
    },
    {
      label: "지역",
      key: "region",
      type: "select",
      options: [],
    },
  ];

  const columns = [
    { Header: "ndscId", accessor: "ndscId" },
    { Header: "ctmno", accessor: "ctmno" },
    { Header: "ctmDscNo", accessor: "ctmDscNo" },
    { Header: "hnglCtmnm", accessor: "hnglCtmnm" },
    { Header: "plyno", accessor: "plyno" },
    { Header: "mbId", accessor: "mbId" },
    { Header: "nrdpsCtmDscno", accessor: "nrdpsCtmDscno" },
    { Header: "nrdpsRelnm", accessor: "nrdpsRelnm" },
    { Header: "licno", accessor: "licno" },
    { Header: "nrdpsLicno", accessor: "nrdpsLicno" },
    { Header: "adId", accessor: "adId" },
    { Header: "nrdpsDivcNo", accessor: "nrdpsDivcNo" },
    { Header: "ldlId", accessor: "ldlId" },
    { Header: "gaid", accessor: "gaid" },
    { Header: "idfa", accessor: "idfa" },
    { Header: "ipAdr", accessor: "ipAdr" },
    { Header: "macAdr", accessor: "macAdr" },
    { Header: "mailId", accessor: "mailId" },
    { Header: "rlBrtyrMndy", accessor: "rlBrtyrMndy" },
    { Header: "pspno", accessor: "pspno" },
    { Header: "hmpagAdr", accessor: "hmpagAdr" },
    { Header: "tlno", accessor: "tlno" },
    { Header: "hpno", accessor: "hpno" },
    { Header: "bkActno", accessor: "bkActno" },
    { Header: "tmapId", accessor: "tmapId" },
    { Header: "kakaoId", accessor: "kakaoId" },
    { Header: "naverId", accessor: "naverId" },
    { Header: "loadDthms", accessor: "loadDthms" },
    { Header: "mdfDthms", accessor: "mdfDthms" },
  ];

  const table = {
    columns: columns,
    rows
  };

  // useEffect(() => {
  //   console.log("@@ CustomerInfo: useEffect");
  //   setParam({...pageOption});
  //   refetch();
  // }, [pageOption]);

  // useEffect(() => {
  //   console.log(data.content);
  //   setRows(data.content);
  //   setPageTotal((prev) => ({
  //     ...prev,
  //     totalPages: data.totalPages,
  //     totalElements: data.totalElements,
  //     numberOfElements: data.numberOfElements,
  //     empty: data.empty,
  //   }));
  // }, [data]);

  // zip: {
  //   name: "zip",
  //   label: "Zip",
  //   type: "number",
  //   errorMsg: "Zip is required.",
  //   invalidMsg: "Zipcode is not valie (e.g. 70000).",
  // },
  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3} lineHeight={1}>
          <SearchBox searchDataInit={searchDataInit} searchForm={searchForm} />
          {/* <Card>
            <MDBox mt={1}>
              <Grid container spacing={1} m={1}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <MDDatePicker options={{ enableTime: true, time_24hr: true }} input={{ label: "From", shrink: "true" }} value= "2022-01-01 00:00" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <MDDatePicker options={{ enableTime: true, time_24hr: true }} input={{ label: "To", shrink: "true",  }} value= "2023-02-01 00:00" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <FormField type="text" label="Name" InputLabelProps={{ shrink: true }} placeholder="Kim" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <FormField type="text" label="고객번호" InputLabelProps={{ shrink: true }} placeholder="1234" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <FormField type="number" label="나이" InputLabelProps={{ shrink: true }} placeholder="33" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <Autocomplete
                    disableClearable
                    value="20"
                    options={["10", "20", "30", "40", "50"]}
                    onChange={(event, newValue) => {
                      console.log("onchange");
                    }}
                    size="small"
                    renderInput={(params) => <MDInput {...params} variant="standard" label="test2" />}
                  />
                </Grid>
              </Grid>
            </MDBox>
          </Card> */}
          <MDBox p={3}>
            <MDTypography variant="h5" fontWeight="medium">
              {/* Datatable Search */}
            </MDTypography>
          </MDBox>
          {/* <AppErrorBoundary>
            <Suspense fallback={<AppSkeleton />}> */}
              <CarrotTable
                entriesPerPage
                table={table}
                cxmPageOption={pageOption}
                setCxmPageOption={setPageOption}
                cxmPageTotal={pageTotal}
                isLoading={isLoading}
                error={error}
              />
            {/* </Suspense>
          </AppErrorBoundary> */}
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustomerInfo;
