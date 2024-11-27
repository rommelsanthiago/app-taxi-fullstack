import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import GlobalStyles, { theme } from "./GlobalStyles";
import Routers from './Routes/routes';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer />
      <h1 style={{textAlign: 'center'}}>APP Taxi</h1>
      <Routers />
    </ThemeProvider>
  )
}

export default App;
