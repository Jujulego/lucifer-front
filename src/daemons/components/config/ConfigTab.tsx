import React from 'react';

import { useDaemonConfig } from 'daemons/config.hooks';
import AddConfig from 'daemons/components/config/AddConfig';

// Types
export interface DaemonConfigTabProps {
  daemonId: string;
}

// Component
const ConfigTab = (props: DaemonConfigTabProps) => {
  const { daemonId } = props;

  // API
  const { config, create } = useDaemonConfig(daemonId);

  // Render
  if (!config) {
    return (
      <AddConfig daemonId={daemonId} onCreate={create} />
    );
  }

  return (
    <>{ config?.id }</>
  );
};

export default ConfigTab;
