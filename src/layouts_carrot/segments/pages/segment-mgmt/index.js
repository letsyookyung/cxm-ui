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

import React, { useEffect, useState, Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import { Icon, Tooltip } from "@mui/material";

/* eslint-disable react/prop-types */
// ProductsList page components
import DefaultCell from "layouts_carrot/table/components/DefaultCell";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDButton from "components_carrot/MDButton";
import MDTypography from "components_carrot/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";
import CarrotTable from "views/Tables/CarrotTable";
import SearchBox from "views/Tables/SearchBox";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";

import { pageOptionInit, pageTotalInit } from "variables/constantPage"


const apiURL = "/ui/segment-mgmt";
const routeURL = "/segments/segment-mgmt";

const SegmentMgmt = () => {
  const [pageOption, setPageOption] = useState(pageOptionInit);
  const [pageTotal, setPageTotal] = useState(pageTotalInit);
  const [rows, setRows] = useState([]);

  const navigate = useNavigate();
  const { recid } = useParams();

  const searchDataInit = {
    startDate: moment().subtract(1, "months").set({
      hour: 0,
      minute: 0,
    }).format("YYYY-MM-DD HH:mm").toString(),
    endDate: moment().set({
      hour: 23,
      minute: 59,
    }).format("YYYY-MM-DD HH:mm").toString(),
    ctmno: "",
    age: "",
    region: null,
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
      label: "세그먼트 이름",
      key: "sgmtName",
      type: "text",
    },
  ];

  const defaultCell = (value) => {
    return (
      <DefaultCell value={`${value}`} />
    );
  };

  const dateCell = (value) => {
    return (
      <DefaultCell value={moment(value).format("YYYY-MM-DD HH:mm")} />
    );
  };

  const detailCell = (value) => {
    return (
      <MDBox lineHeight={0}>
        <Tooltip title="상세보기" placement="bottom">
          <MDButton 
            variant="outlined" 
            color="info" 
            size="small" 
            iconOnly 
            circular
            onClick={() => {
              navigate(`${routeURL}/${value}`);
            }}
          >
            <Icon>priority_high</Icon>
          </MDButton>
        </Tooltip>
      </MDBox>
    );
  };

  const columns = [
    { 
      id: "recid",
      Header: "ID",
      accessor: "recid",
      width: "10%",
      Cell: ({ value }) => defaultCell(value),
    },
    { 
      Header: "세그먼트이름",
      accessor: "sgmtName",
      width: "20%",
      Cell: ({ value }) => defaultCell(value),
    },
    { 
      Header: "데이터개수",
      accessor: "datCt",
      width: "20%",
      Cell: ({ value }) => defaultCell(value),
    },
    { 
      Header: "등록자",
      accessor: "inpUsrId",
      width: "10%",
      Cell: ({ value }) => defaultCell(value),
    },
    { 
      Header: "등록일시",
      accessor: "inpDthms",
      width: "10%",
      Cell: ({ value }) => dateCell(value),
    },
    { 
      Header: "수정자",
      accessor: "mdfUsrId",
      width: "10%",
      Cell: ({ value }) => defaultCell(value),
    },
    { 
      Header: "수정일시",
      accessor: "mdfDthms",
      width: "10%",
      Cell: ({ value }) => dateCell(value),
    },
    { 
      id: "details",
      Header: "상세보기",
      accessor: "recid",
      width: "10%",
      Cell: ({ value }) => detailCell(value),
    },
  ];

  const table = {
    columns: columns,
    rows: rows,
  };

  useEffect(() => {
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} lineHeight={1}>
        <AppErrorBoundary>
          <Suspense fallback={<AppSkeleton />}>
            <SearchBox
              searchDataInit={searchDataInit}
              searchForm={searchForm}
              searchURL={`${apiURL}/retrieve`}
              setRows={setRows}
              pageOption={pageOption}
              setPageTotal={setPageTotal}
            />
            <MDBox p={3}>
              <MDTypography variant="h5" fontWeight="medium">
                {/* Datatable Search */}
              </MDTypography>
            </MDBox>
            <CarrotTable
              entriesPerPage
              searchURL={`${apiURL}/retrieve`}
              table={table}
              cxmPageOption={pageOption}
              setCxmPageOption={setPageOption}
              cxmPageTotal={pageTotal}
              cxmSetPageTotal={setPageTotal}
            />
          </Suspense>
        </AppErrorBoundary>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default SegmentMgmt;
