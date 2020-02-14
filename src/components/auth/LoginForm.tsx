import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { Credentials } from 'data/user';
import { PasswordField, ToolbarAction } from 'components/basics';
import { login } from 'store/auth/thunks';

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
    <Card elevation={4} component="form" onSubmit={handleSubmit(handleLogin)}>
      <CardHeader
        classes={{ root: styles.header, action: styles.headerAction }}
        title="Connexion" titleTypographyProps={{ variant: "h6" }}
        action={
          <ToolbarAction tooltip="Inscription" component={Link} to="/signin">
            <PersonAddIcon />
          </ToolbarAction>
        }
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