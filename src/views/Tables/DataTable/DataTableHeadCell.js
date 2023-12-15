/**
=========================================================
* Material Dashboard 2 PRO React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SouthIcon from '@mui/icons-material/South';
import IconButton from '@mui/material/IconButton';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import Grid from "@mui/material/Grid";

// Material Dashboard 2 PRO React components
import MDBox from "components_carrot/MDBox";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController } from "context_carrot";

function DataTableHeadCell({ id, width, children, isSortable, sortDirection, align, onSort, ...rest }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      component="th"
      width={width}
      py={1.5}
      px={3}
      sx={({ palette: { light, dark }, borders: { borderWidth } }) => ({
        borderBottom: `${borderWidth[1]} solid ${light.main}`,
        borderRight: `${borderWidth[1]} solid ${light.main}`,
        '&:last-child': {
          borderRight: 'none',
        },
      })}
    >
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <MDBox
            {...rest}
            position="relative"
            textAlign={align}
            color={darkMode ? "white" : "dark"}
            opacity={0.7}
            sx={({ typography: { size, fontWeightBold } }) => ({
              fontSize: size.xs,
              fontWeight: fontWeightBold,
              textTransform: "uppercase",
            })}
          >
            {children}
          </MDBox>
        </Grid>
        {isSortable && (
          <Grid item>
            <IconButton onClick={onSort}>
              {sortDirection === 'ASC' ? (
                <KeyboardDoubleArrowUpRoundedIcon fontSize={"small"} />
              ) : sortDirection === 'DESC' ? (
                <KeyboardDoubleArrowDownRoundedIcon fontSize={"small"} />
              ) : (
                <DragHandleRoundedIcon fontSize={"small"} />
              )}
            </IconButton>
          </Grid>
        )}
      </Grid>
    </MDBox>
  );
}

// Setting default values for the props of DataTableHeadCell
DataTableHeadCell.defaultProps = {
  width: "auto",
  sorted: "none",
  align: "left",
  onSort: undefined,
};

// Typechecking props for the DataTableHeadCell
DataTableHeadCell.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
  sorted: PropTypes.oneOf([false, "none", "asce", "desc"]),
  align: PropTypes.oneOf(["left", "right", "center"]),
  onSort: PropTypes.func,
};

export default DataTableHeadCell;
