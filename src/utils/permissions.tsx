import React, { ReactElement } from 'react';
import { capitalize } from 'lodash';

import LockOpenIcon from '@material-ui/icons/LockOpen';
import PeopleIcon from '@material-ui/icons/People';

import { PLvl, PName } from 'data/permission';

// Types
export type LevelName = "create" | "read" | "update" | "delete";
export const LEVELS: LevelName[] = ["create", "read", "update", "delete"];

export type DecomposedLevel = { [name in LevelName]: boolean };
export type LevelOptions = { [name in LevelName]?: string | null };

export interface PermissionOptions {
  name: string, icon?: ReactElement, level?: LevelOptions
}

// Constants
const OPTIONS: { [name in PName]: PermissionOptions } = {
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