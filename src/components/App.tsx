import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import createTheme from 'theme';
import useDarkTheme from 'utils/hooks/useDarkTheme';

import LoginForm from './auth/LoginForm';
import PrivateRoute from './auth/PrivateRoute';
import SignInForm from './auth/SignInForm';

import AllDaemonTable from 'containers/daemons/AllDaemonTable';
import DaemonRouter from './daemons/DaemonRouter';

import AllUserTable from 'containers/users/AllUserTable';
import UserRouter from './users/UserRouter';

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
              <Switch>
                <Route path="/daemons" exact><AllDaemonTable /></Route>
                <Route path="/daemons/:id" component={DaemonRouter} />

                <Route path="/users" exact><AllUserTable /></Route>
                <Route path="/users/:id" component={UserRouter} />

                <Route path="/forbidden" component={ForbiddenPage} />
                <Route component={Home} />
              </Switch>
            </AppBar>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <ErrorSnackbar />
    </ThemeProvider>
  );
};

export default App;
