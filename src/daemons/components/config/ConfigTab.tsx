import React from 'react';

import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CreateConfig, DaemonConfig } from '../../models/config';
import AddConfig from './AddConfig';

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
  loading: boolean;

  onCreate: (data: CreateConfig) => Promise<any>
}

// Component
const ConfigTab = (props: DaemonConfigTabProps) => {
  const {
    daemonId,
    config, loading, onCreate
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
      <>{ config?.id }</>
      <Backdrop className={styles.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default ConfigTab;
