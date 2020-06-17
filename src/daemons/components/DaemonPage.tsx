import React from 'react';
import { useParams, useRouteMatch } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';

import { Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useDaemon } from '../daemons.hooks';
import DaemonHeader from './DaemonHeader';
import DaemonDetailsTab from './DaemonDetailsTab';
import DaemonDependenciesTab from './DaemonDependenciesTab';
import DaemonConfigTab from 'daemons/components/DaemonConfigTab';

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

// Styles
const useStyles = makeStyles(({ zIndex }) => ({
  paper: {
    position: 'relative',
    zIndex: zIndex.drawer - 1
  }
}));

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
  const styles = useStyles();

  return (
    <>
      <Paper square className={styles.paper}>
        <DaemonHeader daemon={daemon} loading={loading} onReload={reload} />
        <Tabs variant="fullWidth" value={page} onChange={() => {}}>
          <LinkTab value="details" label="Détails" />
          <LinkTab value="dependencies" label="Dépendances" />
          <LinkTab value="config" label="Configuration" />
        </Tabs>
      </Paper>
      <DaemonDetailsTab
        daemon={daemon} show={page === 'details'}
        onUpdate={update}
      />
      { (page === 'dependencies' && daemon) && (
        <DaemonDependenciesTab daemon={daemon} onUpdate={update} />
      ) }
      { (page === 'config') && (
        <DaemonConfigTab daemonId={id} />
      ) }
    </>
  );
};

export default DaemonPage;
