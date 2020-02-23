import React, { ElementType } from 'react';
import { omit } from 'lodash';

import {
  ListItem, ListItemText, ListItemIcon,
  ListItemClassKey, ListItemTypeMap, ExtendButtonBaseTypeMap
} from '@material-ui/core';

import Permission from 'data/permission';
import { permissionOption } from 'utils/permissions';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

// Types
type BasePermissionItemProps = { permission: Permission } | { admin: true };

export type PermissionItemTypeMap<
  P = {}, D extends ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & BasePermissionItemProps &
    Omit<ListItemTypeMap<{}, D>['props'], 'button'>;
  defaultComponent: D,
  classKey: ListItemClassKey
}>;

export type PermissionItemProps<
  D extends ElementType = PermissionItemTypeMap['defaultComponent'], P = {}
> = OverrideProps<PermissionItemTypeMap<P, D>, D>;

// Component
const PermissionItem = <D extends ElementType = PermissionItemTypeMap['defaultComponent']> (props: { component?: D } & PermissionItemProps<D>) => {
  // Props
  const name = ('admin' in props) ? 'admin' : props.permission.name;
  const item = omit(props, ['admin', 'permission']);

  // Render
  const opts = permissionOption(name);

  return (
    <ListItem {...item} button>
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