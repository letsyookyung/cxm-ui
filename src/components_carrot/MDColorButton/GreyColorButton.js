import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";


const GreyColorButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  padding: '0 16px',
  color: 'white',
  backgroundColor: grey[400],
  '&:hover': {
    backgroundColor: grey[400],
  },
}));

export default GreyColorButton;