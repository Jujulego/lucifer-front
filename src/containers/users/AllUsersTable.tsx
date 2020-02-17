import React from 'react';

import UsersTable, { UsersTableProps } from 'components/users/UsersTable';
import useAPI from 'utils/hooks/useAPI';
import User from 'data/user';

// Type
export type AllUsersTableProps = Omit<UsersTableProps, 'data' | 'onLoad' | 'onReload'>;

// Component
const AllUsersTable = (props: AllUsersTableProps) => {
  // API
  const { data, reload } = useAPI.get<User[]>('/api/users', { load: false });

  // Render
  return (
    <UsersTable {...props}
      data={data || []}
      onLoad={reload} onReload={reload}
    />
  );
};

export default AllUsersTable;