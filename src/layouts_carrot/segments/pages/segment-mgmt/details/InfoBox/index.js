import { useEffect } from "react";
import moment from "moment";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDDatePicker from "components_carrot/MDDatePicker";
import MDInput from "components_carrot/MDInput";
import MDButton from "components_carrot/MDButton";

// NewProduct page components
import FormField from "layouts_carrot/ecommerce/products/edit-product/components/FormField";

import useSearchData from "hooks_carrot/useSearchData";

const InfoBox = ({
  // searchDataInit,
  // searchForm,
  setParams,
}) => {
  // const [searchData, onChangeInput, onChangeDate, onChangeSelect, setSearchData, reset] = useSearchData(
  //   searchDataInit
  // );

  // const searchBtn = () => {
  //   setParams((prev) => ({
  //     ...prev,
  //     ...searchData
  //   }));
  // };

  // useEffect(() => {
  //   searchBtn();
  // }, [searchData]);

  return(
    <Card>
      <MDBox mt={1} pr={4}>
        <Grid container spacing={1} m={1}>
          {/* {createSearchForm()} */}
        </Grid>
        <Grid container spacing={1} p={1} sx={{ flexDirection: "row-reverse" }} >
          {/* <MDButton
            variant="outlined"
            color="info"
            size="small"
            onClick={searchBtn}
          >
            조회
          </MDButton> */}
        </Grid>
      </MDBox>
    </Card>
  );

};

export default InfoBox;