import React from 'react';

import { TableCell, TableContainer, TableHead } from '@material-ui/core';

import { useAuth } from 'auth/auth.context';
import useAPI from 'utils/hooks/useAPI';

import { Table, TableBody, TableRow, TableSortCell } from 'basics/components';

import { User } from '../models/user';

// Component
const UserTable = () => {
  // Auth
  const { token } = useAuth();

  // API
  const { data: users = [] } = useAPI.get<User[]>('/api/users', {}, {
    headers: { Authorization: `Bearer ${token}` }
  });

  // Render
  return (
    <TableContainer>
      <Table documents={users}>
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
  );
};

export default UserTable;
