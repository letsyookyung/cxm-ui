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

// @mui material components
import { createTheme } from "@mui/material/styles";
// import Fade from "@mui/material/Fade";

// Material Dashboard 2 PRO React base styles
import colors from "assets_carrot/theme/base/colors";
import breakpoints from "assets_carrot/theme/base/breakpoints";
import typography from "assets_carrot/theme/base/typography";
import boxShadows from "assets_carrot/theme/base/boxShadows";
import borders from "assets_carrot/theme/base/borders";
import globals from "assets_carrot/theme/base/globals";

// Material Dashboard 2 PRO React helper functions
import boxShadow from "assets_carrot/theme/functions/boxShadow";
import hexToRgb from "assets_carrot/theme/functions/hexToRgb";
import linearGradient from "assets_carrot/theme/functions/linearGradient";
import pxToRem from "assets_carrot/theme/functions/pxToRem";
import rgba from "assets_carrot/theme/functions/rgba";

// Material Dashboard 2 PRO React components base styles for @mui material components
import sidenav from "assets_carrot/theme/components/sidenav";
import list from "assets_carrot/theme/components/list";
import listItem from "assets_carrot/theme/components/list/listItem";
import listItemText from "assets_carrot/theme/components/list/listItemText";
import card from "assets_carrot/theme/components/card";
import cardMedia from "assets_carrot/theme/components/card/cardMedia";
import cardContent from "assets_carrot/theme/components/card/cardContent";
import button from "assets_carrot/theme/components/button";
import iconButton from "assets_carrot/theme/components/iconButton";
import input from "assets_carrot/theme/components/form/input";
import inputLabel from "assets_carrot/theme/components/form/inputLabel";
import inputOutlined from "assets_carrot/theme/components/form/inputOutlined";
import textField from "assets_carrot/theme/components/form/textField";
import menu from "assets_carrot/theme/components/menu";
import menuItem from "assets_carrot/theme/components/menu/menuItem";
import switchButton from "assets_carrot/theme/components/form/switchButton";
import divider from "assets_carrot/theme/components/divider";
import tableContainer from "assets_carrot/theme/components/table/tableContainer";
import tableHead from "assets_carrot/theme/components/table/tableHead";
import tableCell from "assets_carrot/theme/components/table/tableCell";
import linearProgress from "assets_carrot/theme/components/linearProgress";
import breadcrumbs from "assets_carrot/theme/components/breadcrumbs";
import slider from "assets_carrot/theme/components/slider";
import avatar from "assets_carrot/theme/components/avatar";
import tooltip from "assets_carrot/theme/components/tooltip";
import appBar from "assets_carrot/theme/components/appBar";
import tabs from "assets_carrot/theme/components/tabs";
import tab from "assets_carrot/theme/components/tabs/tab";
import stepper from "assets_carrot/theme/components/stepper";
import step from "assets_carrot/theme/components/stepper/step";
import stepConnector from "assets_carrot/theme/components/stepper/stepConnector";
import stepLabel from "assets_carrot/theme/components/stepper/stepLabel";
import stepIcon from "assets_carrot/theme/components/stepper/stepIcon";
import select from "assets_carrot/theme/components/form/select";
import formControlLabel from "assets_carrot/theme/components/form/formControlLabel";
import formLabel from "assets_carrot/theme/components/form/formLabel";
import checkbox from "assets_carrot/theme/components/form/checkbox";
import radio from "assets_carrot/theme/components/form/radio";
import autocomplete from "assets_carrot/theme/components/form/autocomplete";
import flatpickr from "assets_carrot/theme/components/flatpickr";
import container from "assets_carrot/theme/components/container";
import popover from "assets_carrot/theme/components/popover";
import buttonBase from "assets_carrot/theme/components/buttonBase";
import icon from "assets_carrot/theme/components/icon";
import svgIcon from "assets_carrot/theme/components/svgIcon";
import link from "assets_carrot/theme/components/link";
import dialog from "assets_carrot/theme/components/dialog";
import dialogTitle from "assets_carrot/theme/components/dialog/dialogTitle";
import dialogContent from "assets_carrot/theme/components/dialog/dialogContent";
import dialogContentText from "assets_carrot/theme/components/dialog/dialogContentText";
import dialogActions from "assets_carrot/theme/components/dialog/dialogActions";

export default createTheme({
  direction: "rtl",
  breakpoints: { ...breakpoints },
  palette: { ...colors },
  typography: { ...typography },
  boxShadows: { ...boxShadows },
  borders: { ...borders },
  functions: {
    boxShadow,
    hexToRgb,
    linearGradient,
    pxToRem,
    rgba,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...globals,
        ...flatpickr,
        ...container,
      },
    },
    MuiDrawer: { ...sidenav },
    MuiList: { ...list },
    MuiListItem: { ...listItem },
    MuiListItemText: { ...listItemText },
    MuiCard: { ...card },
    MuiCardMedia: { ...cardMedia },
    MuiCardContent: { ...cardContent },
    MuiButton: { ...button },
    MuiIconButton: { ...iconButton },
    MuiInput: { ...input },
    MuiInputLabel: { ...inputLabel },
    MuiOutlinedInput: { ...inputOutlined },
    MuiTextField: { ...textField },
    MuiMenu: { ...menu },
    MuiMenuItem: { ...menuItem },
    MuiSwitch: { ...switchButton },
    MuiDivider: { ...divider },
    MuiTableContainer: { ...tableContainer },
    MuiTableHead: { ...tableHead },
    MuiTableCell: { ...tableCell },
    MuiLinearProgress: { ...linearProgress },
    MuiBreadcrumbs: { ...breadcrumbs },
    MuiSlider: { ...slider },
    MuiAvatar: { ...avatar },
    MuiTooltip: { ...tooltip },
    MuiAppBar: { ...appBar },
    MuiTabs: { ...tabs },
    MuiTab: { ...tab },
    MuiStepper: { ...stepper },
    MuiStep: { ...step },
    MuiStepConnector: { ...stepConnector },
    MuiStepLabel: { ...stepLabel },
    MuiStepIcon: { ...stepIcon },
    MuiSelect: { ...select },
    MuiFormControlLabel: { ...formControlLabel },
    MuiFormLabel: { ...formLabel },
    MuiCheckbox: { ...checkbox },
    MuiRadio: { ...radio },
    MuiAutocomplete: { ...autocomplete },
    MuiPopover: { ...popover },
    MuiButtonBase: { ...buttonBase },
    MuiIcon: { ...icon },
    MuiSvgIcon: { ...svgIcon },
    MuiLink: { ...link },
    MuiDialog: { ...dialog },
    MuiDialogTitle: { ...dialogTitle },
    MuiDialogContent: { ...dialogContent },
    MuiDialogContentText: { ...dialogContentText },
    MuiDialogActions: { ...dialogActions },
  },
});
