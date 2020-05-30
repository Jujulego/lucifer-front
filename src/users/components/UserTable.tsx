import React from 'react';

import {
  Card,
  TableCell, TableContainer, TableHead
} from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

import useAPI from 'utils/hooks/useAPI';

import { Table, TableBody, TableRow, TableSortCell, TableToolbar, ToolbarAction } from 'basics/components';

import { User } from '../models/user';

// Component
const UserTable = () => {
  // API
  const { data: users = [], reload } = useAPI.get<User[]>('/api/users');

  // Render
  const toolbar = (
    <TableToolbar title="Users">
      <ToolbarAction tooltip="Refresh" onClick={() => reload()}>
        <RefreshIcon />
      </ToolbarAction>
    </TableToolbar>
  );

  return (
    <Card>
      <TableContainer>
        <Table documents={users} toolbar={toolbar}>
          <TableHead>
            <TableRow>
              <TableSortCell<User> field="id">Id</TableSortCell>
              <TableSortCell<User> field="email">Email</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (doc: User) => (
              <TableRow key={doc.id} doc={doc}>
                <TableCell>{ doc.id }</TableCell>
                <TableCell>{ doc.email }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UserTable;
