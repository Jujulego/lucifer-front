import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, IconButton, Link, Typography } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { Daemon } from '../models/daemon';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    padding: spacing(3),

    [breakpoints.down('sm')]: {
      padding: spacing(2),
    }
  },
  action: {
    alignSelf: 'flex-start',

    '& > button': {
      marginTop:   -spacing(1),
      marginRight: -spacing(1)
    }
  }
}));

// Types
export interface DaemonHeaderProps {
  daemon: Daemon;
  onReload: () => void;
}

// Component
const DaemonHeader = (props: DaemonHeaderProps) => {
  const { daemon, onReload } = props;

  // Render
  const styles = useStyles();

  return (
    <Grid className={styles.root} container alignItems="center">
      <Grid item xs zeroMinWidth>
        <Typography variant="h5" noWrap>Daemon { daemon.name || daemon.id }</Typography>
        <Typography variant="subtitle1" color="textSecondary">
          { daemon.owner && (
            <Link component={RouterLink} to={`/users/${daemon.owner.id}/daemons`} color="inherit">
              { daemon.owner.name }
            </Link>
          ) }
        </Typography>
      </Grid>
      <Grid className={styles.action} item xs="auto">
        <IconButton onClick={onReload}>
          <RefreshIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default DaemonHeader;
