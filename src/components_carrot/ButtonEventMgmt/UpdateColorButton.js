import { red, green, purple, teal, orange, yellow } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";


const UpdateColorButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  padding: '0 16px',
  color: 'white',
  backgroundColor: yellow[700],
  border: '1px solid yellow[700]',
  '&:hover': {
    backgroundColor: yellow[700],
    border: '1px solid yellow[700]',
  },
  '&.MuiButton-outlined': {
    color: 'white', // Outlined 버전의 글씨 색상을 흰색으로 설정
    border: '1px solid yellow[700]',
  },
  '&:focus': {
    backgroundColor: yellow[700],
    border: '1px solid yellow[700]',
  },
  '&:active': {
    backgroundColor: yellow[700],
    border: '1px solid yellow[700]',
  }
}));

export default UpdateColorButton;