import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl';

import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components_carrot/MDBox";
import MDButton from "components_carrot/MDButton";
import { formatResponseDateFields } from 'layouts_carrot/segments/pages/event-mgmt-test/dateFormatter';


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


const SearchBox = ({ searchForm, jwtToken, onSearchComplete, resetSelectedIds }) => {

  const [formValues, setFormValues] = useState({});

  const handleInputChange = (name) => (event) => {
    const value = event.target.value || null;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  
  const createSearchForm = () => {
    return (
      <Grid container spacing={1} m={3} sx={{ mt: 1, mb:4 }}>
        {searchForm.map((form) => (
          <Grid item key={form.id} xs={12} sm={6} md={6} lg={3} xl={2} style={{ marginTop: '0px'}}>
            <FormControl style={{ width: '90%' }}>
              <CustomTextField
                  id={form.id}
                  label={form.label}
                  type={form.type}
                  variant="standard"
                  value={formValues[form.id] || ""}
                  onChange={handleInputChange(form.id)}
                  placeholder=" 전체"
                  helperText={form.helperText}
                />
            </FormControl>
          </Grid>
        ))}
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} style={{ display: 'flex', alignItems: 'flex-end', marginTop: '6px' }}>
          <MDButton
            variant="outlined"
            color="info"
            size="medium"
            onClick={searchBtn}
          >
            조회
          </MDButton>
        </Grid>
      </Grid>
    );
  };

  const searchBtn = async () => {
    try {
      resetSelectedIds();

      const updatedFormValues = { ...formValues };

      if (formValues.sgmtName) {
        const segmentEndpoint = 'http://localhost:7777/api/cxbd/v1/ui/segment-mgmt/retrieve';
        const { data: segmentResponse } = await axios.get(segmentEndpoint, {
          params: { sgmtName: formValues.sgmtName },
          headers: {
            Authorization: `Bearer ${jwtToken}`
          }
        });
        updatedFormValues.sgmtRecId = segmentResponse.content[0].recid;
        delete updatedFormValues.sgmtName;
      }

      const eventsEndpoint = 'http://localhost:7777/api/cxbd/v1/ui/events-mgmt/retrieve';
      const { data: eventsResponse } = await axios.get(eventsEndpoint, {
        params: updatedFormValues,
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      })

      onSearchComplete(eventsResponse.content.map(formatResponseDateFields));
    } catch (error) {
      console.error('이벤트 검색 중 오류 발생:', error);
    }
  };

  return (
    <Card>
      <MDBox mt={1} pr={4}>
        {createSearchForm()}
      </MDBox>
    </Card>
  );
};

export default SearchBox;