import React, { useState, useEffect } from 'react';
import axios from "axios"

import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import MDButton from "components_carrot/MDButton";
import MDBox from "components_carrot/MDBox";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Autocomplete from "@mui/material/Autocomplete";

import MDInput from "components_carrot/MDInput";
import FrequencyForm from 'components_carrot/SideDrawerEventMgmt/EventForm/FrequencyForm';

import useSearchData from "hooks_carrot/useSearchData";
import useSelectOptionsData from "hooks_carrot/useSelectOptionsData";


const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: '200px',
  },
}));

const EventForm = ({ createForm }) => {
  const classes = useStyles();

  const [eventData, setEventData] = useState({
    eventNm: '',
    sgmtRecId: '',
    extrAtrRecId: '',
    eventTyp: '',
    eventFrequency: {
      month: null,
      week: null,
      day: null,
    },
    stcd: '',
    strDthms: new Date(),
    ndDthms: new Date(),
    rst: ''
  });

  const handleInputChange = (fieldId) => (event) => {
    setEventData({
      ...eventData,
      [fieldId]: event.target.value, // 이벤트 객체에서 입력값을 가져옴
    });
  };

  const handleFrequencyChange = (frequencyData) => {
    setEventData({
      ...eventData,
      eventFrequency: {
        ...eventData.eventFrequency,
        ...frequencyData,
      },
    });
  };

  const handleSubmit = () => {
    console.log("Form Data:", eventData);
    onSubmit(eventData); // 부모 컴포넌트로 상태 전달
  };

  const renderFormField = (form) => {
    switch (form.id) {
      case 'eventNm':
      case 'extrAtrRecId':
      case 'eventTyp':
        return (
          <FormControl style={{ width: '90%' }}>
            <TextField
              required
              fullWidth
              id={form.id}
              label={form.label}
              type="text"
              value={eventData[form.id] || ''}
              onChange={handleInputChange(form.id)}
              helperText={form.helperText}
              variant="standard"
            />
          </FormControl>
        );
      case 'sgmtRecId' :
        return (
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <Autocomplete
              disableClearable
              options={form.options}
              onChange={handleInputChange(form.id)}
              size="small"
              renderInput={(params) => <MDInput {...params} variant="standard" label={form.label}
                                                InputLabelProps={{ shrink: true }} />}
              disabled={form.isDisabled}
            />
          </FormControl>
        );
      case 'eventFrequency':
        return (
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <FrequencyForm onFrequencyChange={handleFrequencyChange}  />
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Grid container direction="column" alignItems="center" sx={{ padding: '16px', paddingTop: '0px' }}>
      <Grid item style={{ padding: '0px', margin: '5px' }}>
        <Typography variant="h5">이벤트 등록</Typography>
      </Grid>
        {createForm.map((form) => {
            return (
              <Grid item key={form.id} className={classes.gridItem}
                    style={{ display: 'flex', marginTop: '20px', width: '90%' }}>
                <Box display="flex" alignItems="center" justifyContent="flex-start" width="95%">
                  <Box width="80px" flexGrow={0} marginRight="7%">
                    <Typography variant="subtitle1" align="right" style={{ fontSize: '15px' }}>
                      {form.label}:
                    </Typography>
                  </Box>
                  <Box flexGrow={1}>
                    {renderFormField(form)}
                  </Box>
                </Box>
              </Grid>
            );
          })}
      <MDBox py={0} lineHeight={4}>
        <MDButton
          variant="outlined"
          color="info"
          size="medium"
          onClick={handleSubmit}
        >
          등록
        </MDButton>
      </MDBox>
    </Grid>
  );
}


  export default EventForm;