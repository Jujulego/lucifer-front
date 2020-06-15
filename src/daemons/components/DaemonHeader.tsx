import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Grid, Link, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import { RefreshButton } from 'basics/components';

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
  daemon?: Daemon;
  loading: boolean;
  onReload: () => void;
}

// Component
const DaemonHeader = (props: DaemonHeaderProps) => {
  const { daemon, loading, onReload } = props;

  // Render
  const styles = useStyles();

  return (
    <Grid className={styles.root} container alignItems="center">
      <Grid item xs zeroMinWidth>
        <Typography variant="h5" noWrap>
          { daemon ? `Daemon ${ daemon.name || daemon.id }` : <Skeleton width="60%" /> }
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          { daemon ?
            (daemon.owner && (
              <Link component={RouterLink} to={`/users/${daemon.owner.id}/daemons`} color="inherit">
                { daemon.owner.name }
              </Link>
            )
          ) : (
            <Skeleton width="40%" />
          ) }
        </Typography>
      </Grid>
      <Grid className={styles.action} item xs="auto">
        <RefreshButton refreshing={loading} onClick={onReload} />
      </Grid>
    </Grid>
  );
};

export default DaemonHeader;
