import { createContext } from 'react';

import { PermissionName, PermissionLevel } from 'data/permission';

// Types
export interface PermissionOverride {
  name: PermissionName;
  level: PermissionLevel;
}

export interface AccessContextProps {
  overrides: PermissionOverride[]
}

// Default values
const accessDefaults: AccessContextProps = {
  overrides: []
};

// Context
const AccessContext = createContext(accessDefaults);

export default AccessContext;