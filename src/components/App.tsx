import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import createTheme from 'theme';

import LoginForm from './auth/LoginForm';
import PrivateRoute from './auth/PrivateRoute';
import SignInForm from './auth/SignInForm';

import AllDaemonTable from 'containers/daemons/AllDaemonTable';
import DaemonPage from './daemons/DaemonPage';

import AllUserTable from 'containers/users/AllUserTable';
import UserPage from './users/UserPage';

import AppBar from './AppBar';
import Breadcrumbs from './Breadcrumbs';
import ErrorSnackbar from './ErrorSnackbar';
import EventProvider from './EventProvider';
import ForbiddenPage from './ForbiddenPage';
import Home from './Home';

// Component
const App = () => {
  // Theme
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');
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
            <EventProvider>
              <AppBar>
                <Breadcrumbs />
                <Switch>
                  <Route path="/forbidden" component={ForbiddenPage} />
                  <Route path="/daemons" exact><AllDaemonTable /></Route>
                  <Route path="/daemons/:id">
                    { ({ match }) => <DaemonPage id={match!.params.id} /> }
                  </Route>
                  <Route path="/users" exact><AllUserTable /></Route>
                  <Route path="/users/:id">
                    { ({ match }) => <UserPage id={match!.params.id} /> }
                  </Route>
                  <Route component={Home} />
                </Switch>
              </AppBar>
            </EventProvider>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
      <ErrorSnackbar />
    </ThemeProvider>
  );
};

export default App;
