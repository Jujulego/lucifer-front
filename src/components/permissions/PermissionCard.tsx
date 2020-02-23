import React, { Fragment } from 'react';

import {
  Card, CardHeader, CardProps,
  Divider, List
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RefreshIcon from '@material-ui/icons/Refresh';

import Permission, { PermissionHolder, PermissionLevel as Lvl } from 'data/permission';

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
          <>
            <Divider />
            <PermissionItem permission={{ _id: "",  name: "admin", level: Lvl.ALL }} />
          </>
        ) }
        { holder.permissions.map((perm: Permission) => (
          <Fragment key={perm._id}>
            <Divider />
            <PermissionItem permission={perm} />
          </Fragment>
        )) }
      </List>
    </Card>
  );
};

export default PermissionCard;