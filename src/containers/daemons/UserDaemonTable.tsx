import React from 'react';
import { omit } from 'lodash';

import Daemon, { SimpleDaemon, DaemonCreate } from 'data/daemon';
import useAPI from 'utils/hooks/useAPI';

import { AppDispatch } from 'store';
import { deleteDaemon } from 'store/daemons/thunks';

import DaemonTable, { DaemonTableProps } from 'components/daemons/DaemonTable';
import { useDispatch } from 'react-redux';

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
