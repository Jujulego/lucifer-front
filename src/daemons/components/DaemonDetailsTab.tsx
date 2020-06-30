import React, { ReactNode, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import clsx from 'clsx';

import {
  CircularProgress,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  TextField,
  Zoom
} from '@material-ui/core';
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
  hidden: {
    padding: 0
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
  daemon?: Daemon;
  show?: boolean;
  onUpdate: (update: UpdateDaemon) => Promise<any>;
}

// Component
const DaemonDetailsTab = (props: DaemonDetailsProps) => {
  const {
    daemon, show = false,
    onUpdate
  } = props;

  // Form
  const { errors, control, register, reset, handleSubmit, formState } = useForm<UpdateDaemon>();

  // Effects
  useEffect(() => {
    reset({
      name: daemon?.name,
      ownerId: daemon?.owner?.id
    });
  }, [reset, daemon]);

  // Render
  const styles = useStyles();

  return (
    <form className={clsx(styles.root, { [styles.hidden]: !show })} onSubmit={handleSubmit(onUpdate)}>
      { (show && daemon) && (
        <Grid container spacing={2}>
          <GridItem>
            <TextField
              name="name" inputRef={register}
              label="Nom" variant="outlined" fullWidth
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
      ) }
      <Zoom in={show}>
        <Fab
          className={styles.save} color="primary"
          type="submit" disabled={!formState.dirty || formState.isSubmitting}
        >
          <SaveIcon />
        </Fab>
      </Zoom>
      { formState.isSubmitting && (
        <CircularProgress className={styles.save} size={56} />
      ) }
    </form>
  )
};

export default DaemonDetailsTab;
