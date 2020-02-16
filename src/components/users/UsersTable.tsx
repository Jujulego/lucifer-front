import React, { useEffect } from 'react';
import moment from 'moment';

import {
  Paper,
  TableHead, TableCell, TableContainer
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import {
  ToolbarAction,
  Table, TableToolbar, TableBody, TableRow, TableSortCell,
  TableProps
} from 'components/basics';
import User from 'data/user';

// Types
export interface UsersTableProps extends Omit<TableProps<User>, 'toolbar'> {
  onLoad: () => void
}

// Component
const UsersTable = (props: UsersTableProps) => {
  // Props
  const {
    onLoad,
    ...table
  } = props;

  // Effects
  useEffect(() => {
    onLoad();
  }, [onLoad]);

  // Render
  const lastConnection = (user: User) => {
    return moment.max(
      user.tokens.map(token => moment(token.updatedAt))
    );
  };

  return (
    <Paper>
      <TableContainer>
        <Table {...table}
          toolbar={
            <TableToolbar title="Utilisateurs">
              <ToolbarAction tooltip="Rafraîchir" onClick={() => onLoad()}>
                <RefreshIcon />
              </ToolbarAction>
            </TableToolbar>
          }
        >
          <TableHead>
            <TableRow>
              <TableSortCell<User> field="email">Email</TableSortCell>
              <TableSortCell field={lastConnection}>Dernière connexion</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (user: User) => (
              <TableRow key={user._id} doc={user}>
                <TableCell>{ user.email }</TableCell>
                <TableCell>{ lastConnection(user).fromNow() }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsersTable;