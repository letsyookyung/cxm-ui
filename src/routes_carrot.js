/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================
*/

// Material Dashboard 2 PRO React layouts
import Analytics from "layouts_carrot/dashboards/analytics";
import DataTables from "layouts_carrot/cs/customer-info";

// @mui icons
import Icon from "@mui/material/Icon";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const routes = [
  {
    type: "collapse",
    name: "대시보드",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/dashboards/analytics",
    component: <Analytics />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "CS",
    key: "cs",
    icon: <PermIdentityIcon fontSize="medium" />,
    collapse: [
      {
        name: "고객 정보 조회",
        key: "customer-info",
        route: "/cs/customer-info",
        component: <DataTables />,
      },
    ],
  },
];

export default routes;
