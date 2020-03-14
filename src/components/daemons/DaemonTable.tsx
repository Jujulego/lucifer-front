import React, { useEffect, useState } from 'react';
import moment from 'moment';

import {
  Paper, TableContainer,
  TableHead, TableCell
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';

import { FullDaemon, SimpleDaemon, DaemonCreate } from 'data/daemon';
import { PLvl } from 'data/permission';

import {
  RelativeDate,
  Table, TableBody, TableRow, TableSortCell,
  TableToolbar, TableAction, TableFilterAction,
  TableProps
} from 'components/basics';
import RestrictedAccess from 'components/permissions/RestrictedAccess';
import UserLink from 'components/users/UserLink';

import AddDaemonDialog from './AddDaemonDialog';
import DaemonLink from './DaemonLink';
import FilterDaemonDialog from './FilterDaemonDialog';
import NewDaemonDialog from './NewDaemonDialog';

// Types
export interface DaemonTableProps extends Omit<TableProps<SimpleDaemon>, 'toolbar'> {
  onLoad: () => void;
  onReload?: () => void;
  onAdd?: (data: DaemonCreate) => Promise<FullDaemon | null>;
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
  const [newDaemon, setNewDaemon] = useState<FullDaemon | null>(null);

  // Effects
  useEffect(() => { onLoad(); }, [onLoad]);

  // Handlers
  const handleAdd = onAdd && (async (data: DaemonCreate) => {
    const daemon = await onAdd(data);
    if (daemon) setNewDaemon(daemon);
  });
  const handleDelete = onDelete && ((daemons: SimpleDaemon[]) => { daemons.forEach(daemon => onDelete(daemon._id)) });

  // Render
  const name = (daemon: SimpleDaemon) => daemon.name || daemon._id;
  const lastConnection = (daemon: SimpleDaemon) => moment(daemon.lastConnexion);

  const toolbar = (
    <TableToolbar title="Daemons">
      { handleDelete && (
        <RestrictedAccess name="daemons" level={PLvl.DELETE}>
          <TableAction when="some" tooltip="Supprimer" onActivate={handleDelete}>
            <DeleteIcon />
          </TableAction>
        </RestrictedAccess>
      ) }
      { handleAdd && (
        <RestrictedAccess name="daemons" level={PLvl.CREATE}>
          <TableAction when="nothing" tooltip="Ajouter" onClick={() => setAdding(true)}>
            <AddIcon />
          </TableAction>
          <AddDaemonDialog
            open={adding} onClose={() => setAdding(false)}
            onAdd={handleAdd}
          />
          <NewDaemonDialog
            open={!!newDaemon} onClose={() => setNewDaemon(null)}
            daemon={newDaemon}
          />
        </RestrictedAccess>
      ) }
      <TableFilterAction dialog={FilterDaemonDialog} />
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
              <TableCell>Utilisateur</TableCell>
              <TableSortCell field={lastConnection}>Dernière connexion</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (daemon: SimpleDaemon) => (
              <TableRow key={daemon._id} doc={daemon}>
                <TableCell>
                  <DaemonLink id={daemon._id} daemon={daemon} />
                </TableCell>
                <TableCell>
                  <UserLink id={daemon.user} />
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
