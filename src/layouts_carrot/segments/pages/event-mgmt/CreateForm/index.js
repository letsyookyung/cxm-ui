import React, { useState, useEffect } from 'react';
import axios from "axios"
import dayjs from 'dayjs';

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
import GreenColorButton from "components_carrot/MDColorButton/GreenColorButton";

import FrequencyForm from 'layouts_carrot/segments/pages/event-mgmt/CreateForm/FrequencyForm';
import PeriodForm from 'layouts_carrot/segments/pages/event-mgmt/CreateForm/PeriodForm';

import useSearchData from "hooks_carrot/useSearchData";
import useSelectOptionsData from "hooks_carrot/useSelectOptionsData";


const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: '200px',
  },
}));

const CreateForm = ({ createForm, onSubmit }) => {
  const classes = useStyles();
  const [isEventDataUpdated, setIsEventDataUpdated] = useState(false);

  const [eventData, setEventData] = useState({
    eventNm: null,
    sgmtRecId: null,
    extrAtrRecId: null,
    rstTyp: null,
    eventFrequency: {
      month: null,
      week: null,
      daysOfWeek: null,
      day: null,
    },
    eventFrequencyCronExpression: null,
    eventPeriod: {
      strDthms: null,
      ndDthms: null,
    },
    stcd: '00',
    stcdMdfDthms: new Date(),
    rst: null,
  });

  const handleInputChange = (fieldId) => (eventOrDate) => {
    const newValue = eventOrDate.target ? eventOrDate.target.value : eventOrDate;
    setEventData(prevEventData => ({
      ...prevEventData,
      [fieldId]: newValue,
    }));
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

  const handlePeriodChange = (periodData) => {
    setEventData(prevEventData => ({
      ...prevEventData,
      eventPeriod: {
        strDthms: periodData.startDate,
        ndDthms: periodData.endDate,
      },
    }));
  };

  const convertToCronExpression = (frequency) => {
    // Day 처리
    let dayStr = '';
    const day = frequency.day ? frequency.day.map(d => d.value) : [];
    if (day.length === 1) {
      const [firstDay] = day;
      dayStr = firstDay;
    } else {
      dayStr = day.join(',');
    }

// Week 및 Day of Week 처리
    let daysOfWeekStr = '';
    const week = frequency.week ? frequency.week.map(w => w.value) : [];
    const daysOfWeek = frequency.daysOfWeek ? frequency.daysOfWeek.map(d => d.value) : [];

    if (week.length === 1) {
      const [firstWeek] = week;
      if (firstWeek === "*") {
        if (daysOfWeek.length === 1) {
          const [firstDayOfWeek] = daysOfWeek;
          daysOfWeekStr = firstDayOfWeek === "*" ? '*' : firstDayOfWeek;
        } else {
          daysOfWeekStr = daysOfWeek.join(',');
        }
      } else if (firstWeek === "?") {
        if (daysOfWeek.length === 1) {
          const [firstDayOfWeek] = daysOfWeek;
          daysOfWeekStr = firstDayOfWeek === "*" ? '*' : firstDayOfWeek;
        } else {
          daysOfWeekStr = daysOfWeek.join(',');
        }
      } else {
        // 다중 주 처리
        const weekStr = week.join(',');
        if (daysOfWeek.length === 1) {
          const [firstDayOfWeek] = daysOfWeek;
          daysOfWeekStr = firstDayOfWeek === "*" ? `1,2,3,4,5,6,7#${weekStr}` : `${firstDayOfWeek}#${weekStr}`;
        } else {
          daysOfWeekStr = `${daysOfWeek.join(',')}#${weekStr}`;
        }
      }
    }

    // Month 처리
    let monthStr = '';
    const month = frequency.month ? frequency.month.map(m => m.value) : [];
    if (month.length === 1) {
      const [firstMonth] = month;
      monthStr = firstMonth === "*" ? '*' : firstMonth;
    } else {
      monthStr = month.join(',');
    }

    const cronExpression = `0 0 ${dayStr} ${monthStr} ${daysOfWeekStr}`;

    return cronExpression;
  }

  const handleSubmit = () => {
    console.log("넘어온 Data :", eventData);

    const cronExpression = convertToCronExpression(eventData.eventFrequency);

    setEventData(prevData => ({
      ...prevData,
      eventFrequencyCronExpression: cronExpression
    }));

    setIsEventDataUpdated(true);
  };

  useEffect(() => {
    if (isEventDataUpdated) {
        const submitData = {
          eventNm: eventData.eventNm,
          sgmtRecId: eventData.sgmtRecId,
          extrAtrRecId: eventData.extrAtrRecId,
          rstTyp: eventData.rstTyp,
          schdExpre: eventData.eventFrequencyCronExpression,
          strDthms: new Date(eventData.eventPeriod.strDthms),
          ndDthms: new Date(eventData.eventPeriod.ndDthms),
          stcd: eventData.stcd,
          stcdMdfDthms: eventData.stcdMdfDthms,
          rst: eventData.rst,
        };

      console.log("변환된 Data :", submitData);
      onSubmit(submitData);
    }
  }, [isEventDataUpdated]);

  
  const renderFormField = (form) => {
    switch (form.id) {
      case 'eventNm':
      case 'rstTyp':
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
      case 'extrAtrRecId' :
        return (
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <Autocomplete
              disableClearable
              options={form.options}
              onChange={(event, newValue) => {
                setEventData({
                  ...eventData,
                  [form.id] : newValue ? newValue.value : '',
                })}}
              size="small"
              renderInput={(params) => <MDInput {...params} variant="standard" label={form.label}
                                                InputLabelProps={{ shrink: true }} />}
              disabled={form.isDisabled}
            />
          </FormControl>
        );
      case 'eventPeriod':
        return (
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <PeriodForm onPeriodChange={handlePeriodChange}  />
          </FormControl>
        )
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
      <Grid item style={{ padding: '0px', marginTop: '10px', marginBottom: '15px' }}>
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
      <Grid item style={{ marginTop: '20px', width: '90%' }}>
        <Box display="flex" justifyContent="center">
          <MDBox py={0} lineHeight={4}>
            <GreenColorButton
              variant="contained"
              color="info"
              size="medium"
              onClick={handleSubmit}
            >
              등록
            </GreenColorButton>
          </MDBox>
        </Box>
      </Grid>
    </Grid>
  );
}


export default CreateForm;