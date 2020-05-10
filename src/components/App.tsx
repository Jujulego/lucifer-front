import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import createTheme from 'theme';
import useDarkTheme from 'utils/hooks/useDarkTheme';

import LoginForm from './auth/LoginForm';
import PrivateRoute from './auth/PrivateRoute';
import SignInForm from './auth/SignInForm';

import AppBar from './AppBar';
import Breadcrumbs from './Breadcrumbs';
import ErrorSnackbar from './ErrorSnackbar';
import ForbiddenPage from './ForbiddenPage';
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
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginForm} />
          <Route path="/signin" component={SignInForm} />
          <PrivateRoute>
            <AppBar>
              <Breadcrumbs />
            </AppBar>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <ErrorSnackbar />
    </ThemeProvider>
  );
};

export default App;
