import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { Credentials } from 'data/user';
import { PasswordField } from 'components/basics/Fields';
import { login } from 'store/auth/thunks';

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
  header: {
    backgroundColor: palette.primary.main,
    color: palette.getContrastText(palette.primary.main)
  },
  actions: {
    justifyContent: "center"
  }
}));

// Component
const LoginForm = () => {
  // Redux
  const dispatch = useDispatch();

  // Form
  const { register, handleSubmit, errors } = useForm<Credentials>();

  // Handlers
  const handleLogin = (creds: Credentials) => {
    dispatch(login(creds));
  };

  // Render
  const styles = useStyles();

  return (
    <Card component="form" onSubmit={handleSubmit(handleLogin)}>
      <CardHeader
        classes={{ root: styles.header }}
        title="Connexion" titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              label="Email" fullWidth variant="outlined" required
              name="email" inputRef={register({ required: true })}
              error={!!errors.email} helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs>
            <PasswordField
              label="Mot de passe" fullWidth variant="outlined" required
              name="password" inputRef={register({ required: true })}
              error={!!errors.password} helperText={errors.password?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions classes={{ root: styles.actions }}>
        <Button
          type="submit"
          variant="contained" color="primary"
        >
          Connexion
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginForm;