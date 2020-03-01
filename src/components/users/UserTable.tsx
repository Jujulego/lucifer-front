import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
  Paper, TableContainer,
  TableHead, TableCell
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import { PLvl } from 'data/permission';
import { UserCreate, SimpleUser } from 'data/user';

import {
  RelativeDate,
  Table, TableBody, TableRow, TableSortCell,
  TableToolbar, TableAction,
  TableProps,
} from 'components/basics';
import RestrictedAccess from 'components/permissions/RestrictedAccess';

import AddUserDialog from './AddUserDialog';
import UserLink from './UserLink';

// Types
export interface UserTableProps extends Omit<TableProps<SimpleUser>, 'toolbar'> {
  onLoad: () => void;
  onReload?: () => void;
  onAdd?: (data: UserCreate) => void;
  onDelete?: (id: string) => void;
}

// Component
const UserTable = (props: UserTableProps) => {
  // Props
  const {
    onLoad, onReload,
    onAdd, onDelete,
    ...table
  } = props;

  // State
  const [adding, setAdding] = useState(false);

  // Effects
  useEffect(() => { onLoad(); }, [onLoad]);

  // Handlers
  const handleDelete = onDelete && ((users: SimpleUser[]) => { users.forEach(user => onDelete(user._id)); });

  // Render
  const lastConnection = (user: SimpleUser) => moment(user.lastConnexion);

  const toolbar = (
    <TableToolbar title="Utilisateurs">
      { handleDelete && (
        <RestrictedAccess name="users" level={PLvl.DELETE}>
          <TableAction when="some" tooltip="Supprimer" onActivate={handleDelete}>
            <DeleteIcon />
          </TableAction>
        </RestrictedAccess>
      ) }
      { onAdd && (
        <RestrictedAccess name="users" level={PLvl.CREATE}>
          <TableAction when="nothing" tooltip="Ajouter" onClick={() => setAdding(true)}>
            <AddIcon />
          </TableAction>
          <AddUserDialog
            open={adding} onClose={() => setAdding(false)}
            onAdd={onAdd}
          />
        </RestrictedAccess>
      ) }
      { onReload && (
        <TableAction tooltip="Rafraîchir" onClick={() => onReload()}>
          <RefreshIcon />
        </TableAction>
      ) }
    </TableToolbar>
  );

  return (
    <Paper>
      <TableContainer>
        <Table {...table} toolbar={toolbar}>
          <TableHead>
            <TableRow>
              <TableSortCell<SimpleUser> field="email">Email</TableSortCell>
              <TableSortCell field={lastConnection}>Dernière connexion</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (user: SimpleUser) => (
              <TableRow key={user._id} doc={user}>
                <TableCell>
                  <UserLink id={user._id} user={user} />
                </TableCell>
                <TableCell>
                  { user.lastConnexion && (
                    <RelativeDate date={lastConnection(user)} mode="from" />
                  ) }
                </TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;
