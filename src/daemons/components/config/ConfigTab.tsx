import React from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CreateConfig, DaemonConfig } from '../../models/config';
import AddConfig from './AddConfig';
import DockerConfigTab from './DockerConfigTab';

// Styles
const useStyles = makeStyles(({ zIndex }) => ({
  root: {
    position: 'relative',
    flex: 1
  },
  backdrop: {
    position: 'absolute',
    zIndex: zIndex.drawer - 2
  }
}));

// Types
export interface DaemonConfigTabProps {
  daemonId: string;
  config: DaemonConfig | null;
  loading: boolean; show?: boolean;

  onCreate: (data: CreateConfig) => Promise<any>
}

// Component
const ConfigTab = (props: DaemonConfigTabProps) => {
  const {
    daemonId,
    config, loading, show = false,
    onCreate
  } = props;

  // Render
  const styles = useStyles();

  if (!config && !loading) {
    return (
      <AddConfig daemonId={daemonId} onCreate={onCreate} />
    );
  }

  return (
    <div className={styles.root}>
      <Backdrop className={styles.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      { (config?.type === 'docker') && (
        <DockerConfigTab config={config} show={show} />
      ) }
    </div>
  );
};

export default ConfigTab;
