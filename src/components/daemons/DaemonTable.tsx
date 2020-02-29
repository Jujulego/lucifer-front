import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { capitalize } from 'lodash';
import moment from 'moment';

import {
  Link,
  Paper, TableContainer,
  TableHead, TableCell
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import Daemon, { DaemonUpdate } from 'data/daemon';
import { PLvl } from 'data/permission';

import {
  RelativeDate,
  Table, TableBody, TableRow, TableSortCell,
  TableToolbar, TableAction,
  TableProps
} from 'components/basics';
import RestrictedAccess from 'components/permissions/RestrictedAccess';

import AddDaemonDialog from './AddDaemonDialog';

// Types
export interface DaemonTableProps extends Omit<TableProps<Daemon>, 'toolbar'> {
  onLoad: () => void;
  onReload?: () => void;
  onAdd?: (data: DaemonUpdate) => void;
  onDelete?: (id: string) => void;
}

// Component
const DaemonTable = (props: DaemonTableProps) => {
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
  const handleDelete = onDelete && ((daemons: Daemon[]) => { daemons.forEach(daemon => onDelete(daemon._id)) });

  // Render
  const name = (user: Daemon) => user.name || user._id;
  const lastConnection = (user: Daemon) => moment(user.lastConnexion);

  const toolbar = (
    <TableToolbar title="Daemons">
      { handleDelete && (
        <RestrictedAccess name="daemons" level={PLvl.DELETE}>
          <TableAction when="some" tooltip="Supprimer" onActivate={handleDelete}>
            <DeleteIcon />
          </TableAction>
        </RestrictedAccess>
      ) }
      { onAdd && (
        <RestrictedAccess name="daemons" level={PLvl.CREATE}>
          <TableAction when="nothing" tooltip="Ajouter" onClick={() => setAdding(true)}>
            <AddIcon />
          </TableAction>
          <AddDaemonDialog
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
