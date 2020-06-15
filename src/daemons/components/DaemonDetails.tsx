import React, { ReactNode, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Fab, FormControl, FormHelperText, Grid, InputLabel, TextField, Zoom } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import UserSelect from 'users/components/UserSelect';

import { Daemon, UpdateDaemon } from '../models/daemon';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    padding: spacing(3),

    [breakpoints.down('sm')]: {
      padding: spacing(2),
    }
  },
  save: {
    position: 'absolute',
    bottom: spacing(2),
    right: spacing(2)
  }
}));

// Utils
interface GridItemProps {
  children: ReactNode
}

const GridItem = ({ children }: GridItemProps) => (
  <Grid item xs={12} sm={6} md={4}>
    { children }
  </Grid>
);

// Types
export interface DaemonDetailsProps {
  daemon: Daemon;
  onUpdate: (update: UpdateDaemon) => void;
}

// Component
const DaemonDetails = (props: DaemonDetailsProps) => {
  const { daemon, onUpdate } = props;

  // Form
  const { errors, control, register, reset, handleSubmit, formState } = useForm<UpdateDaemon>();

  // Effects
  useEffect(() => {
    reset({
      name: daemon.name,
      ownerId: daemon.owner?.id
    });
  }, [reset, daemon])

  // Render
  const styles = useStyles();

  return (
    <form className={styles.root} onSubmit={handleSubmit(onUpdate)}>
      <Grid container spacing={2}>
        <GridItem>
          <TextField
            label="Nom" variant="outlined" fullWidth
            name="name" inputRef={register}
            error={!!errors.name} helperText={errors.name?.message}
          />
        </GridItem>
        <GridItem>
          <FormControl fullWidth error={!!errors.ownerId} variant="outlined">
            <InputLabel>Propriétaire</InputLabel>
            <Controller
              name="ownerId"
              control={control} as={UserSelect}
              label="Propriétaire"
            />
            { errors.ownerId && (
              <FormHelperText>{ errors.ownerId.message }</FormHelperText>
            ) }
          </FormControl>
        </GridItem>
      </Grid>
      <Zoom in>
        <Fab
          className={styles.save} color="primary"
          type="submit" disabled={!formState.dirty}
        >
          <SaveIcon />
        </Fab>
      </Zoom>
    </form>
  );
}

export default DaemonDetails;
