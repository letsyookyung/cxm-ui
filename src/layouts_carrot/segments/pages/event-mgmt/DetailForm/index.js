import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import MDBox from "components_carrot/MDBox";
import MDButton from "components_carrot/MDButton";
import YellowColorButton from "components_carrot/MDColorButton/YellowColorButton";
import GreenColorButton from "components_carrot/MDColorButton/GreenColorButton";

const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: '200px',
  },
}));

const DetailForm = ({ detailForm, rowData }) => {
  const classes = useStyles();

  const [editable, setEditable] = useState(false); // Editable state

  const toggleEditable = () => {
    setEditable((prevEditable) => !prevEditable);
  };

  const [updateEventData, setUpdateEventData] = useState({
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

  const handleSubmit = () => {
    // Handle form submission logic here
    toggleEditable(); // Turn off editing after submission
  };

  return (
    <Grid container direction="column" alignItems="center" sx={{ padding: '16px', paddingTop: '0px' }}>
      <Grid item style={{ padding: '0px', marginTop: '10px', marginBottom: '15px' }}>
        <Typography variant="h5">이벤트 상세</Typography>
      </Grid>
      {detailForm.map((form) => (
        <Grid item key={form.id} className={classes.gridItem}
          style={{ display: 'flex', marginTop: '20px', width: '90%' }}
        >
          <Box display="flex" alignItems="center" justifyContent="flex-start" width="95%">
            <Box width="80px" flexGrow={0} marginRight="7%">
              <Typography variant="subtitle1" align="right" style={{ fontSize: '13px' }}>
                {form.label}:
              </Typography>
            </Box>
            <Box flexGrow={1}>
              <FormControl style={{ width: '90%' }}>
                <TextField
                  fullWidth
                  id={form.id}
                  type={form.type === 'select' ? 'select' : 'text'} // Handle select type differently if needed
                  value={rowData[form.id] || ''}
                  variant="standard"
                  inputProps={{
                    readOnly: !editable, // Make the field readonly if not editable
                    style: {
                      cursor: editable ? 'text' : 'not-allowed', // Set cursor based on editability
                    },
                  }}
                />
              </FormControl>
            </Box>
          </Box>
        </Grid>
      ))}
      <Grid item style={{ marginTop: '20px', width: '90%' }}>
        <Box display="flex" justifyContent="center">
          <MDBox py={0} lineHeight={4}>
            <YellowColorButton variant="contained" color="info" size="medium" onClick={toggleEditable}>
              {editable ? '취소' : '수정'} {/* Toggle button label based on editable state */}
            </YellowColorButton>
            {editable && (
              <GreenColorButton variant="contained" color="info" size="medium" onClick={handleSubmit}>
                저장
              </GreenColorButton>
            )}
          </MDBox>
        </Box>
      </Grid>
    </Grid>
  );
};
export default DetailForm;