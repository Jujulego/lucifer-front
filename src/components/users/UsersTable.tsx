import React, { useEffect } from 'react';

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
            </TableRow>
          </TableHead>
          <TableBody>
            { (user: User) => (
              <TableRow key={user._id} doc={user}>
                <TableCell>{ user.email }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default UsersTable;