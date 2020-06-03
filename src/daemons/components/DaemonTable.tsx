import React from 'react';

import { Card, TableCell, TableContainer, TableHead } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

import useAPI from 'utils/hooks/useAPI';

import { Table, TableBody, TableRow, TableSortCell, TableToolbar, ToolbarAction } from 'basics/components';

import { Daemon } from '../models/daemon';

// Component
const DaemonTable = () => {
  // API
  const { data: daemons = [], reload } = useAPI.get<Daemon[]>('/api/daemons');

  // Render
  const toolbar = (
    <TableToolbar title="Daemons">
      <ToolbarAction tooltip="Rafraîchir" onClick={reload}>
        <RefreshIcon />
      </ToolbarAction>
    </TableToolbar>
  );

  return (
    <Card>
      <TableContainer>
        <Table documents={daemons} toolbar={toolbar}>
          <TableHead>
            <TableRow>
              <TableSortCell<Daemon> field="id">Identifiant</TableSortCell>
              <TableSortCell<Daemon> field="ownerId">Propriétaire</TableSortCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { (dmn: Daemon) => (
              <TableRow key={dmn.id} doc={dmn}>
                <TableCell>{ dmn.id }</TableCell>
                <TableCell>{ dmn.ownerId }</TableCell>
              </TableRow>
            ) }
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DaemonTable;
