import React, { useEffect, useState, Suspense } from "react";

// Material Dashboard 2 PRO React Base Styles
import colors from "assets_carrot/theme/base/colors";
import borders from "assets_carrot/theme/base/borders";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDInput from "components_carrot/MDInput";
import MDButton from "components_carrot/MDButton";
import MDTypography from "components_carrot/MDTypography";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Autocomplete from "@mui/material/Autocomplete";

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// Material Dashboard 2 PRO React examples
import DashboardLayout from "views/LayoutContainers/DashboardLayout";
import DashboardNavbar from "views/Navbars/DashboardNavbar";
import Footer from "views/Footer";

import AppErrorBoundary from "error/AppErrorBoundary";
import AppSkeleton from "skeleton/AppSkeleton";

import CustomerCountCard from "layouts_carrot/dashboards/cards/CustomerCountCard";
import CarInsCountCard from "layouts_carrot/dashboards/cards/CarInsCountCard";
import CarInsCustomerCountCard from "layouts_carrot/dashboards/cards/CarInsCustomerCountCard";
import FormField from "layouts_carrot/pages/account/components/FormField";
import { useParams } from "react-router-dom";
import pxToRem from "assets_carrot/theme/functions/pxToRem";
import InfoBox from "./InfoBox";

// import SearchBox from "./SearchBox";

const { warning, info } = colors;

const atrApiURL = "/ui/attribute";
const segApiURL = "/ui/segment-mgmt";

const attribute = {
  recid: 1,
  tabnm: "table1", 
  clmNm: "column1", 
  clmTyp: "STRING", 
  psinfYn: "N"
};

const filter = {
  recid: 1,
  cnd: "AND",
  cndvl: "value1",
  attribute: attribute
};
const filterList = [filter];

const filterGroup = {
  recid: 1, 
  cnd: "AND", 
  filterList: filterList
};
const filterGroupList = [filterGroup];

const container = {
  recid: 1, 
  cnd: "OR",
  filterGroupList: filterGroupList
};

const segment = {
  recid: 1,
  sgmtName: "seg1",
  datCt: 650000,
  container: container
};

const { borderRadius, borderWidth, borderColor } = borders;

