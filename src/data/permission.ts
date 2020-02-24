import { SubDocument } from './document';

// Enums
export type PName = "users" | "permissions";
export const PERMISSIONS: PName[] = [
  "users", "permissions"
];

export enum PLvl {
  NONE   = 0b0000,
  CREATE = 0b1000,
  READ   = 0b0100,
  UPDATE = 0b0010,
  DELETE = 0b0001,
  ALL = CREATE | READ | UPDATE | DELETE,
}

// Interface
interface Permission extends SubDocument {
  // Attributes
  name: PName;
  level: PLvl;
}

// Types
export interface PermissionHolder {
  admin: boolean;
  readonly permissions: Permission[];
}

// Utils
export function isAllowed(holder: PermissionHolder, name: PName, level: PLvl): boolean {
  // Admins always pass
  if (holder.admin) return true;

  // Find permission
  const permission = holder.permissions.find(perm => perm.name === name);
  if (!permission) return false;

  // Check level
  return (permission.level & level) === level;
}

export default Permission;