import React from 'react';

import { Avatar, Grid, IconButton, Typography } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { initials } from 'utils/string';

import { User } from '../models/user';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  user: {
    padding: spacing(3),

    [breakpoints.down('sm')]: {
      padding: spacing(2),
    }
  },
  username: {
    marginLeft: spacing(2)
  },
  action: {
    alignSelf: 'flex-start',

    '& > button': {
      marginTop:   -spacing(1),
      marginRight: -spacing(1)
    }
  },
  avatar: {
    height: spacing(9),
    width: spacing(9),

    [breakpoints.down('sm')]: {
      height: spacing(8),
      width: spacing(8),
    }
  }
}));

// Types
export interface UserHeaderProps {
  user: User,
  onReload: () => void;
}

// Component
const UserHeader = (props: UserHeaderProps) => {
  const { user, onReload } = props;

  // Render
  const styles = useStyles();

  return (
    <Grid className={styles.user} container alignItems="center">
      <Grid item xs="auto">
        <Avatar className={styles.avatar} alt={user.name} src={user.picture}>
          { initials(user.name) }
        </Avatar>
      </Grid>
      <Grid className={styles.username} item xs>
        <Typography variant="h5">{ user.name }</Typography>
        <Typography variant="subtitle1" color="textSecondary">{ user.email }</Typography>
      </Grid>
      <Grid className={styles.action} item xs="auto">
        <IconButton onClick={() => { onReload(); }}>
          <RefreshIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default UserHeader;
