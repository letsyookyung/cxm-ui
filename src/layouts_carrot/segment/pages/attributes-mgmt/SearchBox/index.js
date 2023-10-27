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

import useSearchData from "hooks_carrot/useSearchData";


const SearchBox = ({
   searchDataInit,
   searchForm,
   onSearchComplete // 검색 결과를 전달한 콜백함수
}) => {
  const [searchData, onChangeInput, onChangeDate, onChangeSelect, setSearchData, reset] = useSearchData(
    searchDataInit
  );

  const createSearchForm = () => {
    const formItems = searchForm.map((form) => {
      if (form.hide) return null;

      if (form.type === "select") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={3} key={form.key}>
            <Autocomplete
              disableClearable
              options={form.options}
              defaultValue={form.defaultValue}
              isOptionEqualToValue={(option, value) => {
                return value.id ? option.label === value.label : option.label === value;
              }}
              onChange={(event, newValue) => {
                const item = form.options.find((item) => item.label === newValue.label);
                onChangeSelect(form.key, item?.id);
              }}
              size="small"
              style={{ width: '90%' }}
              renderInput={(params) => <MDInput {...params} variant="standard" label={form.label} InputLabelProps={{ shrink: true }} />}
              disabled={form.isDisabled}
            />
          </Grid>
        );
      }
      return <></>;
    });

    return (
      <Grid container spacing={1}>
        {formItems}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <MDButton
            variant="outlined"
            color="info"
            size="big"
            onClick={searchBtn}
          >
            조회
          </MDButton>
        </Grid>
      </Grid>
    );
  };
  
  
  const searchBtn = async () => {
      fetch("http://localhost:3001/attributes-results")
        .then(resp => resp.json())
        .then(resp => {
          onSearchComplete(resp);
        })
        .catch(e => {
          console.log(e.message)
        });
  };

  return (
    <Card>
      <MDBox mt={1} pr={4}>
        <Grid container spacing={1} m={4}>
          {createSearchForm()}
        </Grid>
      </MDBox>
    </Card>
  );
};

export default SearchBox;






