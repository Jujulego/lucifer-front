import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import useAPI from 'utils/hooks/useAPI';

import { Daemon, UpdateDaemon } from '../models/daemon';
import DaemonHeader from './DaemonHeader';
import DaemonDetails from './DaemonDetails';

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
interface DaemonParams {
  id: string;
  page: string;
}

const DaemonPage = () => {
  // Router
  const { id, page = 'details' } = useParams<DaemonParams>();

  // API
  const { data: daemon, reload, update } = useAPI.get<Daemon>(`/api/daemons/${id}`);
  const { send: put } = useAPI.put<UpdateDaemon, Daemon>(`/api/daemons/${id}`);

  // Callbacks
  const handleUpdate = async (data: UpdateDaemon) => {
    const dmn = await put(data);

    if (dmn) {
      update(dmn);
    }
  }

  // Render
  if (!daemon) return null;

  return (
    <>
      <Paper square>
        <DaemonHeader daemon={daemon} onReload={reload} />
        <Tabs variant="fullWidth" value={page} onChange={() => {}}>
          <LinkTab value="details" label="Détails" />
          <Tab value="dependencies" label="Dépendances" disabled />
        </Tabs>
      </Paper>
      <DaemonDetails daemon={daemon} onUpdate={handleUpdate} />
    </>
  );
};

export default DaemonPage;
