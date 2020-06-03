import React from 'react';
import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Avatar, Grid, IconButton, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import useAPI from 'utils/hooks/useAPI';
import { initials } from 'utils/string';

import { User } from '../models/user';

import UserDetails from './UserDetails';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  header: {
    margin: -spacing(3),
    marginBottom: spacing(3),

    [breakpoints.down('sm')]: {
      margin: -spacing(1),
      marginBottom: spacing(1),
    }
  },
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
const LinkTab = (props: { value: string, label: string }) => {
  const { url } = useRouteMatch();

  return (
    <Tab component={RouterLink} to={`${url}/${props.value}`} {...props} />
  );
};

// Component
const UserPage = () => {
  // Router
  const { path } = useRouteMatch();
  const { id, page = 'details' } = useParams();

  // API
  const { data: user, reload } = useAPI.get<User>(`/api/users/${id}`);

  // Render
  const styles = useStyles();

  if (!user) return null;

  return (
    <>
      <Paper className={styles.header} square>
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
          <Tab value="daemons" label="Daemons" disabled />
        </Tabs>
      </Paper>
      <Switch>
        <Route path={[`${path}`, `${path}/details`]}><UserDetails user={user} /></Route>
      </Switch>
    </>
  );
};

export default UserPage;
