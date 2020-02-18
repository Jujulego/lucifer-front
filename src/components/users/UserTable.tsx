import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

import {
  Link,
  Paper,
  TableHead, TableCell, TableContainer
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import User from 'data/user';

import {
  RelativeDate,
  Table, TableBody, TableRow, TableSortCell,
  TableToolbar, TableSelectedAction, ToolbarAction,
  TableProps
} from 'components/basics';

// Types
export interface UserTableProps extends Omit<TableProps<User>, 'toolbar'> {
  onLoad: () => void,
  onReload?: () => void,
  onDelete?: (id: User['_id']) => void
}

// Component
const UserTable = (props: UserTableProps) => {
  // Props
  const {
    onLoad, onReload,
    onDelete,
    ...table
  } = props;

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Handlers
  const handleDelete = onDelete && ((users: User[]) => { users.forEach(user => onDelete(user._id)); });

  // Render
  const lastConnection = (user: User) => {
    return moment.max(
      user.tokens.map(token => moment(token.createdAt))
    );
  };

  const toolbar = (
    <TableToolbar title="Utilisateurs">
      { handleDelete && (
        <TableSelectedAction tooltip="Supprimer" onActivate={handleDelete}>
          <DeleteIcon />
        </TableSelectedAction>
      ) }
      { onReload && (
        <ToolbarAction tooltip="Rafraîchir" onClick={() => onReload()}>
          <RefreshIcon />
        </ToolbarAction>
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
                  <Link component={RouterLink} to={`/user/${user._id}`}>{ user.email }</Link>
                </TableCell>
                <TableCell><RelativeDate date={lastConnection(user)} mode="from" /></TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UserTable;