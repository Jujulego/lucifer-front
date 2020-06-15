import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';

import { useDaemon } from '../daemons.hooks';
import DaemonHeader from './DaemonHeader';
import DaemonDetailsTab from './DaemonDetailsTab';
import DaemonTable from 'daemons/components/DaemonTable';

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
          <LinkTab value="dependencies" label="Dépendances" />
        </Tabs>
      </Paper>
      <DaemonDetailsTab
        daemon={daemon} show={page === 'details'}
        onUpdate={update}
      />
      { (page === 'dependencies') && (
        <DaemonTable daemons={daemon?.dependencies || []} />
      ) }
    </>
  );
};

export default DaemonPage;
