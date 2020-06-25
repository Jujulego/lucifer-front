import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';

import AllDaemonTable from '../containers/AllDaemonTable';
import DaemonPage from './DaemonPage';

// Component
const DaemonRouter = () => {
  // Router
  const { path } = useRouteMatch();

  // Render
  return (
    <Switch>
      <Route path={[`${path}/:id/:page`, `${path}/:id`]} component={DaemonPage} />
      <Route path={path} component={AllDaemonTable} />
    </Switch>
  );
};

export default DaemonRouter;
