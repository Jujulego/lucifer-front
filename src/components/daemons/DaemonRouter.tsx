import React from 'react';
import { RouteChildrenProps } from 'react-router';

import { PLvl } from 'data/permission';

import { useDaemon } from 'store/daemons/hooks';

import OverrideAccess from 'components/permissions/OverrideAccess';

import DaemonPage from './DaemonPage';

// Types
export type DaemonRouterProps = RouteChildrenProps<{ id: string }>;

// Component
const DaemonRouter = (props: DaemonRouterProps) => {
  // Props
  const id = props.match!.params.id;

  // Daemons
  const daemon = useDaemon(id);

  // Render
  if (!daemon) return null;

  return (
    <OverrideAccess name="daemons" level={PLvl.READ | PLvl.UPDATE} forUser={daemon.user}>
      <DaemonPage id={id} />
    </OverrideAccess>
  )
};

export default DaemonRouter;
