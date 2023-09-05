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

// Data
import dataTableData from "layouts_carrot/applications/data-tables/data/dataTableData";
import { useQuery } from "react-query";

const apiURL = "/ui/cs/customer";

const CustomerInfo = () => {
  const [pageOption, setPageOption] = useState(pageOptionInit);
  const [pageTotal, setPageTotal] = useState(pageTotalInit);
  const [rows, setRows] = useState([]);
  const [list, setList] = useState([]);

  const searchForm = [];
  const searchDataInit = {};

  const [path, setPath] = useState("/retrieve");
  const [param, setParam] = useState({
    ...pageOption,
    pageNo: 0,
  });
  const { data } = useQuery({
    queryKey: path+param,
    queryFn: () => Agent.requests.get(`${apiURL}${path}`, param),
    useErrorBoundary: true 
  });

  const columns = [
    { Header: "recid", accessor: "recid", width: "10%" },
    { Header: "columnA", accessor: "columnA", width: "20%" },
    { Header: "columnB", accessor: "columnB", width: "20%" },
    { Header: "dbStInfo", accessor: "dbStInfo" },
    { Header: "inpDthms", accessor: "inpDthms" },
    { Header: "inpUsrId", accessor: "inpUsrId" },
    { Header: "mdfDthms", accessor: "mdfDthms" },
    { Header: "mdfUsrId", accessor: "mdfUsrId" },
  ];

  const table = {
    columns,
    rows
  };

  // const getList = () => {
  //   Agent.requests.get(path, param);
  // };

  // const useGetList = (path, param) => {
  //   const { data } = useQuery({
  //     queryKey: path + param,
  //     mutationFn: () => Agent.requests.get(path, param),
  //     useErrorBoundary: true
  //   });

  //   return data;
  // };

  // const getList = () => {
  //   const param = {
  //     ...pageOption,
  //   }
  //   const { data } = useQuery({
  //     queryKey: path + param,
  //     mutationFn: () => Agent.requests.get("/retrieve", param),
  //     useErrorBoundary: true
  //   });
  //   setList(data.content);
  //   setPageTotal(() => (
  //     {
  //       ...prev,
  //       totalPages: response.totalPages,
  //       totalElements: response.totalElements,
  //       numberOfElements: response.numberOfElements,
  //       empty: response.empty,
  //     }
  //   ));
  // };

  // 초기 메서드
  useEffect(() => {
    console.log("@@ CustomerInfo: useEffect");
    setRows(data.content);
    setList(data.content);
    setPageTotal(() => ({
      ...pageTotal,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      numberOfElements: data.numberOfElements,
      empty: data.empty,
    }));
  }, [pageOption]);

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
          {/* <CarrotTable table={dataTableData} entriesPerPage /> */}
          <CarrotTable
            entriesPerPage
            table={table}
            pageOption={pageOption}
            setPageOption={setPageOption}
            pageTotal={pageTotal}
            // getList={getList}
          />
        </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustomerInfo;
