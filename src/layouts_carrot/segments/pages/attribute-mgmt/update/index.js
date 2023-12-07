import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles } from '@mui/styles';

import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Autocomplete from "@mui/material/Autocomplete";
import MDBox from "components_carrot/MDBox";

import MDInput from "components_carrot/MDInput";
import MDButton from "components_carrot/MDButton";
import YellowColorButton from "components_carrot/MDColorButton/YellowColorButton";
import RedColorButton from "components_carrot/MDColorButton/RedColorButton";

// styles
const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: '200px',
  },
}));


const UpdateForm = ({ formField, rowData, onSubmit }) => {
  const classes = useStyles();

  // set initial(row data) data
  const initialSubmitData = useMemo(() =>
      formField.reduce((acc, field) => ({
        ...acc,
        [field.id]: rowData[field.id] || ''
      }), {}),
    [formField, rowData]
  );
  const [updateSubmitData, setUpdateSubmitData] = useState(initialSubmitData);

  // handle input, submit data
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUpdateSubmitData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
  const handleSubmit = () => {
    console.log("updated data => ", updateSubmitData)
    if (onSubmit) {
      onSubmit(updateSubmitData);
    }
  };

  // handle reset
  const handleReset = () => {
    setUpdateSubmitData(initialSubmitData);
  };

  // set 'updateSubmitData' when initial(row data) changes
  useEffect(() => {
    setUpdateSubmitData(initialSubmitData);
  }, [initialSubmitData]);

  // creating form by field type
  const renderFormField = (field) => {
    switch (field.type) {
      case 'text':
        return (
          <FormControl style={{ width: '90%' }}>
            <TextField
              fullWidth
              id={field.id}
              type="text"
              value={updateSubmitData[field.id] || ''}
              onChange={handleInputChange}
              variant="standard"
              disabled={!field.editable}
              multiline
            />
          </FormControl>
        );
      case 'select' :
        return (
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <Autocomplete
              disableClearable
              options={field.options}
              getOptionLabel={(option) => option.label}
              value={field.options.find(option => option.id === updateSubmitData[field.id]) || ''}
              onChange={(event, newValue) => {
                setUpdateSubmitData((prev) => ({
                  ...prev,
                  [field.id]: newValue ? newValue.id : null
                }));
              }}
              size="small"
              renderInput={(params) => (
                <MDInput {...params} variant="standard" label={field.label} InputLabelProps={{ shrink: true }} />
              )}
            />
          </FormControl>
        );
      default:
        return null;
    }
  };

  
  return (
    <Grid container direction="column" alignItems="center" sx={{ padding: '16px', paddingTop: '0px' }}>
      <Grid item style={{ padding: '0px', marginTop: '10px', marginBottom: '15px' }}>
        <Typography variant="h5">컬럼 수정</Typography>
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
              {renderFormField(field)}
            </Box>
          </Box>
        </Grid>
      ))}
      <Grid item style={{ marginTop: '30px', width: '90%' }}>
        <Box display="flex" justifyContent="center">
          <YellowColorButton variant="contained" onClick={handleSubmit} style={{ marginRight: '10px' }}>
            저장
          </YellowColorButton>
          <RedColorButton variant="contained" onClick={handleReset} style={{ marginRight: '10px' }}>
            초기화
          </RedColorButton>
        </Box>
      </Grid>
    </Grid>

  );
};

export default UpdateForm;