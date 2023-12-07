import { red, green, purple, teal, orange, yellow } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";


const YellowColorButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  padding: '0 16px',
  color: 'white',
  backgroundColor: yellow[700],
  '&:hover': {
    backgroundColor: yellow[700],
  },
}));

export default YellowColorButton;