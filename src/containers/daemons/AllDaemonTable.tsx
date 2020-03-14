import React from 'react';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import { FullDaemon, SimpleDaemon, DaemonCreate } from 'data/daemon';
import { useDataEvents } from 'contexts/EventContext';
import useAPI from 'utils/hooks/useAPI';

import { AppDispatch } from 'store';
import { deleteDaemon } from 'store/daemons/thunks';

import DaemonTable, { DaemonTableProps } from 'components/daemons/DaemonTable';

// Types
export type AllDaemonTableProps = Omit<DaemonTableProps, 'data' | 'onLoad' | 'onReload' | 'onAdd' | 'onDelete'>;

// Component
const AllDaemonTable = (props: AllDaemonTableProps) => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // API
  const { send: add } = useAPI.post<DaemonCreate, FullDaemon>('/api/daemon');
  const { data = [], reload, update } = useAPI.get<SimpleDaemon[]>('/api/daemons', {}, { load: false });

  // Events
  useDataEvents('daemons', update);

  // Handlers
  const handleAdd = async (data: DaemonCreate): Promise<FullDaemon | null> => {
    const daemon = await add(data);
    if (daemon) update((data = []) => [...data, omit(daemon, ['permissions', 'tokens'])]);

    return daemon || null;
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
