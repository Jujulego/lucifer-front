import React, { ElementType } from 'react';
import { omit } from 'lodash';

import {
  ListItem, ListItemText, ListItemIcon,
  Typography,
  ListItemClassKey, ListItemTypeMap, ExtendButtonBaseTypeMap
} from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';
import { makeStyles } from '@material-ui/core/styles';

import Permission from 'data/permission';
import { permissionOption } from 'utils/permissions';

import PermissionLevel from './PermissionLevel';

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

// Styles
const useStyles = makeStyles({
  text: {
    display: 'flex'
  },
  name: {
    flexGrow: 1
  }
});

// Component
const PermissionItem = <D extends ElementType = PermissionItemTypeMap['defaultComponent']> (props: { component?: D } & PermissionItemProps<D>) => {
  // Props
  const perm = ('admin' in props) ? null : props.permission;
  const name = perm?.name || 'admin';
  const item = omit(props, ['admin', 'permission']);

  // Render
  const styles = useStyles();
  const opts = permissionOption(name);

  return (
    <ListItem {...item} button>
      { opts.icon && (
        <ListItemIcon>{ opts.icon }</ListItemIcon>
      ) }
      <ListItemText classes={{ root: styles.text }} inset={!opts.icon} disableTypography>
        <Typography classes={{ root: styles.name }} variant="body1">{ opts.name }</Typography>
        { perm && <PermissionLevel permission={perm} /> }
      </ListItemText>
    </ListItem>
  )
};

export default PermissionItem;