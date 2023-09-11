import { forwardRef, useEffect, useState } from "react";
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

// import { useSearchData } from "hooks_carrot";
import useSearchData from "hooks_carrot/useSearchData";
import { useQuery } from "react-query";
import Agent from "utils/Agent";

const SearchBox = ({
  searchDataInit,
  searchForm,
  searchURL,
  setRows,
  pageOption,
  setPageTotal,
}) => {
  const [param, setParam] = useState({
    ...pageOption,
    pageNo: 0,
  });

  const { data, refetch } = useQuery({
    queryKey: param,
    queryFn: () => Agent.requests.get(searchURL, param),
  });

  const [searchData, onChangeInput, onChangeDate, onChangeSelect, setSearchData, reset] = useSearchData(
    searchDataInit
  );

  const createSearchForm = () => {
    return searchForm.map((form) => {
      if (form.hide) return;

      if (form.type === "dateTime") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={form.key}>
            <MDDatePicker
              key={form.key}
              input={{ label: form.label, shrink: "true" }}
              options={{
                enableTime: true,
                time_24hr: true,
                allowInput: true,
                minDate: moment(new Date()).subtract(5, "years").format("YYYY-MM-DD HH:mm").toString(),
                maxDate: moment(new Date()).add(1, "years").format("YYYY-MM-DD HH:mm").toString(),
                defaultDate: searchData[form.key] || null,
                onChange: (selectedDates, dateStr, instance) => {
                  onChangeDate(form.key, dateStr);
                },
              }} 
            />
          </Grid>
        );
      } else if (form.type === "text") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={form.key}>
            <FormField
              key={form.key}
              type="text"
              label={form.label}
              InputLabelProps={{ shrink: true }}
              placeholder={form.placeholder}
              value={searchData[form.key] || ""}
              onChange={(e) => {
                onChangeInput(e, form.key);
              }}
              disabled={form.isDisabled}
            />
          </Grid>
        );
      } else if (form.type === "number") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={form.key}>
            <FormField
              key={form.key}
              type="number"
              label={form.label}
              InputLabelProps={{ shrink: true }}
              placeholder={form.placeholder}
              value={searchData[form.key] || ""}
              onChange={(e) => {
                onChangeInput(e, form.key);
              }}
              disabled={form.isDisabled}
            />
          </Grid>
        );
      } else if (form.type === "select") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={form.key}>
            <Autocomplete
              disableClearable
              options={form.options}
              onChange={(event, newValue) => {
                const item = form.options.find((item) => item.label === newValue.label);
                onChangeSelect(form.key, item?.id);
              }}
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

  useEffect(() => {
    console.log("@@ searchbox1: useeffect");
    setParam({...pageOption});
    refetch();
  }, [pageOption]);

  useEffect(() => {
    console.log("@@ searchbox2: useeffect");
    setRows(data.content);
    setPageTotal((prev) => ({
      ...prev,
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      numberOfElements: data.numberOfElements,
      empty: data.empty,
    }));
  }, [data]);

  return(
    <Card>
      <MDBox mt={1}>
        <Grid container spacing={1} m={1}>
        {createSearchForm()}
        </Grid>
        <Grid container spacing={1} p={1} sx={{ flexDirection: "row-reverse" }} >
          <MDButton
            variant="outlined"
            color="info"
            size="small"
            onClick={refetch}
          >
            조회
          </MDButton>
        </Grid>
      </MDBox>
    </Card>
  );

};

export default SearchBox;