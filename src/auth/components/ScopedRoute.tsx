import React, { ReactNode } from 'react';
import { Route, RouteProps } from 'react-router';

import { AuthUser } from '../models/user';
import ScopeGate from './ScopeGate';

// Types
export type AllowRouteCallback = (user: AuthUser | null, params?: any) => boolean;

export type ScopedRouteProps = Omit<RouteProps, 'render' | 'component' | 'children'> & {
  scope: string;
  allow?: AllowRouteCallback;
  children: ReactNode
}

// Component
const ScopedRoute = (props: ScopedRouteProps) => {
  const { scope, allow, children, ...route } = props;

  // Render
  return (
    <Route {...route}>
      { ({ match }) => (
        <ScopeGate scope={scope} allow={allow && (user => allow(user, match?.params))}>
          { children }
        </ScopeGate>
      ) }
    </Route>
  );
};

export default ScopedRoute;
