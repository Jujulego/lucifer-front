import React, { ReactNode } from 'react';
import { Redirect } from 'react-router';

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

  // Render
  const result = usePermision(name, level);
  if (!result) {
    if (redirect && result != null) {
      return <Redirect to="/forbidden" />;
    }

    return null;
  }

  return <>{ children }</>
};

export default RestrictedAccess;
export { PermissionLevel as Lvl };