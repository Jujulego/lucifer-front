import React, { FormEvent, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button, TextField,
  Card, CardHeader, CardContent, CardActions,
  FormControl, InputLabel,
  Grid,
  CardProps
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { PLvl } from 'data/permission';
import Daemon, { DaemonUpdate } from 'data/daemon';

import { usePermision } from 'store/users/hooks';

import UserLink from 'components/users/UserLink';

// Types
export interface InfoCardProps extends CardProps {
  daemon: Daemon;
  onUpdate: (data: DaemonUpdate) => void;
}

export type FormState = { [name in keyof DaemonUpdate]: Daemon[name] };

// Styles
const useStyles = makeStyles({
  user: {
    marginTop: 16,
    paddingTop: 6,
    paddingBottom: 7,
  },
  actions: {
    justifyContent: 'end'
  }
});

// Component
const DataCard = (props: InfoCardProps) => {
  // Props
  const {
    daemon, onUpdate,
    ...card
  } = props;

  // Form
  const { register, errors, handleSubmit, reset } = useForm<FormState>();

  // Users
  const canUpdate = usePermision("daemons", PLvl.UPDATE);

  // Handlers
  const handleReset = useCallback((event?: FormEvent<HTMLDivElement>) => {
    event?.preventDefault();

    reset({ name: daemon.name });
  }, [reset, daemon]);

  const handleUpdate = (data: FormState) => {
    // Compute update
    const update: DaemonUpdate = {};

    if (data.name) update.name = data.name;

    if (Object.keys(update).length > 0) {
      onUpdate(update);
    }
  };

  // Effects
  useEffect(() => { handleReset() }, [handleReset, daemon]);

  // Render
  const styles = useStyles();

  return (
    <Card
      {...card} component="form"
      onSubmit={handleSubmit(handleUpdate)} onReset={handleReset}
    >
      <CardHeader title="Informations" />
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              name="name" defaultValue={daemon.name}
              inputRef={register()}

              label="Nom" fullWidth disabled={!canUpdate}
              error={!!errors.name} helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel shrink>Utilisateur</InputLabel>
              <UserLink id={daemon.user} classes={{ root: styles.user }} forceLoad />
            </FormControl>
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

export default DataCard;
