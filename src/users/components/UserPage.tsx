import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import useAPI from 'basics/api.hooks';

import DaemonTable from 'daemons/components/DaemonTable';

import { UpdateUser, User } from '../models/user';
import UserDetailsTab from 'users/components/UserDetailsTab';
import UserHeader from './UserHeader';

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
  const { data: user, loading, reload, update } = useAPI.get<User>(`/api/users/${id}`);
  const { send: put } = useAPI.put<UpdateUser, User>(`/api/users/${id}`);

  // Callbacks
  const handleUpdate = async (data: UpdateUser) => {
    const usr = await put(data);
    update(usr);
  }

  // Render
  return (
    <>
      <Paper square>
        <UserHeader user={user} loading={loading} onReload={reload} />
        <Tabs variant="fullWidth" value={page} onChange={() => {}}>
          <LinkTab value="details" label="Détails" />
          <LinkTab value="daemons" label="Daemons" />
        </Tabs>
      </Paper>
      <UserDetailsTab
        user={user} show={page === 'details'}
        onUpdate={handleUpdate}
      />
      { (page === 'daemons') && (
        <DaemonTable daemons={user?.daemons || []} defaultOwner={user} />
      ) }
    </>
  );
};

export default UserPage;
