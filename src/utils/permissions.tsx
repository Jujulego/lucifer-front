import React, { ReactElement } from 'react';
import { capitalize } from 'lodash';

import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import { PermissionName } from 'data/permission';

// Types
export interface PermissionOptions {
  name: string, icon?: ReactElement
}

// Constants
const OPTIONS: { [name: string]: PermissionOptions } = {
  admin: { name: 'Administrateur', icon: <SettingsIcon /> },
  users: { name: 'Utilisateurs',   icon: <PeopleIcon /> }
};

// Utils
export function permissionOption(name: PermissionName): PermissionOptions {
  const { [name]: opts } = OPTIONS;

  if (opts) return opts;
  return { name: capitalize(name) };
}