import React, { ReactElement } from 'react';
import { capitalize } from 'lodash';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import { PermissionLevel as Lvl, PermissionName } from 'data/permission';

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
const OPTIONS: { [name in PermissionName | "admin"]: PermissionOptions } = {
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

export const buildLevel = (level: DecomposedLevel): Lvl => (
  (level.create ? Lvl.CREATE : Lvl.NONE) |
  (level.read   ? Lvl.READ   : Lvl.NONE) |
  (level.update ? Lvl.UPDATE : Lvl.NONE) |
  (level.delete ? Lvl.DELETE : Lvl.NONE)
);

export const decomposeLevel = (level: Lvl): DecomposedLevel => ({
  create: (level & Lvl.CREATE) === Lvl.CREATE,
  read:   (level & Lvl.READ)   === Lvl.READ,
  update: (level & Lvl.UPDATE) === Lvl.UPDATE,
  delete: (level & Lvl.DELETE) === Lvl.DELETE,
});