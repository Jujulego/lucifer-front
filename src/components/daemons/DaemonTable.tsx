import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from 'lodash';
import moment from 'moment';

import {
  Link,
  Paper, TableContainer,
  TableHead, TableCell
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import Daemon from 'data/daemon';

import {
  RelativeDate,
  Table, TableBody, TableRow, TableSortCell,
  TableToolbar, TableAction,
  TableProps
} from 'components/basics';

// Types
export interface DaemonTableProps extends Omit<TableProps<Daemon>, 'toolbar'> {
  onLoad: () => void;
  onReload?: () => void;
}

// Component
const DaemonTable = (props: DaemonTableProps) => {
  // Props
  const {
    onLoad, onReload,
    ...table
  } = props;

  // Effects
  useEffect(() => { onLoad(); }, [onLoad]);

  // Render
  const name = (user: Daemon) => user.name || user._id;
  const lastConnection = (user: Daemon) => moment(user.lastConnexion);

  const toolbar = (
    <TableToolbar title="Daemons">
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
              <TableSortCell field={name}>Nom</TableSortCell>
              <TableSortCell field={lastConnection}>Dernière connexion</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (daemon: Daemon) => (
              <TableRow key={daemon._id} doc={daemon}>
                <TableCell>
                  <Link component={RouterLink} to={`/daemons/${daemon._id}`}>{ capitalize(name(daemon)) }</Link>
                </TableCell>
                <TableCell>
                  { daemon.lastConnexion && (
                    <RelativeDate date={lastConnection(daemon)} mode="from" />
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

export default DaemonTable;
