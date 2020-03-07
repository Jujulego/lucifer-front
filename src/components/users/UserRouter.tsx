import React from 'react';
import { Route, RouteChildrenProps, Switch } from 'react-router';

import { PLvl } from 'data/permission';

import UserDaemonTable from 'containers/daemons/UserDaemonTable';
import OverrideAccess from 'components/permissions/OverrideAccess';

import UserPage from './UserPage';

// Types
export type UserRouterProps = RouteChildrenProps<{ id: string }>;

// Component
const UserRouter = (props: UserRouterProps) => {
  // Props
  const path = props.match!.path;
  const id = props.match!.params.id;

  // Render
  return (
    <OverrideAccess name="users" level={PLvl.READ | PLvl.UPDATE} forUser={id}>
      <Switch>
        <Route path={`${path}/daemons`}>
          <UserDaemonTable user={id} />
        </Route>
        <Route>
          <UserPage id={id} />
        </Route>
      </Switch>
    </OverrideAccess>
  );
};

export default UserRouter;
