import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import createTheme from 'theme';

import LoginForm from './auth/LoginForm';
import PrivateRoute from './auth/PrivateRoute';
import SignInForm from './auth/SignInForm';

import ForbiddenPage from './permissions/ForbiddenPage';
import OverrideAccess from './permissions/OverrideAccess';

import AllUserTable from 'containers/users/AllUserTable';
import UserPage from './users/UserPage';

import AppBar from './AppBar';
import Breadcrumbs from './Breadcrumbs';
import ErrorSnackbar from './ErrorSnackbar';
import Home from './Home';
import { Lvl, useLoggedUser } from 'store/users/hooks';

// Component
const App = () => {
  // User
  const user = useLoggedUser();

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
            <AppBar>
              <Breadcrumbs />
              <Switch>
                <Route path="/forbidden" component={ForbiddenPage} />
                <Route path="/users" exact><AllUserTable /></Route>
                <Route path="/users/:id">
                  { ({ match }) => (
                    <OverrideAccess name="users" level={user?._id === match!.params.id ? Lvl.READ | Lvl.UPDATE : Lvl.NONE}>
                      <UserPage id={match!.params.id} />
                    </OverrideAccess>
                  ) }
                </Route>
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