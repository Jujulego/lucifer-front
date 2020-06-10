import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';

import UserPage from './UserPage';
import UserTable from './UserTable';

// Components
const UserRouter = () => {
  // Router
  const { path } = useRouteMatch();

  // Render
  return (
    <Switch>
      <Route path={[`${path}/:id/:page`, `${path}/:id`]} component={UserPage} />
      <Route path={path} exact component={UserTable} />
    </Switch>
  );
};

export default UserRouter;
