import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Avatar, Grid, IconButton, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import useAPI from 'utils/hooks/useAPI';
import { initials } from 'utils/string';

import DaemonTable from 'daemons/components/DaemonTable';

import { User } from '../models/user';

import UserDetails from './UserDetails';

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

// Utils
interface LinkTabProps {
  value: string;
  label: string;
}

const LinkTab = (props: LinkTabProps) => {
  const { value } = props;
  const { url } = useRouteMatch();
  const { page } = useParams();

  return (
    <Tab {...props}
      component={RouterLink}
      to={page ? url.replace(page, value) : `${url}/${value}`}
    />
  );
};

// Component
interface UserParams {
  id: string;
  page: string;
}

const UserPage = () => {
  // Router
  const { id, page = 'details' } = useParams<UserParams>();

  // API
  const { data: user, reload } = useAPI.get<User>(`/api/users/${id}`);

  // Render
  const styles = useStyles();

  if (!user) return null;

  return (
    <>
      <Paper square>
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
            <IconButton onClick={() => reload()}>
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Tabs variant="fullWidth" value={page} onChange={() => {}}>
          <LinkTab value="details" label="Détails" />
          <LinkTab value="daemons" label="Daemons" />
        </Tabs>
      </Paper>
      { (page === 'daemons') && (
        <DaemonTable daemons={user.daemons || []} />
      ) }
      { (page === 'details') && (
        <UserDetails user={user} />
      ) }
    </>
  );
};

export default UserPage;
