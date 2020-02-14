import React from 'react';
import { Route, Switch } from 'react-router';

import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './auth/LoginForm';
import SignInForm from './auth/SignInForm';

// Style
const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

// Render
const AuthPage = () => {
  // Render
  const styles = useStyles();

  return (
    <Container
      classes={{ root: styles.root }}
      fixed maxWidth="sm"
    >
      <Switch>
        <Route path="/login" component={LoginForm} />
        <Route path="/signin" component={SignInForm} />
      </Switch>
    </Container>
  );
};

export default AuthPage;