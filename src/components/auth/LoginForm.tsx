import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Grid, TextField } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { Credentials } from 'data/user';
import { PasswordField, ToolbarAction } from 'components/basics';
import { login } from 'store/auth/thunks';

import AuthForm from './AuthForm';

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
  return (
    <AuthForm
      title="Connexion" submit="Connexion"
      onSubmit={handleSubmit(handleLogin)}

      action={
        <ToolbarAction tooltip="Inscription" component={Link} to="/signin">
          <PersonAddIcon />
        </ToolbarAction>
      }
    >
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
    </AuthForm>
  );
};

export default LoginForm;