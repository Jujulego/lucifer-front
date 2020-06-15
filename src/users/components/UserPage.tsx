import React, { useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Fade, Paper, Tab, Tabs } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import useAPI from 'basics/api.hooks';

import DaemonTable from 'daemons/components/DaemonTable';
import AddDaemonDialog from 'daemons/components/AddDaemonDialog';

import { UpdateUser, User } from '../models/user';
import UserDetailsTab from './UserDetailsTab';
import UserHeader from './UserHeader';
import { CreateDaemon } from 'daemons/models/daemon';
import { useDaemonsAPI } from 'daemons/daemons.hooks';
import { ToolbarAction } from 'basics/components';

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

  // State
  const [addingDaemon, setAddingDaemon] = useState(false);

  // API
  const { data: user, loading, reload, update } = useAPI.get<User>(`/api/users/${id}`);
  const { send: put } = useAPI.put<UpdateUser, User>(`/api/users/${id}`);
  const { send: createDaemon } = useDaemonsAPI.create();

  // Callbacks
  const handleUpdate = async (data: UpdateUser) => {
    const usr = await put(data);
    update(usr);
  }

  const handleAddDaemon = async (data: CreateDaemon) => {
    const dmn = await createDaemon(data);
    update(old => ({ ...old!, daemons: old!.daemons ? [...old!.daemons, dmn] : [dmn] }));
  }

  // Render
  return (
    <>
      <Paper square>
        <UserHeader
          user={user} loading={loading}
          onReload={reload}

          actions={(
            <Fade in={(page === 'daemons')}>
              <ToolbarAction tooltip="Créer un daemon" onClick={() => setAddingDaemon(true)}>
                <AddIcon />
              </ToolbarAction>
            </Fade>
          )}
        />
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
      <AddDaemonDialog
        open={addingDaemon} owner={user}
        onClose={() => setAddingDaemon(false)}
        onAdd={handleAddDaemon}
      />
    </>
  );
};

export default UserPage;
