import React from 'react';
import { useDispatch } from 'react-redux';

import UserTable, { UserTableProps } from 'components/users/UserTable';
import User, { Credentials } from 'data/user';

import useAPI from 'utils/hooks/useAPI';
import { deleteUser } from 'store/users/thunks';

// Type
export type AllUserTableProps = Omit<UserTableProps, 'data' | 'onLoad' | 'onReload'>;

// Component
const AllUserTable = (props: AllUserTableProps) => {
  // Redux
  const dispatch = useDispatch();

  // API
  const { send: add } = useAPI.post<Credentials, User>('/api/user/');
  const { data = [], reload, update } = useAPI.get<User[]>('/api/users', {}, { load: false });

  // Handlers
  const handleAdd = async (cred: Credentials) => {
    const user = await add(cred);
    update([...data, user]);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
    update(data.filter(doc => doc._id !== id));
  };

  // Render
  return (
    <UserTable
      {...props} data={data}
      onLoad={reload} onReload={reload}
      onAdd={handleAdd} onDelete={handleDelete}
    />
  );
};

export default AllUserTable;