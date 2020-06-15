import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import useAPI from 'basics/api.hooks';

import { Daemon, UpdateDaemon } from '../models/daemon';
import DaemonHeader from './DaemonHeader';
import DaemonDetailsTab from 'daemons/components/DaemonDetailsTab';

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
  const { data: daemon, loading, reload, update } = useAPI.get<Daemon>(`/api/daemons/${id}`);
  const { send: put } = useAPI.put<UpdateDaemon, Daemon>(`/api/daemons/${id}`);

  // Callbacks
  const handleUpdate = async (data: UpdateDaemon) => {
    const dmn = await put(data);
    update(dmn);
  }

  // Render
  return (
    <>
      <Paper square>
        <DaemonHeader daemon={daemon} loading={loading} onReload={reload} />
        <Tabs variant="fullWidth" value={page} onChange={() => {}}>
          <LinkTab value="details" label="Détails" />
          <Tab value="dependencies" label="Dépendances" disabled />
        </Tabs>
      </Paper>
      <DaemonDetailsTab show daemon={daemon} onUpdate={handleUpdate} />
    </>
  );
};

export default DaemonPage;
