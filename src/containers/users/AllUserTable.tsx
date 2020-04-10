import React from 'react';
import { useDispatch } from 'react-redux';
import { omit } from 'lodash';

import User, { SimpleUser, UserCreate } from 'data/user';
import { useDataEvents } from 'contexts/EventContext';
import useAPI from 'utils/hooks/useAPI';

import { AppDispatch } from 'store';
import { deleteUser } from 'store/users/thunks';

import UserTable, { UserTableProps } from 'components/users/UserTable';

// Types
export type AllUserTableProps = Omit<UserTableProps, 'data' | 'onLoad' | 'onReload' | 'onAdd' | 'onDelete'>;

// Component
const AllUserTable = (props: AllUserTableProps) => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // API
  const { send: add } = useAPI.post<UserCreate, User>('/api/users/');
  const { data = [], reload, update } = useAPI.get<SimpleUser[]>('/api/users', {}, { load: false });

  // Events
  useDataEvents('users', update);

  // Handlers
  const handleAdd = async (data: UserCreate) => {
    const user = await add(data);
    if (user) {
      update((data = []) => [
        ...data.filter(doc => doc._id !== user._id),
        omit(user, ['tokens', 'permissions'])
      ]);
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
    update((data = []) => data.filter(doc => doc._id !== id));
  };

  // Render
  return (
    <UserTable
      {...props}
      data={data}
      onLoad={reload} onReload={reload}
      onAdd={handleAdd} onDelete={handleDelete}
    />
  );
};

export default AllUserTable;
