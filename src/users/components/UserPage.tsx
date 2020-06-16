import React, { useState } from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Fade, Paper, Tab, Tabs } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import { ToolbarAction } from 'basics/components';

import { useDaemonsArray } from 'daemons/daemons.hooks';
import DaemonTable from 'daemons/components/DaemonTable';
import AddDaemonDialog from 'daemons/components/AddDaemonDialog';

import { useUser } from '../users.hooks';
import UserDetailsTab from './UserDetailsTab';
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

  // State
  const [addingDaemon, setAddingDaemon] = useState(false);

  // API
  const { user, loading, reload, put, update } = useUser(id);
  const { create: createDaemon } = useDaemonsArray(user?.daemons,
    (up) => update(old => ({ ...old!, daemons: up(old?.daemons) }))
  );

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
        onUpdate={put}
      />
      { (page === 'daemons') && (
        <DaemonTable daemons={user?.daemons || []} defaultOwner={user} />
      ) }
      <AddDaemonDialog
        open={addingDaemon} owner={user}
        onClose={() => setAddingDaemon(false)}
        onAdd={createDaemon}
      />
    </>
  );
};

export default UserPage;
