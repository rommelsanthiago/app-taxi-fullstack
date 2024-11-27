import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const theme = {
    colors: {
      primary: '#000',
      secondary: '#FFF',
      success: '#28a745',
      danger: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    },
    bg: {
        light: '#fdf420',
        dark: '#343a40',
    }
};  

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        ::-webkit-scrollbar {
                width: 5px;
        }
                
        ::-webkit-scrollbar-thumb {
            background: ${({theme}) => theme.bg.light};
            border-radius: 999px;
        }
    }

    body {
        max-width: 100vw;
        min-height: 100vh;
        background-color: ${({theme}) => theme.bg.light};
    }
`;

export default GlobalStyles;