import { createGlobalStyle } from 'styled-components';

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
            background: #fdf420;
            border-radius: 999px;
        }
    }

    body {
        max-width: 100vw;
        min-height: 100vh;
        background-color: #fdf420;
    }
`;

export default GlobalStyles;