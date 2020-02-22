import React, { ReactNode, useContext, useMemo } from 'react';
import { Redirect, useLocation } from 'react-router';

import AccessContext from 'contexts/AccessContext';
import { PermissionName, PermissionLevel } from 'data/permission';
import { usePermision } from 'store/users/hooks';

// Types
export interface RestrictedAccessProps {
  name: PermissionName, level?: PermissionLevel,
  redirect?: boolean,
  children: ReactNode
}

// Component
const RestrictedAccess = (props: RestrictedAccessProps) => {
  // Props
  const {
    name, level = PermissionLevel.READ,
    redirect = false,
    children
  } = props;

  // Router
  const location = useLocation();

  // Context
  const { overrides } = useContext(AccessContext);

  // Memo
  const override = useMemo(
    () => overrides.some(o => (o.name === name) && ((o.level & level) !== 0)),
    [overrides, name, level]
  );

  // Render
  if (!usePermision(name, level) && !override) {
    if (redirect) {
      return <Redirect to={{ pathname: "/", state: { from: location }}} />;
    }

    return null;
  }

  return <>{ children }</>
};

export default RestrictedAccess;
export { PermissionLevel as Lvl };