import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';

import GlobalStyles, { theme } from "./GlobalStyles";
import TravelRequest from './pages/TravelRequest';

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ToastContainer />
      <h1>APP Taxi</h1>
      <TravelRequest />
    </ThemeProvider>
  )
}

export default App;
