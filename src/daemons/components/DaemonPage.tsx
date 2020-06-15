import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import { useDaemon } from '../daemons.hooks';
import DaemonHeader from './DaemonHeader';
import DaemonDetailsTab from './DaemonDetailsTab';

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
  const { daemon, loading, reload, update } = useDaemon(id);

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
      <DaemonDetailsTab show daemon={daemon} onUpdate={update} />
    </>
  );
};

export default DaemonPage;
