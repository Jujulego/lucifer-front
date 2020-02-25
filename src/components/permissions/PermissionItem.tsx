import React, { ElementType } from 'react';

import {
  ListItem, ListItemText, ListItemIcon,
  ListItemClassKey, ListItemTypeMap, ExtendButtonBaseTypeMap
} from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import Permission from 'data/permission';
import { permissionOption } from 'utils/permissions';

import PermissionLevel from './PermissionLevel';

// Types
export type PermissionItemTypeMap<
  P = {}, D extends ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & Omit<ListItemTypeMap<{}, D>['props'], 'button'> & {
    permission: Permission
  };
  defaultComponent: D,
  classKey: ListItemClassKey
}>;

export type PermissionItemProps<
  D extends ElementType = PermissionItemTypeMap['defaultComponent'], P = {}
> = OverrideProps<PermissionItemTypeMap<P, D>, D>;

// Component
const PermissionItem = <D extends ElementType = PermissionItemTypeMap['defaultComponent']> (props: { component?: D } & PermissionItemProps<D>) => {
  // Props
  const { permission: perm, ...item } = props;

  // Render
  const opts = permissionOption(perm.name);

  return (
    <ListItem {...item} button>
      { opts.icon && (
        <ListItemIcon>{ opts.icon }</ListItemIcon>
      ) }
      <ListItemText inset={!opts.icon} primary={ opts.name } />
      <PermissionLevel permission={perm} />
    </ListItem>
  )
};

export default PermissionItem;