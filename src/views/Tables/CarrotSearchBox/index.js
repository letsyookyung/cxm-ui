import { useEffect, useState } from "react";
import moment from "moment";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDDatePicker from "components_carrot/MDDatePicker";
import MDInput from "components_carrot/MDInput";
import MDButton from "components_carrot/MDButton";
import GreyColorButton from "components_carrot/MDColorButton/GreyColorButton";

// NewProduct page components
import FormField from "layouts_carrot/ecommerce/products/edit-product/components/FormField";

// import useSearchDataEventMgmt from "hooks_carrot/useSearchDataEventMgmt";
import useSearchData from "hooks_carrot/useSearchData";
import { useQuery } from "react-query";
import Agent from "utils/Agent";


// styles
const CustomTextField = styled(TextField)({
  '& input': {
    marginTop: '0',
    marginBottom: '0',
  },
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
    width: '100%',
    left: '0%',
  },
  '& .MuiInput-underline:hover:before': {
    width: '100%',
    left: '0%',
  },
  '& .MuiInput-underline:after': {
    width: '100%',
    left: '0%',
  },
  '& .MuiInputBase-inputTypeSearch::-webkit-search-clear-button': {
    position: 'absolute',
    right: '0px',
    transform: 'translateY(-50%)',
  },
  '& .MuiInputBase-root:hover .MuiInputBase-input::placeholder': {
    opacity: 0.5,
  },
  '& .MuiInputBase-input::placeholder': {
    opacity: 0,
    transition: 'opacity 0.3s'
  },
});

const CustomMDInput = styled(MDInput)({
  '& .MuiInput-underline:before': {
    borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
  },
  '& .MuiInputBase-input': {
    padding: '4px 0 5px !important', 
  },
});


const CarrotSearchBox = ({
      searchDataInit,
      searchForm,
      searchURL,
      setRows,
      pageOptionInit,
      pageOption,
      setPageTotal,
  }) => {
  const [searchData, onChangeInput, onChangeDate, onChangeSelect, setSearchData, reset] = useSearchData(
    searchDataInit
  );

  const [param, setParam] = useState({
    ...pageOption,
    ...searchData,
    pageNo: 0,
  });

  const { data, isSuccess, refetch } = useQuery({
    queryKey: param,
    queryFn: () => Agent.requests.get(searchURL, param),
    enabled: false,
  });

  const createSearchForm = () => {
    return searchForm.map((form) => {
      if (form.hide) return null;

      if (form.type === "text") {
          return (
            <Grid item key={form.key} xs={12} sm={6} md={6} lg={3} xl={2} style={{ marginTop: '0px' }}>
              <FormControl style={{ width: '90%' }}>
                <CustomTextField
                  key={form.key}
                  label={form.label}
                  type={form.type}
                  variant="standard"
                  InputLabelProps={{ shrink: true }}
                  value={searchData[form.key] || ""}
                  onChange={(e) => onChangeInput(e, form.key)}
                  placeholder={form.placeholder}
                  helperText={form.helperText}
                  disabled={form.isDisabled}
                />
              </FormControl>
            </Grid>
          );
      } else if (form.type === "select") {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={form.key}>
            <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
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
                renderInput={(params) => (
                  <CustomMDInput {...params} variant="standard" label={form.label}
                                 InputLabelProps={{ shrink: true, style: { fontSize: '1rem' } }} />
                )}
                disabled={form.isDisabled}
              />
            </FormControl>
          </Grid>
        )
      }
    });
  };
  
  const searchBtn = () => {
    refetch();
  };


  // useEffect
  useEffect(() => {
    setParam((prev) => ({
      ...prev,
      ...searchData
    }));
  }, [searchData]);

  useEffect(() => {
    setParam((prev) => ({
      ...prev,
      ...pageOption
    }));
  }, [pageOption]);

  useEffect(() => {
    if (
      pageOption.pageNo !== 0 ||
      pageOption.pageSize !== pageOptionInit.pageSize ||
      pageOption.sortField !== pageOptionInit.sortField ||
      pageOption.sortDirection !== pageOptionInit.sortDirection
    ) {
      console.log("changed param =>", param);
      refetch();
    }
  }, [param]);

  useEffect(() => {
    if (isSuccess) {
      if (data.content.length === 0) {
        setRows([]);
        setPageTotal({
          totalPages: 0,
          totalElements: 0,
          numberOfElements: 0,
          empty: true,
        });
      } else {
        setRows(data.content);
        setPageTotal((prev) => ({
          ...prev,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          numberOfElements: data.numberOfElements,
          empty: data.empty,
        }));
      }
    }
  }, [data, isSuccess]);

  return(
    <Card>
      <MDBox mt={1}>
        <Grid container spacing={1} m={3} sx={{ mt: 1, mb:4 }}>
          {createSearchForm()}
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} sx={{ marginTop: '5px' }}>
            <FormControl style={{ width: '40%'}}>
              <MDButton
                variant="outlined"
                color="info"
                size="medium"
                onClick={searchBtn}
              >
                조회
              </MDButton>
            </FormControl>
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
};


export default CarrotSearchBox;