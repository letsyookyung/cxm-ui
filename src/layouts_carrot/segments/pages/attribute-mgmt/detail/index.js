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

// styles
const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: '200px',
  },
  noAnimation: {
    '&:after': {
      transform: 'none !important',
      borderBottom: '1px solid rgba(0, 0, 0, 0.22) !important',
    }
  },
}));


const DetailForm = ({ formField, rowData }) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" alignItems="center" sx={{ padding: '16px', paddingTop: '0px' }}>
      <Grid item style={{ padding: '0px', marginTop: '10px', marginBottom: '15px' }}>
        <Typography variant="h5">컬럼 상세</Typography>
      </Grid>
      {formField.map((field) => (
        <Grid item key={field.id} className={classes.gridItem}
              style={{ display: 'flex', marginTop: '20px', width: '90%' }}
        >
          <Box display="flex" alignItems="center" justifyContent="flex-start" width="95%">
            <Box width="80px" flexGrow={0} marginRight="7%">
              <Typography variant="subtitle1" align="right" style={{ fontSize: '13px' }}>
                {field.label}:
              </Typography>
            </Box>
            <Box flexGrow={1}>
              <FormControl style={{ width: '90%' }}>
                <TextField
                  fullWidth
                  id={field.id}
                  type="text"
                  value={rowData[field.id] || ''}
                  variant="standard"
                  InputProps={{
                    className: classes.noAnimation,
                    readOnly: true
                  }}
                  multiline
                />
              </FormControl>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default DetailForm;