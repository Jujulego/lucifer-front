import React from 'react';

import {
  Card,
  TableCell, TableContainer, TableHead, Theme, Tooltip
} from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import { Refresh as RefreshIcon } from '@material-ui/icons';

import useAPI from 'utils/hooks/useAPI';

import {
  RelativeDate,
  Table,
  TableBody,
  TableRow,
  TableSortCell,
  TableToolbar,
  ToolbarAction
} from 'basics/components';

import { User } from '../models/user';
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles(({ spacing }: Theme) => ({
  verified: {
    marginTop: -spacing(.5),
    marginBottom: -spacing(.5),
    marginLeft: spacing(1),
  }
}));

// Component
const UserTable = () => {
  // API
  const { data: users = [], reload } = useAPI.get<User[]>('/api/users');

  // Render
  const styles = useStyles();

  const toolbar = (
    <TableToolbar title="Utilisateurs">
      <ToolbarAction tooltip="Rafraîchir" onClick={() => reload()}>
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
              <TableSortCell<User> field="name">Nom</TableSortCell>
              <TableSortCell<User> field="email">Email</TableSortCell>
              <TableSortCell<User> field="lastLogin">Dernière connexion</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (usr: User) => (
              <TableRow key={usr.id} doc={usr}>
                <TableCell>{ usr.name }</TableCell>
                <TableCell>
                  { usr.email }
                  { usr.emailVerified && (
                    <Tooltip title='Vérifié'>
                      <CheckIcon classes={{ root: styles.verified }} color='primary' />
                    </Tooltip>
                  ) }
                </TableCell>
                <TableCell>
                  <RelativeDate date={usr.lastLogin} mode='from' />
                </TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default UserTable;
