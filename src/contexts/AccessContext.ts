import { createContext } from 'react';

import { PName, PLvl } from 'data/permission';

// Types
export interface PermissionOverride {
  name: PName;
  level: PLvl;
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