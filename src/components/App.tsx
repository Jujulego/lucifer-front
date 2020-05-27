import React, { useMemo } from 'react';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import history from 'app.history';
import createTheme from 'theme';
import useDarkTheme from 'utils/hooks/useDarkTheme';

import AuthGate from 'auth/components/AuthGate';

import Home from './Home';

// Component
const App = () => {
  // Theme
  const { prefersDark } = useDarkTheme();
  const theme = useMemo(() => createTheme(prefersDark), [prefersDark]);

  // Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthGate
        domain="dev-lucifer.eu.auth0.com"
        client_id="EiFpapg4lwQb1jJGtVGv7pMx49QIgEaP"
        redirect_uri={window.location.origin}
        onRedirectCallback={(state: any) => history.push((state && state.targetUrl) || window.location.pathname)}
      >
        <Home />
      </AuthGate>
      {/*<AppBar>*/}
      {/*  <Breadcrumbs />*/}
      {/*</AppBar>*/}
      {/*<ErrorSnackbar />*/}
    </ThemeProvider>
  );
};

export default App;
