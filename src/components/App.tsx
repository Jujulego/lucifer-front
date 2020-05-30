import React, { useMemo } from 'react';
import { Route, Router, Switch } from 'react-router';

import { CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import history from 'app.history';
import createTheme from 'app.theme';
import authConfig from 'configs/auth';
import useDarkTheme from 'layout/theme.hooks';

import AuthGate from 'auth/components/AuthGate';
import AutoLogin from 'auth/components/AutoLogin';

import Home from './Home';
import AppBar from 'layout/components/AppBar';
import UserTable from 'users/components/UserTable';

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
          domain={authConfig.domain}
          client_id={authConfig.clientId}
          audience={authConfig.audience}
          redirect_uri={window.location.origin}
          onRedirectCallback={(state: any) => history.push((state && state.targetUrl) || window.location.pathname)}
        >
          <AutoLogin />
          <AppBar>
            <Switch>
              <Route path="/users" component={UserTable} />
              <Route component={Home} />
            </Switch>
          </AppBar>
        </AuthGate>
      </Router>
    </ThemeProvider>
  );
};

export default App;
