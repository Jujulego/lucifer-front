import React, { ReactElement } from 'react';
import { capitalize } from 'lodash';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import { PLvl, PName } from 'data/permission';

// Types
export interface DecomposedLevel {
  create: boolean, read: boolean, update: boolean, delete: boolean
}

interface LevelOptions {
  create?: string | null;
  read?:   string | null;
  update?: string | null;
  delete?: string | null;
}

export interface PermissionOptions {
  name: string, icon?: ReactElement, level?: LevelOptions
}

// Constants
const OPTIONS: { [name in PName | "admin"]: PermissionOptions } = {
  admin:       { name: 'Administrateur', icon: <SettingsIcon /> },
  permissions: { name: 'Permissions',    icon: <LockOpenIcon />, level: { create: null, read: null, update: 'grant', delete: 'revoke' }},
  users:       { name: 'Utilisateurs',   icon: <PeopleIcon />   },
};

// Utils
export function permissionOption(name: keyof typeof OPTIONS): PermissionOptions {
  const { [name]: opts } = OPTIONS;

  if (opts) return opts;
  return { name: capitalize(name) };
}

export const buildLevel = (level: DecomposedLevel): PLvl => (
  (level.create ? PLvl.CREATE : PLvl.NONE) |
  (level.read   ? PLvl.READ   : PLvl.NONE) |
  (level.update ? PLvl.UPDATE : PLvl.NONE) |
  (level.delete ? PLvl.DELETE : PLvl.NONE)
);

export const decomposeLevel = (level: PLvl): DecomposedLevel => ({
  create: (level & PLvl.CREATE) === PLvl.CREATE,
  read:   (level & PLvl.READ)   === PLvl.READ,
  update: (level & PLvl.UPDATE) === PLvl.UPDATE,
  delete: (level & PLvl.DELETE) === PLvl.DELETE,
});