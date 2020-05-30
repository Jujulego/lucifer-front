import React, { useMemo } from 'react';
import { Router } from 'react-router';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import history from 'app.history';
import createTheme from 'app.theme';
import useDarkTheme from 'layout/theme.hooks';

import AuthGate from 'auth/components/AuthGate';
import AutoLogin from 'auth/components/AutoLogin';

import Home from './Home';
import AppBar from 'layout/components/AppBar';

// Component
const App = () => {
  // Theme
  const { prefersDark } = useDarkTheme();
  const theme = useMemo(() => createTheme(prefersDark), [prefersDark]);

  // Render
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <AuthGate
          domain="dev-lucifer.eu.auth0.com"
          client_id="EiFpapg4lwQb1jJGtVGv7pMx49QIgEaP"
          redirect_uri={window.location.origin}
          onRedirectCallback={(state: any) => history.push((state && state.targetUrl) || window.location.pathname)}
        >
          <AutoLogin />
          <AppBar>
            <Home />
          </AppBar>
        </AuthGate>
      </Router>
    </ThemeProvider>
  );
};

export default App;
