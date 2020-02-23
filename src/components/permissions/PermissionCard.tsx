import React from 'react';

import {
  Card, CardProps, CardHeader,
  Divider,
  List, ListItem, ListItemText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';

import Permission, { PermissionHolder } from 'data/permission';

import { ToolbarAction } from 'components/basics';

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
        { holder.permissions.map((perm: Permission) => (
          <>
            <Divider />
            <ListItem key={perm._id} button>
              <ListItemText>{ perm.name }</ListItemText>
            </ListItem>
          </>
        )) }
      </List>
    </Card>
  );
};

export default PermissionCard;