import React, { useState } from 'react';

import { IconButton, Paper } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

import useAPI from 'basics/api.hooks';

import { RefreshButton, TableToolbar } from 'basics/components';

import { CreateDaemon, Daemon } from '../models/daemon';
import AddDaemonDialog from '../components/AddDaemonDialog';
import DaemonTable from '../components/DaemonTable';

// Component
const AllDaemonTable = () => {
  // State
  const [adding, setAdding] = useState(false);

  // API
  const { data: daemons = [], loading, reload, update } = useAPI.get<Daemon[]>('/api/daemons');
  const { send: add } = useAPI.post<CreateDaemon, Daemon>('/api/daemons');

  // Callbacks
  const handleAdd = async (data: CreateDaemon) => {
    const dmn = await add(data);

    update((old = []) => [...old, dmn]);
  };

  // Render
  const toolbar = (
    <Paper square>
      <TableToolbar title="Daemons">
        <IconButton onClick={() => setAdding(true)}>
          <AddIcon />
        </IconButton>
        <RefreshButton refreshing={loading} onClick={reload} />
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
