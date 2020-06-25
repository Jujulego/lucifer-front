import React, { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Link, TableCell, TableContainer, TableHead } from '@material-ui/core';

import { Table, TableBody, TableRow, TableSortCell } from 'basics/components';

import { Daemon } from '../models/daemon';
import { User } from 'users/models/user';

// Props
export interface DaemonTableProps {
  daemons: Daemon[];
  defaultOwner?: User;
  toolbar?: ReactNode;
}

// Component
const DaemonTable = (props: DaemonTableProps) => {
  // Props
  const { daemons, defaultOwner, toolbar } = props;

  // Render
  const owner = (daemon: Daemon) => daemon.owner || defaultOwner;

  return (
    <TableContainer>
      <Table documents={daemons} toolbar={toolbar}>
        <TableHead>
          <TableRow>
            <TableSortCell<Daemon> field={dmn => dmn.name || dmn.id}>Nom</TableSortCell>
            <TableSortCell<Daemon> field={dmn => owner(dmn)?.name || ""}>Propriétaire</TableSortCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { (dmn: Daemon) => (
            <TableRow key={dmn.id} doc={dmn}>
              <TableCell>
                <Link component={RouterLink} to={`/daemons/${dmn.id}`}>
                  { dmn.name || dmn.id }
                </Link>
              </TableCell>
              <TableCell>
                { owner(dmn) && (
                  <Link component={RouterLink} to={`/users/${owner(dmn)?.id}/daemons`}>
                    { owner(dmn)?.name }
                  </Link>
                ) }
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DaemonTable;
