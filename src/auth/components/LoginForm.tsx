import React from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useLocation } from 'react-router';
import validator from 'validator';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Container, Grid,
  TextField
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { PasswordField } from 'components/basics';

import { Credentials } from '../models/credentials';
import { useToken, useLogin } from '../auth.hooks';

// Types
interface LocationState {
  from: string
}

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  header: {
    backgroundColor: palette.primary.main,
    color: palette.getContrastText(palette.primary.main)
  },
  headerAction: {
    marginBottom: -8
  },
  actions: {
    justifyContent: "center"
  }
}));

// Component
const LoginForm = () => {
  // Router
  const location = useLocation<LocationState>();

  // Auth
  const token = useToken();
  const handleLogin = useLogin();

  // Form
  const { register, handleSubmit, errors } = useForm<Credentials>();

  // Render
  const styles = useStyles();

  if (token) {
    let target = '/';
    if (location.state && location.state.from) {
      target = location.state.from;
    }

    return <Redirect to={target} />;
  }

  return (
    <Container classes={{ root: styles.root }} fixed maxWidth="sm">
      <Card elevation={4} component="form" onSubmit={handleSubmit(handleLogin)}>
        <CardHeader
          classes={{ root: styles.header, action: styles.headerAction }}
          title="Connexion" titleTypographyProps={{ variant: "h6" }}
        />
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item xs>
              <TextField
                label="Email" fullWidth variant="outlined" required
                error={!!errors.email} helperText={errors.email?.message}
                name="email" inputRef={
                  register({
                    required: true,
                    validate: (value: string) => validator.isEmail(value) || "Email invalide"
                  })
                }
              />
            </Grid>
            <Grid item xs>
              <PasswordField
                label="Mot de passe" fullWidth variant="outlined" required
                error={!!errors.password} helperText={errors.password?.message}
                name="password" inputRef={
                  register({
                    required: true
                  })
                }
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions classes={{ root: styles.actions }}>
          <Button type="submit" variant="contained" color="primary">
            Connexion
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
}

export default LoginForm;
