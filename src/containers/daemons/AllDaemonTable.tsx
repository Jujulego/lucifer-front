import React from 'react';

import Daemon, { DaemonCreate } from 'data/daemon';
import useAPI from 'utils/hooks/useAPI';

import { AppDispatch } from 'store';
import { deleteDaemon } from 'store/daemons/thunks';

import DaemonTable, { DaemonTableProps } from 'components/daemons/DaemonTable';
import { useDispatch } from 'react-redux';

// Types
export type AllDaemonTableProps = Omit<DaemonTableProps, 'data' | 'onLoad' | 'onReload' | 'onAdd' | 'onDelete'>;

// Component
const AllDaemonTable = (props: AllDaemonTableProps) => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // API
  const { send: add } = useAPI.post<DaemonCreate, Daemon>('/api/daemon');
  const { data = [], reload, update } = useAPI.get<Daemon[]>('/api/daemons', {}, { load: false });

  // Handlers
  const handleAdd = async (data: DaemonCreate) => {
    const daemon = await add(data);
    if (daemon) update((data = []) => [...data, daemon]);
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteDaemon(id));
    update((data = []) => data.filter(doc => doc._id !== id));
  };

  // Render
  return (
    <DaemonTable
      {...props}
      data={data}
      onLoad={reload} onReload={reload}
      onAdd={handleAdd} onDelete={handleDelete}
    />
  );
};

export default AllDaemonTable;
