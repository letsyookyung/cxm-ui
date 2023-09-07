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

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDTypography from "components_carrot/MDTypography";
import MDButton from "components_carrot/MDButton";

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
  const { data, isLoading, refetch } = useQuery({
    queryKey: path+param,
    queryFn: () => Agent.requests.get(`${apiURL}${path}`, param),
    useErrorBoundary: true,
  });

  const searchForm = [];
  const searchDataInit = {};
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

  useEffect(() => {
    console.log("@@ CustomerInfo: useEffect");
    console.log(pageOption);
    console.log(pageTotal);
    console.log(data);

    setParam({...pageOption});
    refetch();
    setRows(data.content);
    setPageTotal((prev) => ({
      ...prev,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      numberOfElements: data.numberOfElements,
      empty: data.empty,
    }));
  }, [pageOption]);

  useEffect(() => {
    setRows(data.content);
  }, [data]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3} lineHeight={1}>
          <Card>
            <MDBox mt={1}>
              <Grid container spacing={1} m={1}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <FormField type="text" label="Name" defaultValue="" InputLabelProps={{ shrink: true }} placeholder="Kim" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                  <FormField type="text" label="고객번호" defaultValue="" InputLabelProps={{ shrink: true }} placeholder="1234" />
                </Grid>
              </Grid>
            </MDBox>
          </Card>
          <MDBox p={3}>
            <MDTypography variant="h5" fontWeight="medium">
              {/* Datatable Search */}
            </MDTypography>
          </MDBox>
          <AppErrorBoundary>
            <Suspense fallback={<AppSkeleton />}>
              <CarrotTable
                entriesPerPage
                table={table}
                cxmPageOption={pageOption}
                setCxmPageOption={setPageOption}
                cxmPageTotal={pageTotal}
                setCxmPageTotal={setPageTotal}
              />
            </Suspense>
          </AppErrorBoundary>
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustomerInfo;