const SegmentMgmtDetails = () => {
  const { recid } = useParams();
  const [params, setParams] = useState({});

  const searchDataInit = {
    sgmtName: null,
  };

  const [sgmtNameArray, setSgmtNameArray] = useState([]);

  const searchForm = [
    {
      label: "세그먼트",
      key: "sgmtName",
      type: "text",
      // options: [{ label: "전체", id: null }, ...sgmtNameArray],
      // defaultValue: "전체",
    },
  ];

  useEffect(() => {
    console.log(segment);
  }, []);

  const addFilter = () => {
    return (
      <></>
    ); 
  };

  const handleAddContainer = () => {
    console.log("handleAddContainer");
  };

  const handleResetContainer = () => {
    console.log("handleResetContainer");
  };

  const handleAddGroup = () => {
    console.log("handleAddGroup");
  };

  const handleResetGroup = () => {
    console.log("handleResetGroup");
  };

  const handleDeleteFilter = () => {
    console.log("handleDeleteFilter");
  };

  const handleDeleteGroup = () => {
    console.log("handleDeleteGroup");
  };

  const handleDeleteContainer = () => {
    console.log("handleDeleteContainer");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
        <MDBox py={3} lineHeight={1}>
          <InfoBox
            setParams={setParams}
          />
          <MDBox p={3}>
            {/* <MDTypography variant="h5" fontWeight="medium">
              </MDTypography> */}
          </MDBox>

          <Card>
            <Grid container spacing={3}>
              <Grid xs={12} container item>
                <Grid xs={12} container item borderBottom={`${borderWidth[5]} double ${borderColor}`}>
                  container button
                </Grid>
                <Grid xs={10} container item>
                  <Grid xs={12} container item>
                    <Grid xs={12} container item>
                      container button
                    </Grid>
                    <Grid xs={10} container item>
                      <Grid xs={12} container item border={`${borderWidth[5]} solid rgba(26, 115, 232, 0.2)`}>
                        <Grid xs={12} container item borderBottom={`${borderWidth[2]} solid ${borderColor}`}>
                          group button
                        </Grid>
                        <Grid xs={10} container item>
                          <Grid xs={12} container>
                            filter row
                          </Grid>
                          <Grid xs={12} container>
                            filter row
                          </Grid>
                        </Grid>
                        <Grid xs={2} container item borderLeft={`${borderWidth[2]} solid ${borderColor}`}>
                          a group total
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid xs={2} container item border={`${borderWidth[5]} solid rgba(26, 115, 232, 0.2)`}>
                      groups total
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={2} container item borderLeft={`${borderWidth[5]} double ${borderColor}`}>
                  container total
                </Grid>
              </Grid>
            </Grid>
          </Card>


          <Divider />

          <Card>
            <MDBox mb={6} py={2} pr={2} pl={2} >
              <Grid container spacing={3}>
                <Grid xs={12} container item>
                  <Grid item xs={1}>
                    <MDBox display="flex">
                      <MDButton size="medium" iconOnly circular onClick={handleAddContainer} >
                        <Icon color="info">arrow_drop_up</Icon>
                      </MDButton>
                      <MDButton size="medium" iconOnly circular onClick={handleAddContainer} >
                        <Icon color="info">arrow_drop_down</Icon>
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={1}>
                    <Autocomplete
                      disableClearable
                      defaultValue="AND"
                      options={["AND", "OR"]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    &nbsp;
                  </Grid>
                  <Grid item xs={2}>
                    <MDBox display="flex">
                      <MDButton size="small" onClick={handleAddContainer} >
                        <Icon color="info">add</Icon>
                        <MDTypography
                          component="span"
                          variant="button"
                          fontWeight="regular"
                          color="info"
                          textTransform="capitalize"
                        >
                          &nbsp;Add Container
                        </MDTypography>
                      </MDButton>
                      <MDButton size="small" onClick={handleResetContainer} >
                        <Icon color="primary">delete_outline</Icon>
                        <MDTypography
                          component="span"
                          variant="button"
                          fontWeight="regular"
                          color="primary"
                          textTransform="capitalize"
                        >
                          &nbsp;Reset
                        </MDTypography>
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
                <Grid xs={12} container item spacing={3}>
                  <Grid item xs={1}>
                    <MDBox display="flex">
                      <MDButton size="medium" iconOnly circular onClick={handleAddContainer} >
                        <Icon color="info">arrow_drop_up</Icon>
                      </MDButton>
                      <MDButton size="medium" iconOnly circular onClick={handleAddContainer} >
                        <Icon color="info">arrow_drop_down</Icon>
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={1}>
                    <Autocomplete
                      disableClearable
                      defaultValue="AND"
                      options={["AND", "OR"]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    &nbsp;
                  </Grid>
                  <Grid item xs={3}>
                    <MDBox display="flex">
                      <MDButton size="small" onClick={handleAddGroup} >
                        <Icon color="info">add</Icon>
                        <MDTypography
                          component="span"
                          variant="button"
                          fontWeight="regular"
                          color="info"
                          textTransform="capitalize"
                        >
                          &nbsp;Add Group
                        </MDTypography>
                      </MDButton>
                      <MDButton size="small" onClick={handleResetGroup} >
                        <Icon color="primary">delete_outline</Icon>
                        <MDTypography
                          component="span"
                          variant="button"
                          fontWeight="regular"
                          color="primary"
                          textTransform="capitalize"
                        >
                          &nbsp;Reset
                        </MDTypography>
                      </MDButton>
                      <MDButton size="small" sx={{ marginTop: "4px"}} iconOnly circular onClick={handleDeleteGroup} >
                        <Icon color="primary">clear</Icon>
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={3}>
                    &nbsp;
                  </Grid>
                </Grid>
                <Grid xs={12} container item spacing={3}>
                  <Grid item xs={0.5}>
                    <MDBox display="flex">
                      <MDButton size="small" iconOnly circular onClick={handleDeleteFilter} >
                        <Icon color="primary">clear</Icon>
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      disableClearable
                      defaultValue="성별"
                      options={["성별", "나이"]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Autocomplete
                      disableClearable
                      defaultValue="="
                      options={["=", ">", "<", ">=", "<="]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      disableClearable
                      defaultValue="남"
                      options={["남", "여"]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                </Grid>
                <Grid xs={12} container item spacing={3}>
                  <Grid item xs={0.5}>
                    <MDBox display="flex">
                      <MDButton size="small" iconOnly circular onClick={handleDeleteFilter} >
                        <Icon color="primary">clear</Icon>
                      </MDButton>
                    </MDBox>
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      disableClearable
                      defaultValue="성별"
                      options={["성별", "나이"]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Autocomplete
                      disableClearable
                      defaultValue="="
                      options={["=", ">", "<", ">=", "<="]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Autocomplete
                      disableClearable
                      defaultValue="남"
                      options={["남", "여"]}
                      size="small"
                      renderInput={(params) => <MDInput {...params} variant="standard" InputLabelProps={{ shrink: true }} />}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </MDBox>
          </Card>
        </MDBox>
        <Footer />
      </DashboardLayout>
  );
}

export default SegmentMgmtDetails;
