import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import useAPI from 'utils/hooks/useAPI';

import DaemonTable from 'daemons/components/DaemonTable';

import { UpdateUser, User } from '../models/user';
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
  const { data: user, reload, update } = useAPI.get<User>(`/api/users/${id}`);
  const { send: put } = useAPI.put<UpdateUser, User>(`/api/users/${id}`);

  // Callbacks
  const handleUpdate = async (data: UpdateUser) => {
    const usr = await put(data);

    if (usr) {
      update(usr);
    }
  }

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
        <UserDetails user={user} onUpdate={handleUpdate} />
      ) }
    </>
  );
};

export default UserPage;
