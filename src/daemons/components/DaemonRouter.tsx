import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';

import AllDaemonTable from '../containers/AllDaemonTable';

// Component
const DaemonRouter = () => {
  // Router
  const { path } = useRouteMatch();

  // Render
  return (
    <Switch>
      <Route path={path} component={AllDaemonTable} />
    </Switch>
  );
};

export default DaemonRouter;
