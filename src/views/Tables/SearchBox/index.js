import { forwardRef } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";
import MDDatePicker from "components_carrot/MDDatePicker";
import MDTypography from "components_carrot/MDTypography";

import { useSearchData } from "hooks_carrot"

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

  const createSearchForm = (isViewHide) => {
    return searchForm.map((form) => {
      if (form.hide) return;

      if (form.type === "dateTime") {
        return (
          <Grid item xs={12} sm={6} md={3} lg={2} xl={1}>
            <MDDatePicker
              options={{ enableTime: true, time_24hr: true }} 
              input={{ label: form.label, shrink: "true" }}
              value={searchData[form.key] || null}
              onChange={onChangeDate(form.key)}
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
      } else if (form.type === "select") {
        return(
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            
          </Grid>
        );
      }

      return;
    });
  };
  // if (form.type === "select") {
  //   return (
  //     <CustomGridItem item xs={12} md={4} lg={3} key={form.label}>
  //       <label htmlFor={form.label} className="label">
  //         {form.required ? (
  //           <span className="required">{form.text} *</span>
  //         ) : (
  //           <span>{form.text}</span>
  //         )}
  //       </label>
  //       <div className="inputWrapper">
  //         <StyledSelect
  //           id={form.label}
  //           name={form.label}
  //           value={searchData[form.label] || ""}
  //           onChange={onChangeInput}
  //           disabled={form.isDisabled && form.isDisabled(searchData)}
  //         >
  //           {form.selectList.map((type) => (
  //             /* INFO. Default는 value를 가져온다.
  //              * name으로 값을 가져오고싶은 경우, selectName: true로 설정해준다. */
  //             <MenuItem value={form.selectName ? type.name : type.value} key={type.name}>
  //               {!type.name ? "선택 안함" : type.name}
  //             </MenuItem>
  //           ))}
  //         </StyledSelect>
  //       </div>
  //     </CustomGridItem>
  //   );
  // }

  return(
    <Card>
      <MDBox mt={1}>
        <Grid container spacing={1} m={1}>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FormField type="text" label="Name" defaultValue="" InputLabelProps={{ shrink: true }} placeholder="Kim" />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FormField type="text" label="고객번호" defaultValue="" InputLabelProps={{ shrink: true }} placeholder="1234" />
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );

};

export default forwardRef(SearchBox);