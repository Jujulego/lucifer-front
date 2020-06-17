import React from 'react';

import { useDaemonConfigAPI } from '../config.hooks';

// Types
export interface DaemonConfigTabProps {
  daemonId: string;
}

// Component
const DaemonConfigTab = (props: DaemonConfigTabProps) => {
  const { daemonId } = props;

  // API
  const { data: config } = useDaemonConfigAPI.get(daemonId);

  // Render
  return (
    <>{ config?.id || "nothing !" }</>
  )
};

export default DaemonConfigTab;
