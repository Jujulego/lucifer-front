import { SubDocument } from './document';

// Enums
export type PermissionName = "users";
export enum PermissionLevel {
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
  name: PermissionName;
  level: PermissionLevel;
}

// Types
export interface PermissionHolder {
  admin: boolean;
  readonly permissions: Permission[];
}

// Utils
export function isAllowed(holder: PermissionHolder, name: PermissionName, level: PermissionLevel): boolean {
  // Admins always pass
  if (holder.admin) return true;

  // Find permission
  const permission = holder.permissions.find(perm => perm.name === name);
  if (!permission) return false;

  // Check level
  return (permission.level & level) === level;
}

export default Permission;