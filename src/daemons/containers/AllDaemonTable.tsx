import React, { useState } from 'react';

import { IconButton, Paper } from '@material-ui/core';
import { Add as AddIcon, Refresh as RefreshIcon } from '@material-ui/icons';

import apiHooks from 'basics/api.hooks';

import { TableToolbar, ToolbarAction } from 'basics/components';

import { CreateDaemon, Daemon } from '../models/daemon';
import AddDaemonDialog from '../components/AddDaemonDialog';
import DaemonTable from '../components/DaemonTable';

// Component
const AllDaemonTable = () => {
  // State
  const [adding, setAdding] = useState(false);

  // API
  const { data: daemons = [], reload, update } = apiHooks.get<Daemon[]>('/api/daemons');
  const { send: add } = apiHooks.post<CreateDaemon, Daemon>('/api/daemons');

  // Callbacks
  const handleAdd = async (data: CreateDaemon) => {
    const dmn = await add(data);

    if (dmn) {
      update((old = []) => [...old, dmn]);
    }
  };

  // Render
  const toolbar = (
    <Paper square>
      <TableToolbar title="Daemons">
        <IconButton onClick={() => setAdding(true)}>
          <AddIcon />
        </IconButton>
        <ToolbarAction tooltip="Rafraîchir" onClick={reload}>
          <RefreshIcon />
        </ToolbarAction>
      </TableToolbar>
    </Paper>
  );

  return (
    <>
      <DaemonTable daemons={daemons} toolbar={toolbar} />
      <AddDaemonDialog
        open={adding} onClose={() => setAdding(false)}
        onAdd={handleAdd}
      />
    </>
  );
};

export default AllDaemonTable;
