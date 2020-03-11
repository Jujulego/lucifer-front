import React from 'react';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import Daemon, { SimpleDaemon, DaemonCreate } from 'data/daemon';
import { useDataEvents } from 'contexts/EventContext';
import useAPI from 'utils/hooks/useAPI';

import { AppDispatch } from 'store';
import { deleteDaemon } from 'store/daemons/thunks';

import DaemonTable, { DaemonTableProps } from 'components/daemons/DaemonTable';

// Types
export type UserDaemonTableProps = Omit<DaemonTableProps, 'data' | 'onLoad' | 'onReload' | 'onAdd' | 'onDelete'> & {
  user: string
};

// Component
const UserDaemonTable = (props: UserDaemonTableProps) => {
  // Props
  const { user, ...table } = props;

  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // API
  const { send: add } = useAPI.post<DaemonCreate, Daemon>('/api/daemon');
  const { data = [], reload, update } = useAPI.get<SimpleDaemon[]>('/api/daemons', { user }, { load: false });

  // Events
  useDataEvents('daemons', update);

  // Handlers
  const handleAdd = async (data: DaemonCreate) => {
    const daemon = await add(data);
    if (daemon) update((data = []) => [...data, omit(daemon, ['permissions', 'tokens'])]);
  };

  const handleDelete = async (id: string) => {
    dispatch(deleteDaemon(id));
    update((data = []) => data.filter(doc => doc._id !== id));
  };

  // Render
  return (
    <DaemonTable
      {...table}
      data={data}
      onLoad={reload} onReload={reload}
      onAdd={handleAdd} onDelete={handleDelete}
    />
  );
};

export default UserDaemonTable;
