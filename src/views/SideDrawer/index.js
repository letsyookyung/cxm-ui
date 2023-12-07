import React, { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import Drawer from '@mui/material/Drawer';
import Slide from '@mui/material/Slide';
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';

import MDBox from "components_carrot/MDBox";

import useCreateData from 'hooks_carrot/useCreateData';
import useUpdateData from 'hooks_carrot/useUpdateData';

// styles
const useStyles = makeStyles({
  drawerPaper: {
    width: '25% !important',
    height: '73% !important',
    top: 'auto !important',
    bottom: '1% !important',
    border: '1px solid rgba(0, 0, 0, 0.22) !important',
    transition: 'width 0.3s ease-in-out !important',
  },
  compactDrawerPaper: {
    width: '10% !important',
    height: '73% !important',
    top: 'auto !important',
    bottom: '1% !important',
    border: '1px solid rgba(0, 0, 0, 0.22) !important',
    transition: 'width 0.3s ease-in-out !important',
  },
});


const SideDrawer = ({ open, onClose, formType, formComponent: FormComponent, formField, apiURL, rowData }) => {
  // side drawer open&close
  const classes = useStyles();
  const [compact, setCompact] = useState(false);
  const toggleCompact = () => {
    setCompact(prev => !prev);
  };

  // api hooks
  const createData = useCreateData();
  const updateData = useUpdateData();

  // api handler
  const handleDataSubmit = async (submitData) => {
    try {
      switch (formType) {
        case 'create':
          console.log("Creating attribute data:", submitData);
          await createData.mutate({ url: apiURL, data: submitData });
          break;
        case 'update':
          console.log("Updating attribute data:", submitData);
          await updateData.mutate({ url: `${apiURL}/${rowData.recid}`, data: submitData });
          break;
        default:
      }
    } catch (error) {
      console.error("handle Data Submit error:", error);
    }
  };
  
  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      transitionDuration={{ enter: 1000, exit: 1000 }}
      classes={{ paper: compact ? classes.compactDrawerPaper : classes.drawerPaper }}
    >
      <AppBar position="sticky" sx={{ backgroundColor: 'white', paddingBottom: '0px'}} >
          <Toolbar sx={{ paddingBottom: '0px' }} variant="dense" >
            <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <IconButton onClick={toggleCompact}>
              {compact ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
            </IconButton>
          </Toolbar>
      </AppBar>
      {FormComponent && (
        <FormComponent
          formField={formField}
          rowData={rowData}
          onSubmit={handleDataSubmit}
        />
      )}
      <AppBar position="sticky" sx={{ backgroundColor: 'white', paddingBottom: '0px'}} >
        <Toolbar sx={{ paddingBottom: '0px' }} variant="dense" >
        </Toolbar>
      </AppBar>
    </Drawer>
  );
};


export default SideDrawer;