import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, TableCell, TableContainer, TableHead } from '@material-ui/core';

import { Table, TableBody, TableRow, TableSortCell } from 'basics/components';

import { Daemon } from '../models/daemon';

// Props
export interface DaemonTableProps {
  daemons: Daemon[],
  toolbar?: ReactNode
}

// Component
const DaemonTable = (props: DaemonTableProps) => {
  // Props
  const { daemons, toolbar } = props;

  // Render
  return (
    <TableContainer>
      <Table documents={daemons} toolbar={toolbar}>
        <TableHead>
          <TableRow>
            <TableSortCell<Daemon> field={dmn => dmn.name || dmn.id}>Nom</TableSortCell>
            <TableSortCell<Daemon> field={dmn => dmn.owner?.name}>Propriétaire</TableSortCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { (dmn: Daemon) => (
            <TableRow key={dmn.id} doc={dmn}>
              <TableCell>{ dmn.name || dmn.id }</TableCell>
              <TableCell>
                <Link component={RouterLink} to={`/users/${dmn.owner?.id}/daemons`}>
                  { dmn.owner?.name }
                </Link>
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DaemonTable;
