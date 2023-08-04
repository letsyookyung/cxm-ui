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

import React, { useEffect, useContext } from "react";

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
import AgentStore from "store/AgentStore";

// Data
import dataTableData from "layouts_carrot/applications/data-tables/data/dataTableData";

export const apiURL = "/ui/cs/customer-info";

const CustomerInfo = () => {
  const agentStore = useContext(AgentStore);

  // 처음 렌더링 시 API 호출
  const getPage = async () => {
    let param;
    const response = await agentStore.requests.get(`${apiURL}/retrieve`, param);
  };

  // 초기 메서드
  useEffect(() => {
    console.log("@@ CustomerInfo: useEffect");
    // getPage();
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
            <MDTypography variant="button" color="text">
              A lightweight, extendable, dependency-free javascript HTML table plugin.
            </MDTypography>
          </MDBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default CustomerInfo;
