import { forwardRef } from "react";
import moment from "moment";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDDatePicker from "components_carrot/MDDatePicker";
import MDInput from "components_carrot/MDInput";

// NewProduct page components
import FormField from "layouts_carrot/ecommerce/products/edit-product/components/FormField";

// import { useSearchData } from "hooks_carrot";
import useSearchData from "hooks_carrot/useSearchData";

const SearchBox = ({
  searchDataInit,
  searchForm,
  pageOption,
  setPageOption,
  searchURL,
}) => {

  const [searchData, onChangeInput, onChangeDate, setSearchData, resetSearchData] = useSearchData(
    searchDataInit
  );

  const onKeyDownEnter = (e) => {
    if (e.keyCode !== 13) return;

    onLookUpData();
  };

  const createSearchForm = () => {
    return searchForm.map((form) => {
      if (form.hide) return;

      if (form.type === "dateTime") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <MDDatePicker
              minDate={moment(new Date()).subtract(5, "years")}
              maxDate={moment(new Date()).add(1, "years")}
              options={{ enableTime: true, time_24hr: true }} 
              input={{ label: form.label, shrink: "true" }}
              value={searchData[form.key] || null}
              onChange={onChangeDate(form.key)}
              disabled={form.isDisabled}
            />
          </Grid>
        );
      } else if (form.type === "text") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FormField
              type="text"
              label={form.label}
              InputLabelProps={{ shrink: true }}
              placeholder={form.placeholder}
              value={searchData[form.key] || null}
              onChange={onChangeInput}
              onKeyDown={onKeyDownEnter}
              disabled={form.isDisabled}
            />
          </Grid>
        );
      } else if (form.type === "number") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FormField
              type="number"
              label={form.label}
              InputLabelProps={{ shrink: true }}
              placeholder={form.placeholder}
              value={searchData[form.key] || null}
              onChange={onChangeInput}
              onKeyDown={onKeyDownEnter}
              disabled={form.isDisabled}
            />
          </Grid>
        );
      } else if (form.type === "select") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Autocomplete
              disableClearable
              value={searchData[form.key] || null}
              options={form.options}
              onChange={(event, newValue) => onChangeInput}
              size="small"
              renderInput={(params) => <MDInput {...params} variant="standard" label={form.label} InputLabelProps={{ shrink: true }} />}
              disabled={form.isDisabled}
            />
          </Grid>
        );
      }

      return;
    });
  };

  return(
    <Card>
      <MDBox mt={1}>
        <Grid container spacing={1} m={1}>
        {createSearchForm()}
        </Grid>
      </MDBox>
    </Card>
  );

};

export default forwardRef(SearchBox);