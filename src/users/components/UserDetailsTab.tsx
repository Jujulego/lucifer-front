import React, { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { CircularProgress, Fab, Grid, TextField, Tooltip, Typography, Zoom } from '@material-ui/core';
import { Check as CheckIcon, Save as SaveIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { LabelledText, RelativeDate } from 'basics/components'
import { useNeedScope } from 'auth/auth.hooks';

import { UpdateUser, User } from '../models/user';

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
)

// Types
export interface UserDetailsProps {
  user?: User;
  show?: boolean;
  onUpdate: (update: UpdateUser) => void;
}

// Component
const UserDetailsTab = (props: UserDetailsProps) => {
  const {
    user, show = false,
    onUpdate
  } = props;

  // Auth
  const canUpdate = useNeedScope('update:users', usr => usr?.id === user?.id);

  // Form
  const { errors, register, reset, handleSubmit, formState } = useForm<UpdateUser>();

  // Effects
  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email
      });
    }
  }, [reset, user]);

  // Render
  const styles = useStyles();

  return (
    <form
      className={clsx(styles.root, { [styles.hidden]: !show })}
      onSubmit={canUpdate ? handleSubmit(onUpdate) : undefined}
    >
      { (show && user) && (
        <Grid container spacing={2}>
          <GridItem>
            { canUpdate ? (
              <TextField
                label="Nom" variant="outlined" fullWidth
                name="name" inputRef={register}
                error={!!errors.name} helperText={errors.name?.message}
              />
            ) : (
              <LabelledText label="Nom">
                <Typography>{ user.name }</Typography>
              </LabelledText>
            ) }
          </GridItem>
          <GridItem>
            { canUpdate ? (
              <TextField
                label="Email" variant="outlined" fullWidth
                name="email" inputRef={register}
                error={!!errors.email} helperText={errors.email?.message}
                InputProps={{
                  endAdornment: user.emailVerified && (
                    <Tooltip title="Vérifié">
                      <CheckIcon color="primary" />
                    </Tooltip>
                  )
                }}
              />
            ) : (
              <LabelledText label="Email"
                endAdornment={
                  user.emailVerified && (
                    <Tooltip title="Vérifié">
                      <CheckIcon color="primary" />
                    </Tooltip>
                  )
                }
              >
                <Typography>{ user.email }</Typography>
              </LabelledText>
            ) }
          </GridItem>
          <GridItem>
            <LabelledText label="Dernière connexion">
              <RelativeDate mode="from" date={ user.lastLogin } />
            </LabelledText>
          </GridItem>
        </Grid>
      ) }
      { canUpdate && (
        <Zoom in={show}>
          <Fab
            className={styles.save} color="primary"
            type="submit" disabled={!formState.dirty || formState.isSubmitting}
          >
            <SaveIcon />
          </Fab>
        </Zoom>
      ) }
      { formState.isSubmitting && (
        <CircularProgress className={styles.save} size={56} />
      ) }
    </form>
  );
};

export default UserDetailsTab;
