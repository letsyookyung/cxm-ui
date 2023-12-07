import { red, green, purple, teal } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";


const RedColorButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  padding: '0 16px',
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

export default RedColorButton;