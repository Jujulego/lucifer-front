import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

import {
  Link, Paper,
  TableCell, TableContainer, TableHead,
  Tooltip
} from '@material-ui/core';
import { Check as CheckIcon } from '@material-ui/icons';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import useAPI from 'basics/api.hooks';

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

// Styles
const useStyles = makeStyles(({ spacing }) => ({
  verified: {
    marginTop: -spacing(.5),
    marginBottom: -spacing(.5),
    marginLeft: spacing(1),
  }
}));

// Component
const UserTable = () => {
  // Router
  const { url } = useRouteMatch();

  // API
  const { data: users = [], reload } = useAPI.get<User[]>('/api/users');

  // Render
  const styles = useStyles();

  const toolbar = (
    <Paper square>
      <TableToolbar title="Utilisateurs">
        <ToolbarAction tooltip="Rafraîchir" onClick={() => reload()}>
          <RefreshIcon />
        </ToolbarAction>
      </TableToolbar>
    </Paper>
  );

  return (
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
              <TableCell>
                <Link component={RouterLink} to={`${url}/${usr.id}`}>
                  { usr.name }
                </Link>
              </TableCell>
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
  );
};

export default UserTable;
