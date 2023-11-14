import React, { useState } from 'react';

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

import EventForm from 'components_carrot/SideDrawerEventMgmt/EventForm';

const useStyles = makeStyles({
  drawerPaper: {
    width: '50%',
    height: '70%',
    top: 'auto',
    bottom: '3%',
    border: '1px solid rgba(0, 0, 0, 1)',
    transition: 'width 0.3s ease-in-out !important',
  },
  compactDrawerPaper: {
    width: '10%',
    height: '70%',
    top: 'auto',
    bottom: '3%',
    border: '1px solid rgba(0, 0, 0, 1)',
    transition: 'width 0.3s ease-in-out !important',
  },
});

const SideDrawerEventMgmt = ({ open, onClose, createForm }) => {
  const classes = useStyles();
  const [compact, setCompact] = useState(false);
  

  const toggleCompact = () => {
    setCompact((prev) => !prev);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={open}
      transitionDuration={{
        enter: 1000,
        exit: 1000,
      }}
      classes={{
        paper: compact ? classes.compactDrawerPaper : classes.drawerPaper,
      }}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ paddingBottom: '0px' }} >
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
        <EventForm createForm={createForm} />
    </Drawer>

  );
};

export default SideDrawerEventMgmt;