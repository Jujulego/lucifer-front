import React, { ReactNode, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

import { CircularProgress, Fab, Grid, TextField, Zoom } from '@material-ui/core';
import { Save as SaveIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { DockerConfig, UpdateDockerConfig } from '../../models/docker.config';

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
export interface DockerConfigProps {
  config: DockerConfig;
  show?: boolean;
}

// Component
const DockerConfigTab = (props: DockerConfigProps) => {
  const { config, show = false } = props;

  // Form
  const { errors, register, reset, formState } = useForm<UpdateDockerConfig>();

  // Effects
  useEffect(() => {
    const init: UpdateDockerConfig = {};

    if (config.image) init.image = config.image;

    reset(init);
  }, [reset, config]);

  // Render
  const styles = useStyles();

  return (
    <form className={clsx(styles.root, { [styles.hidden]: !show })}>
      { show && (
        <Grid container>
          <GridItem>
            <TextField
              name="image" inputRef={register}
              label="Image" variant="outlined" fullWidth
              error={!!errors.image} helperText={errors.image?.message}
            />
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
  );
};

export default DockerConfigTab;
