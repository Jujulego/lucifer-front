import React, { useState } from 'react';

import { Paper } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';

import useAPI from 'basics/api.hooks';

import { RefreshButton, TableAction, TableToolbar } from 'basics/components';

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
  const { send: del } = useAPI.delete<Daemon>('/api/daemons');

  // Callbacks
  const handleAdd = async (data: CreateDaemon) => {
    const dmn = await add(data);
    update((old = []) => [...old, dmn]);
  };

  const handleDelete = async (dmns: Daemon[]) => {
    const ids = dmns.map(dmn => dmn.id);

    await del({ ids });
    update((old = []) => old.filter(dmn => !ids.includes(dmn.id)));
  };

  // Render
  const toolbar = (
    <Paper square>
      <TableToolbar title="Daemons">
        <TableAction
          when="nothing"
          onClick={() => setAdding(true)}
        >
          <AddIcon />
        </TableAction>
        <TableAction
          when="some"
          onActivate={handleDelete}
        >
          <DeleteIcon />
        </TableAction>
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
