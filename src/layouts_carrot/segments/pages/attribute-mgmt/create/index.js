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

// styles
const useStyles = makeStyles((theme) => ({
  gridItem: {
    width: '200px',
  },
}));


const CreateForm = ({ formField, onSubmit, resetForm, setResetForm }) => {
  const classes = useStyles();
  const [fieldErrors, setFieldErrors] = useState({});

  // create data init
  const [submitData, setSubmitData] = useState({
    tabnm: null,
    tablXpnm: null,
    clmNm: null,
    clmXpnm: null,
    clmTyp: null,
    psinfYn: null,
    xpnm: null,
  });

  // handle input, submit data
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setSubmitData((prev) => ({
      ...prev,
      [id]: value
    }));

    if (fieldErrors[id]) {
      setFieldErrors((prev) => ({
        ...prev,
        [id]: false
      }));
    }
  };
  const handleSubmit = () => {
    const errors = {};
    let isValid = true;

    formField.forEach(field => {
      if (field.required && !submitData[field.id]) {
        errors[field.id] = true;
        isValid = false;
      }
    });

    setFieldErrors(errors);

    if (isValid) {
      if (onSubmit) {
        onSubmit(submitData);

        setResetForm(prev => !prev);
      }
    }

  };

  // creating form by field type
  const renderFormField = (field) => {
    const error = fieldErrors[field.id];

    switch (field.type) {
      case 'text':
        return (
          <FormControl style={{ width: '90%' }} error={error}>
            <TextField
              required={field.required}
              fullWidth
              id={field.id}
              label={field.label}
              value={submitData[field.id] || ''}
              onChange={handleInputChange}
              helperText={error ? "이 필드는 필수입니다" : field.helperText}
              variant="standard"
              multiline
              error={error}
            />
          </FormControl>
        );
      case 'select' : {
        const currentOption = field.id === 'psinfYn'
          ? field.options.find(option => option.id === submitData[field.id]) || null
          : null;
        return (
          <FormControl fullWidth variant="standard" style={{ width: '90%' }}>
            <Autocomplete
              disableClearable
              value={currentOption}
              options={field.options}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                setSubmitData((prev) => ({
                  ...prev,
                  [field.id]: newValue ? newValue.id : null
                }));

                if (error) {
                  setFieldErrors((prev) => ({
                    ...prev,
                    [field.id]: false
                  }));
                }
              }}
              size="small"
              renderInput={(params) => (
                <MDInput
                  {...params}
                  variant="standard"
                  label={field.label}
                  InputLabelProps={{ shrink: true }}
                  error={error}
                  helperText={error ? "이 필드는 필수입니다" : field.helperText}
                  FormHelperTextProps={{
                    style: { color: error ? 'red' : 'rgba(0, 0, 0, 0.6)' }
                  }}
                />
              )}
            />
          </FormControl>
        );
      }
      default:
        return null;
    }
  };

  // resetting submit data
  useEffect(() => {
    setSubmitData({
      tabnm: null,
      tablXpnm: null,
      clmNm: null,
      clmXpnm: null,
      clmTyp: null,
      psinfYn: null,
      xpnm: null,
    });

    setFieldErrors({});
  }, [resetForm]);


  return (
    <Grid container direction="column" alignItems="center" sx={{ padding: '16px', paddingTop: '0px' }}>
      <Grid item style={{ padding: '0px', marginTop: '10px', marginBottom: '15px' }}>
        <Typography variant="h5">컬럼 등록</Typography>
      </Grid>
      {formField.map((field) => {
        return (
          <Grid item key={field.id} className={classes.gridItem}
                style={{ display: 'flex', marginTop: '20px', width: '90%' }}>
            <Box display="flex" alignItems="center" justifyContent="flex-start" width="95%">
              <Box width="80px" flexGrow={0} marginRight="7%">
                <Typography variant="subtitle1" align="right" style={{ fontSize: '15px' }}>
                  {field.label}:
                </Typography>
              </Box>
              <Box flexGrow={1}>
                {renderFormField(field)}
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