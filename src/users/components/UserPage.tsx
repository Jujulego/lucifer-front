import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import apiHooks from 'basics/api.hooks';

import DaemonTable from 'daemons/components/DaemonTable';

import { User } from '../models/user';

import UserDetails from './UserDetails';
import UserHeader from 'users/components/UserHeader';

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
  const { data: user, reload } = apiHooks.get<User>(`/api/users/${id}`);

  // Render
  if (!user) return null;

  return (
    <>
      <Paper square>
        <UserHeader user={user} onReload={reload} />
        <Tabs variant="fullWidth" value={page} onChange={() => {}}>
          <LinkTab value="details" label="Détails" />
          <LinkTab value="daemons" label="Daemons" />
        </Tabs>
      </Paper>
      { (page === 'daemons') && (
        <DaemonTable daemons={user.daemons || []} defaultOwner={user} />
      ) }
      { (page === 'details') && (
        <UserDetails user={user} />
      ) }
    </>
  );
};

export default UserPage;
