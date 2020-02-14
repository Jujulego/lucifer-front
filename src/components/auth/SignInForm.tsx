import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import { Credentials } from 'data/user';
import { PasswordField, ToolbarAction } from 'components/basics';
import { signIn } from 'store/auth/thunks';

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
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

// Types
type FormState = Credentials & { confirm: string };

// Component
const SignInForm = () => {
  // Redux
  const dispatch = useDispatch();

  // Form
  const { register, getValues, handleSubmit, errors } = useForm<FormState>();

  // Handlers
  const samePassword = (value: string) => {
    const { password } = getValues();
    return value === password || 'Les mots de passe doivent correspondre';
  };

  const handleLogin = ({ email, password}: FormState) => {
    dispatch(signIn({ email, password }));
  };

  // Render
  const styles = useStyles();

  return (
    <Card elevation={4} component="form" onSubmit={handleSubmit(handleLogin)}>
      <CardHeader
        classes={{ root: styles.header, action: styles.headerAction }}
        title="Inscription" titleTypographyProps={{ variant: "h6" }}
        action={
          <ToolbarAction tooltip="Se connecter" component={Link} to="/login">
            <LockOpenIcon />
          </ToolbarAction>
        }
      />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              label="Email" fullWidth variant="outlined" required
              name="email" inputRef={
                register({
                  required: true,
                  validate: (value: string) => validator.isEmail(value) || "Email invalide"
                })
              }
              error={!!errors.email} helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs>
            <PasswordField
              label="Mot de passe" fullWidth variant="outlined" required
              name="password" inputRef={
                register({
                  required: true,
                  minLength: { value: 8, message: "8 caractères minimum" }
                })
              }
              error={!!errors.password} helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs>
            <PasswordField
              label="Confirmation" fullWidth variant="outlined" required
              name="confirm" inputRef={
                register({
                  required: true,
                  validate: samePassword
                })
              }
              error={!!errors.confirm} helperText={errors.confirm?.message}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions classes={{ root: styles.actions }}>
        <Button
          type="submit"
          variant="contained" color="primary"
        >
          Inscription
        </Button>
      </CardActions>
    </Card>
  );
};

export default SignInForm;