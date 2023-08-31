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
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDTypography from "components_carrot/MDTypography";
import MDButton from "components_carrot/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import DataTable from "views/Tables/DataTable";

// Store
import Agent from "utils/Agent";

import { pageOptionInit, pageTotalInit } from "variables/page"

// Data
import dataTableData from "layouts_carrot/applications/data-tables/data/dataTableData";
import { useQuery } from "react-query";

const apiURL = "/ui/cs/customer";

const CustomerInfo = () => {
  const [pageOption, setPageOption] = useState(pageOptionInit);
  const [pageTotal, setPageTotal] = useState(pageTotalInit);
  const [list, setList] = useState([]);

  const searchForm = [];
  const searchDataInit = {};
  const columns = [];

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
    setList(data);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Datatable Search
            </MDTypography>
          </MDBox>
        </Card>
        <Card>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustomerInfo;
