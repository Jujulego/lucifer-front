import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';

import DaemonTable from './DaemonTable';

// Component
const DaemonRouter = () => {
  // Router
  const { path } = useRouteMatch();

  // Render
  return (
    <Switch>
      <Route path={path} component={DaemonTable} />
    </Switch>
  );
};

export default DaemonRouter;
