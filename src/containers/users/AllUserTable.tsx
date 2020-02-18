import React from 'react';
import { useDispatch } from 'react-redux';

import UserTable, { UserTableProps } from 'components/users/UserTable';
import User from 'data/user';

import useAPI from 'utils/hooks/useAPI';
import { deleteUser } from 'store/users/thunks';

// Type
export type AllUserTableProps = Omit<UserTableProps, 'data' | 'onLoad' | 'onReload'>;

// Component
const AllUserTable = (props: AllUserTableProps) => {
  // Redux
  const dispatch = useDispatch();

  // API
  const { data, reload } = useAPI.get<User[]>('/api/users', { load: false });

  // Handlers
  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
    reload();
  };

  // Render
  return (
    <UserTable
      {...props} data={data || []}
      onLoad={reload} onReload={reload}
      onDelete={handleDelete}
    />
  );
};

export default AllUserTable;