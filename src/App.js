import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import { SnackbarProvider } from 'notistack';
import { Amplify } from 'aws-amplify';
import Main from './pages/Main';
import { config } from './helpers/config';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.CognitoCredentials.Region,
    userPoolId: config.CognitoCredentials.UserPoolId,
    userPoolWebClientId: config.CognitoCredentials.ClientId,
  },
});

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <SnackbarProvider
          maxSnack={8}
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          TransitionComponent={Zoom}
        >
          <Main />
        </SnackbarProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
