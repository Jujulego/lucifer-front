import React, { useMemo } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { CssBaseline, useMediaQuery } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import createTheme from 'theme';

import LoginForm from './auth/LoginForm';
import SignInForm from './auth/SignInForm';
import PrivateRoute from './auth/PrivateRoute';

import AllUserTable from 'containers/users/AllUserTable';
import UserPage from './users/UserPage';

import AppBar from './AppBar';
import Breadcrumbs from './Breadcrumbs';
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
            <AppBar>
              <Breadcrumbs />
              <Switch>
                <Route path="/users/:id">{ ({ match }) => <UserPage id={match!.params.id} /> }</Route>
                <Route path="/users"><AllUserTable /></Route>
                <Route component={Home} />
              </Switch>
            </AppBar>
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;