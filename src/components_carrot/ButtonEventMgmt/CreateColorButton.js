import { red, green, purple, teal } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";

const CreateColorButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  padding: '0 16px',
  color: theme.palette.getContrastText(green[900]),
  backgroundColor: green[900],
  '&:hover': {
    backgroundColor: green[900],
  },
}));

export default CreateColorButton;