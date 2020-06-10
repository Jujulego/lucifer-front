import React from 'react';

import { Paper } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';

import useAPI from 'utils/hooks/useAPI';

import { TableToolbar, ToolbarAction } from 'basics/components';

import { Daemon } from '../models/daemon';
import DaemonTable from '../components/DaemonTable';

// Component
const AllDaemonTable = () => {
  // API
  const { data: daemons = [], reload } = useAPI.get<Daemon[]>('/api/daemons');

  // Render
  const toolbar = (
    <Paper square>
      <TableToolbar title="Daemons">
        <ToolbarAction tooltip="Rafraîchir" onClick={reload}>
          <RefreshIcon />
        </ToolbarAction>
      </TableToolbar>
    </Paper>
  );

  return (
    <DaemonTable daemons={daemons} toolbar={toolbar} />
  );
};

export default AllDaemonTable;
