import React from 'react';
import {
  Redirect, Route, RouteProps,
  useLocation
} from 'react-router';

import { useToken } from '../auth.hooks';

// Types
export type PrivateRouteProps = RouteProps;

// Component
const PrivateRoute = (props: PrivateRouteProps) => {
  // Router
  const location = useLocation();

  // Auth
  const token = useToken();

  // Render
  if (!token) {
    return <Redirect to={{ pathname: "/login", state: { from: location }}} />;
  }

  return <Route {...props} />;
};

export default PrivateRoute;
