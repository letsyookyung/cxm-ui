import React from 'react';
import DefaultCell from "layouts_carrot/table/components/DefaultCell";
import moment from 'moment';

import Tooltip from '@mui/material/Tooltip';
import Icon from "@mui/material/Icon";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ModeEditOutlineRoundedIcon from '@mui/icons-material/ModeEditOutlineRounded';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { makeStyles } from '@mui/styles';

import MDButton from "components_carrot/MDButton";
import MDBox from "components_carrot/MDBox";


const useStyles = makeStyles((theme) => ({
  ellipsisText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
  },
}));


export const defaultCell = (value) => {
  const MAX_LENGTH = 20; 
  const displayValue = value && value.toString().length > MAX_LENGTH
    ? `${value.toString().substring(0, MAX_LENGTH)}...`
    : value;
  return <DefaultCell value={displayValue} />;
};

export const dateCell = (value) => {
  const MAX_LENGTH = 30;
  const formattedValue = moment(value).format("YYYY-MM-DD HH:mm");
  const displayValue = formattedValue.length > MAX_LENGTH
    ? `${formattedValue.substring(0, MAX_LENGTH)}...`
    : formattedValue;
  return <DefaultCell value={displayValue} />;
};

export const detailCell = (rowData, handleDetailClick) => {
  return (
    <MDBox lineHeight={0}>
      <Tooltip title="상세보기" placement="bottom">
        <IconButton
          size="small"
          onClick={() => handleDetailClick(rowData)}
        >
          <ZoomInIcon />
        </IconButton>
      </Tooltip>
    </MDBox>
  );
};

export const updateCell = (rowData, handleUpdateClick) => {
  return (
    <MDBox lineHeight={0}>
      <Tooltip title="수정" placement="bottom">
        <IconButton
          variant="standard"
          size="small"
          onClick={() => handleUpdateClick(rowData)}
        >
          <ModeEditOutlineRoundedIcon />
        </IconButton>
      </Tooltip>
    </MDBox>
  );
};