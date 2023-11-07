/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================
*/

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
import Analytics from "layouts_carrot/dashboards";
import DataTables from "layouts_carrot/cs/customer-info";
import CarIns from "layouts_carrot/analytics/pages/car-ins";
import SegmentMgmt from "layouts_carrot/segments/pages/segment-mgmt";
import SegmentMgmtDetails from "layouts_carrot/segments/pages/segment-mgmt/details";
import EventMgmt from "layouts_carrot/segments/pages/event-mgmt";

// @mui icons
import Icon from "@mui/material/Icon";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ScatterPlot from '@mui/icons-material/ScatterPlot';

const routes = [
  {
    type: "collapse",
    name: "대시보드",
    key: "dashboards",
    icon: <Icon fontSize="medium">dashboard</Icon>,
    route: "/dashboards",
    component: <Analytics />,
    noCollapse: true,
    role: "ROLE_DASHBOARD",
  },
  // {
  //   type: "collapse",
  //   name: "CS",
  //   key: "cs",
  //   icon: <PermIdentityIcon fontSize="medium" />,
  //   role: "ROLE_CUSTOMER_INFO",
  //   collapse: [
  //     {
  //       name: "고객 정보 조회",
  //       key: "customer-info",
  //       route: "/cs/customer-info",
  //       component: <DataTables />,
  //       role: "ROLE_CUSTOMER_INFO",
  //     },
  //   ],
  // },
  {
    type: "collapse",
    name: "분석",
    key: "analytics",
    icon: <AnalyticsIcon fontSize="medium" />,
    role: "ROLE_ANALYTICS",
    collapse: [
      {
        name: "자동차보험",
        key: "car-ins",
        route: "/analytics/car-ins",
        component: <CarIns />,
        role: "ROLE_ANALYTICS",
      },
    ],
  },
  {
    type: "collapse",
    name: "세그먼트",
    key: "segments",
    icon: <ScatterPlot fontSize="medium" />,
    role: "ROLE_SEGMENT",
    collapse: [
      {
        name: "세그먼트관리",
        key: "segment-mgmt",
        route: "/segments/segment-mgmt",
        component: <SegmentMgmt />,
        role: "ROLE_SEGMENT",
      },
      {
        name: "세그먼트관리 상세",
        key: "segment-mgmt/details",
        route: "/segments/segment-mgmt",
        component: <SegmentMgmtDetails />,
        role: "NOT_USED",
      },
      {
        name: "이벤트관리",
        key: "events-mgmt",
        route: "/segments/event-mgmt",
        component: <EventMgmt />,
        role: "ROLE_SEGMENT",
      },
      // {
      //   name: "속성관리",
      //   key: "attributes-mgmt",
      //   route: "/segments/attribute-mgmt",
      //   component: <AttributeMgmt />,
      //   role: "ROLE_SEGMENT",
      // },
    ],
  },
];

export default routes;
