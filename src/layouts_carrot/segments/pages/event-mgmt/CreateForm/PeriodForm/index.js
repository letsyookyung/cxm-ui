import { React, useState, useEffect } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';


const useStyles = makeStyles((theme) => ({
  rowContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
  },
  selectContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    flexGrow: 1,
  },
  betweenDatesText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
    fontSize: '1rem',
    color: 'gray',
  },
}));


const PeriodForm = ({ onPeriodChange }) => {
  const classes = useStyles();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    onPeriodChange({ startDate: newValue, endDate });
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    onPeriodChange({ startDate, endDate: newValue });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid item className={classes.rowContainer}>
        <Box className={classes.selectContainer} style={{ width: '100%'}}>
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <DatePicker
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => <TextField {...params} className={classes.datePickerTextField}/>}
            />
          </FormControl>
          <Box className={classes.betweenDatesText}>~</Box>
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <DatePicker
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => <TextField {...params} className={classes.datePickerTextField}/>}
            />
          </FormControl>
        </Box>
      </Grid>
    </LocalizationProvider>
    );
};

export default PeriodForm;