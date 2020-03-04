import React, { ReactNode, useContext } from 'react';

import AccessContext, { PermissionOverride } from 'contexts/AccessContext';
import { useLoggedUser } from 'store/users/hooks';

// Types
type BaseOverrideAccessProps = PermissionOverride | { overrides: PermissionOverride[] };
export type OverrideAccessProps = BaseOverrideAccessProps & {
  children: ReactNode;
  forUser: string;
}

// Components
const OverrideAccess = (props: OverrideAccessProps) => {
  // Props
  const { children, forUser } = props;
  const overrides: PermissionOverride[] = [];

  // Users
  const user = useLoggedUser();

  // Context
  const ctx = useContext(AccessContext);

  // Render
  if (!user) return null;
  if (user._id === forUser) {
    if ('overrides' in props) {
      overrides.push(...props.overrides);
    } else {
      overrides.push(props);
    }
  }

  overrides.push(...ctx.overrides);

  return (
    <AccessContext.Provider value={{ overrides }}>
      { children }
    </AccessContext.Provider>
  );
};

export default OverrideAccess;
