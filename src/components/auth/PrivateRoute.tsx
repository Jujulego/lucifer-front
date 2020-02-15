import React from 'react';
import { useSelector } from 'react-redux';
import {
  Redirect, Route, RouteProps,
  useLocation
} from 'react-router';

import { AppState } from 'store';

// Types
export type PrivateRouteProps = RouteProps;

// Component
const PrivateRoute = (props: PrivateRouteProps) => {
  // Router
  const location = useLocation();

  // Redux
  const isLoggedIn = useSelector((state: AppState) => state.auth.token != null);

  // Render
  if (!isLoggedIn) {
    return <Redirect to={{ pathname: "/login", state: { from: location }}} />;
  }

  return <Route {...props} />
};

export default PrivateRoute;