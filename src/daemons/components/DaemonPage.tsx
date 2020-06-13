import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import useAPI from 'basics/api.hooks';

import { Daemon } from '../models/daemon';
import DaemonHeader from './DaemonHeader';

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
  const { data: daemon, reload } = useAPI.get<Daemon>(`/api/daemons/${id}`);

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
      { daemon.name || daemon.id }
    </>
  );
};

export default DaemonPage;
