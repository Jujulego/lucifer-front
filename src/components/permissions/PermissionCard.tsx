import React, { useMemo, useState } from 'react';

import {
  IconButton,
  Card, CardHeader, CardProps,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ForwardIcon from '@material-ui/icons/Forward';
import RefreshIcon from '@material-ui/icons/Refresh';
import SettingsIcon from '@material-ui/icons/Settings';

import Permission, { PermissionHolder, PName, PLvl } from 'data/permission';
import { asc, stableSort } from 'utils/sort';

import { ToolbarAction } from 'components/basics';

import AdminOnly from './AdminOnly';
import EditPermissionDialog from './EditPermissionDialog';
import RestrictedAccess from './RestrictedAccess';
import PermissionItem from './PermissionItem';

// Types
export type PermissionTableProps = CardProps & {
  holder: PermissionHolder,
  onRefresh?: () => void,
  onGrant: (name: PName, level: PLvl) => void,
  onElevate: (admin: boolean) => void,
  onRevoke: (name: PName) => void,
}

interface DialogState {
  open: boolean, permission?: Permission
}

// Styles
const useStyles = makeStyles({
  action: {
    marginBottom: -8
  },
  elevate: {
    transform: 'rotate(-90deg)'
  },
  downgrade: {
    transform: 'rotate(90deg)'
  }
});

// Component
const PermissionCard = (props: PermissionTableProps) => {
  // Props
  const {
    holder, onRefresh,
    onGrant, onElevate, onRevoke,
    ...card
  } = props;

  // State
  const [dialog, setDialog] = useState<DialogState>({ open: false });

  // Memo
  const permissions = useMemo(() =>
    stableSort(holder.permissions, (a, b) => asc(a, b, "name")),
    [holder]
  );

  // Handlers
  const handleElevate = (admin: boolean) => () => onElevate(admin);

  // Render
  const styles = useStyles();

  return (
    <>
      <Card {...card}>
        <CardHeader
          title="Permissions"
          classes={{ action: styles.action }}
          action={
            onRefresh && (
              <>
                { (!holder.admin) && (
                  <AdminOnly>
                    <ToolbarAction tooltip="Elevate" onClick={handleElevate(true)}>
                      <ForwardIcon classes={{ root: styles.elevate }} />
                    </ToolbarAction>
                  </AdminOnly>
                ) }
                <ToolbarAction tooltip="Rafraîchir" onClick={onRefresh}>
                  <RefreshIcon />
                </ToolbarAction>
              </>
            )
          }
        />
        <List>
          { holder.admin && (
            <ListItem divider>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Administrateur" />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={handleElevate(false)}>
                  <ForwardIcon classes={{ root: styles.downgrade }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ) }
          { permissions.map(permission => (
            <PermissionItem
              key={permission._id}
              permission={permission} divider
              onClick={() => setDialog({ open: true, permission })}
            />
          )) }
          <RestrictedAccess name="permissions" level={PLvl.UPDATE}>
            <ListItem button divider onClick={() => setDialog({ open: true })}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary={<em>Ajouter</em>} />
            </ListItem>
          </RestrictedAccess>
        </List>
      </Card>
      { dialog.open && (
        <EditPermissionDialog
          {...dialog}
          onClose={() => setDialog({ open: false })}
          onGrant={onGrant} onRevoke={onRevoke}
        />
      ) }
    </>
  );
};

export default PermissionCard;