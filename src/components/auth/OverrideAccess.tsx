import React, { ReactNode, useContext } from 'react';

import AccessContext, { PermissionOverride } from 'contexts/AccessContext';

// Types
type BaseOverrideAccessProps = PermissionOverride | { overrides: PermissionOverride[] };
export type OverrideAccessProps = BaseOverrideAccessProps & {
  children: ReactNode
}

// Components
const OverrideAccess = (props: OverrideAccessProps) => {
  // Props
  const { children } = props;
  const overrides: PermissionOverride[] = [];

  if ('overrides' in props) {
    overrides.push(...props.overrides);
  } else {
    overrides.push(props);
  }

  // Context
  const ctx = useContext(AccessContext);
  overrides.push(...ctx.overrides);

  // Render
  return (
    <AccessContext.Provider value={{ overrides }}>
      { children }
    </AccessContext.Provider>
  );
};

export default OverrideAccess;