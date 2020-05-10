import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { Grid, TextField } from '@material-ui/core';

import { AppDispatch, AppState } from 'store';
import { login } from 'store/auth/thunks';

import { PasswordField } from 'components/basics';

import AuthForm from './AuthForm';

// Types
interface Credentials {
  email: string,
  password: string
}

// Component
const LoginForm = () => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: AppState) => state.auth.error);

  // Form
  const { register, handleSubmit, errors, setError } = useForm<Credentials>();

  // Effects
  useEffect(() => {
    if (error) {
      setError([
        {
          name: "email",
          type: "login-error",
          message: error
        },
        {
          name: "password",
          type: "login-error"
        }
      ]);
    }
  }, [error, setError]);

  // Handlers
  const handleLogin = (creds: Credentials) => {
    dispatch(login(creds));
  };

  // Render
  return (
    <AuthForm
      title="Connexion" submit="Connexion"
      onSubmit={handleSubmit(handleLogin)}
    >
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
            name="password" inputRef={register({ required: true })}
            error={!!errors.password} helperText={errors.password?.message}
          />
        </Grid>
      </Grid>
    </AuthForm>
  );
};

export default LoginForm;
