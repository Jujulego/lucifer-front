import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button,
  Card, CardHeader, CardContent, CardActions,
  CardProps,
  Grid,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PLvl } from 'data/permission';
import User, { Credentials } from 'data/user';
import { usePermision } from 'store/users/hooks'

import { EditPasswordField } from 'components/basics/Fields';

// Types
export interface CredentialsCardProps extends CardProps {
  user: User,
  onUpdate: (creds: Partial<Credentials>) => void
}

// Styles
const useStyles = makeStyles({
  actions: {
    justifyContent: 'end'
  }
});

// Components
const CredentialsCard = (props: CredentialsCardProps) => {
  // Props
  const {
    user, onUpdate,
    ...card
  } = props;

  // State
  const [editing, setEditing] = useState(false);

  // Form
  const { control, register, errors, handleSubmit, reset } = useForm<Credentials>();

  // Users
  const canUpdate = usePermision("users", PLvl.UPDATE);

  // Handlers
  const handleReset = useCallback((event?: FormEvent<HTMLDivElement>) => {
    event?.preventDefault();

    setEditing(false);
    reset({
      email: user.email,
      password: ''
    });
  }, [user, setEditing, reset]);

  const handleUpdate = (creds: Credentials) => {
    // Compute update
    const update: Partial<Credentials> = {};

    if (creds.email)    update.email    = creds.email;
    if (creds.password) update.password = creds.password;

    if (Object.keys(update).length > 0) {
      onUpdate(update);
    }
  };

  // Effects
  useEffect(() => { handleReset() }, [handleReset, user]);

  // Render
  const styles = useStyles();

  return (
    <Card
      {...card} component="form"
      onSubmit={handleSubmit(handleUpdate)} onReset={handleReset}
    >
      <CardHeader title="Identifiants" />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              name="email" defaultValue={user.email}
              inputRef={
                register({
                  validate: (value: string) => validator.isEmail(value) || "Email invalide"
                })
              }

              label="Adresse email" fullWidth disabled={!canUpdate}
              error={!!errors.email} helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs>
            <Controller
              name="password" defaultValue=""
              control={control} as={EditPasswordField}
              rules={{
                minLength: { value: 8, message: "8 caractères minimum"}
              }}

              label="Mot de passe" fullWidth disabled={!canUpdate}
              error={!!errors.password} helperText={errors.password?.message}
              editable={editing} onChangeEditable={setEditing}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions classes={{ root: styles.actions }}>
        { canUpdate && (
          <>
            <Button type="reset" color="secondary">Annuler</Button>
            <Button type="submit" color="primary">Modifier</Button>
          </>
        ) }
      </CardActions>
    </Card>
  );
};

export default CredentialsCard;
