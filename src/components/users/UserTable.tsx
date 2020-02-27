import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

import {
  Link,
  Paper, TableContainer,
  TableHead, TableCell
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import { PLvl } from 'data/permission';
import User, { Credentials } from 'data/user';

import {
  RelativeDate,
  Table, TableBody, TableRow, TableSortCell,
  TableToolbar, TableAction,
  TableProps,
} from 'components/basics';
import RestrictedAccess from 'components/permissions/RestrictedAccess';

import AddUserDialog from './AddUserDialog';

// Types
export interface UserTableProps extends Omit<TableProps<User>, 'toolbar'> {
  onLoad: () => void;
  onReload?: () => void;
  onAdd?: (cred: Credentials) => void;
  onDelete?: (id: User['_id']) => void;
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
  const handleDelete = onDelete && ((users: User[]) => { users.forEach(user => onDelete(user._id)); });

  // Render
  const lastConnection = (user: User) => moment(user.lastConnexion);

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
              <TableSortCell<User> field="email">Email</TableSortCell>
              <TableSortCell field={lastConnection}>Dernière connexion</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (user: User) => (
              <TableRow key={user._id} doc={user}>
                <TableCell>
                  <Link component={RouterLink} to={`/users/${user._id}`}>{ user.email }</Link>
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
