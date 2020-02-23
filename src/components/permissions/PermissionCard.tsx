import React from 'react';

import {
  Card, CardHeader, CardProps,
  List
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';

import { PermissionHolder } from 'data/permission';

import { ToolbarAction } from 'components/basics';

import PermissionItem from 'components/permissions/PermissionItem';

// Types
export type PermissionTableProps = CardProps & {
  holder: PermissionHolder,
  onRefresh?: () => void,
}

// Styles
const useStyles = makeStyles({
  action: {
    marginTop: -12,
    marginBottom: -12
  }
});

// Component
const PermissionCard = (props: PermissionTableProps) => {
  // Props
  const {
    holder, onRefresh,
    ...card
  } = props;

  // Render
  const styles = useStyles();

  return (
    <Card {...card}>
      <CardHeader
        title="Permissions"
        classes={{ action: styles.action }}
        action={
          onRefresh && (
            <ToolbarAction tooltip="Rafraîchir" onClick={onRefresh}>
              <RefreshIcon />
            </ToolbarAction>
          )
        }
      />
      <List>
        { holder.admin && (
          <PermissionItem admin divider />
        ) }
        { holder.permissions.map(perm => (
          <PermissionItem key={perm._id} permission={perm} divider />
        )) }
      </List>
    </Card>
  );
};

export default PermissionCard;