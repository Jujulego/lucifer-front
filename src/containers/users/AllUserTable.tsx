import React from 'react';

import UserTable, { UserTableProps } from 'components/users/UserTable';
import useAPI from 'utils/hooks/useAPI';
import User from 'data/user';

// Type
export type AllUserTableProps = Omit<UserTableProps, 'data' | 'onLoad' | 'onReload'>;

// Component
const AllUserTable = (props: AllUserTableProps) => {
  // API
  const { data, reload } = useAPI.get<User[]>('/api/users', { load: false });

  // Render
  return (
    <UserTable {...props}
               data={data || []}
               onLoad={reload} onReload={reload}
    />
  );
};

export default AllUserTable;