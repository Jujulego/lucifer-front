import React from 'react';

import { ListItem, ListItemText, ListItemIcon } from '@material-ui/core';

import Permission from 'data/permission';
import { permissionOption } from 'utils/permissions';

// Types
export interface PermissionItemProps {
  permission: Permission
}

// Component
const PermissionItem = (props: PermissionItemProps) => {
  // Props
  const { permission } = props;

  // Render
  const opts = permissionOption(permission.name);

  return (
    <ListItem button>
      { opts.icon && (
        <ListItemIcon>{ opts.icon }</ListItemIcon>
      ) }
      <ListItemText
        inset={!opts.icon}
        primary={ opts.name }
      />
    </ListItem>
  )
};

export default PermissionItem;