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

import CreateForm from 'layouts_carrot/segments/pages/event-mgmt/CreateForm';
import DetailForm from 'layouts_carrot/segments/pages/event-mgmt/DetailForm';
import useCreateData from 'hooks_carrot/useCreateData';


const useStyles = makeStyles({
  drawerPaper: {
    width: '30%',
    height: '73%',
    top: 'auto',
    bottom: '1%',
    border: '1px solid rgba(0, 0, 0, 1)',
    transition: 'width 0.3s ease-in-out !important',
  },
  compactDrawerPaper: {
    width: '10%',
    height: '73%',
    top: 'auto',
    bottom: '1%',
    border: '1px solid rgba(0, 0, 0, 1)',
    transition: 'width 0.3s ease-in-out !important',
  },
});

const eventApiURL = "/ui/events-mgmt";

const SideDrawer = ({ open, onClose, formType, formData, rowData }) => {
  const classes = useStyles();
  const [compact, setCompact] = useState(false);
  const createEventData = useCreateData(); 

  const toggleCompact = () => {
    setCompact(prev => !prev);
  };

  const handleDataSubmit = async (submitData) => {
    try {
      switch (formType) {
        case 'create':
          console.log("Creating event with data:", submitData);
          break;
        case 'update':
          console.log("Updating event with data:", submitData);
          break;
        default:
      }
      await createEventData.mutate({ url: eventApiURL, data: submitData });
    } catch (error) {
      console.error("handle Data Submit error:", error);
    }
  };
  
  const FormComponent = () => {
    switch (formType) {
      case 'create':
        return <CreateForm createForm={formData} onSubmit={handleDataSubmit} />;
      case 'detail':
        return <DetailForm detailForm={formData} rowData={rowData} />;
      case 'update':
        return <UpdateForm updateForm={formDta} rowData={rowData} onSubmit={handleDataSubmit} />;
      default:
        return null;
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
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <IconButton onClick={toggleCompact}>
            {compact ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <FormComponent />
    </Drawer>
  );
};


export default SideDrawer;