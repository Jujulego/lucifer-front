import React, { useMemo } from 'react';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import createTheme from 'theme';
import useDarkTheme from 'utils/hooks/useDarkTheme';

import { useAuth0 } from 'auth/auth0.context';

import AppBar from './AppBar';
import Breadcrumbs from './Breadcrumbs';
import ErrorSnackbar from './ErrorSnackbar';
import Home from './Home';

// Component
const App = () => {
  // Theme
  const { prefersDark } = useDarkTheme();
  const theme = useMemo(() => createTheme(prefersDark), [prefersDark]);

  // Auth0
  const { isAuthenticated, loading, loginWithRedirect } = useAuth0();

  // Render
  if (loading) {
    return (
      <p>Loading ...</p>
    );
  }

  if (!isAuthenticated) {
    loginWithRedirect()
      .then(() => {});
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Home />
      {/*<AppBar>*/}
      {/*  <Breadcrumbs />*/}
      {/*</AppBar>*/}
      {/*<ErrorSnackbar />*/}
    </ThemeProvider>
  );
};

export default App;
