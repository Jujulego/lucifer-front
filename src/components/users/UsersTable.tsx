import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';

import {
  Link,
  Paper,
  TableHead, TableCell, TableContainer
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import {
  RelativeDate,
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
      user.tokens.map(token => moment(token.createdAt))
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

export default UsersTable;