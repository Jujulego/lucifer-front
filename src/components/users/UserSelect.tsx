import React from 'react';

import {
  Select, SelectProps, MenuItem,
  CircularProgress, CircularProgressProps,
} from '@material-ui/core';

import User from 'data/user';
import { useUser } from 'store/users/hooks';
import useAPI from 'utils/hooks/useAPI';

// Types
export type UserSelectProps = Omit<SelectProps, 'value'> & {
  value?: string;
};

// Components
const SmallProgress = (props: CircularProgressProps) => <CircularProgress {...props} size={20} />;
const UserSelect = (props: UserSelectProps) => {
  // Props
  const { disabled, IconComponent, value } = props;

  // API
  const { data: users, loading } = useAPI.get<User[]>('/api/users');

  // Users
  const user = useUser(value, false);

  // Render
  return (
    <Select
      {...props} disabled={disabled || loading}
      IconComponent={loading ? SmallProgress : IconComponent}
    >
      { !users && (
        <MenuItem value={value}>
          { value || user?.email }
        </MenuItem>
      ) }
      { users?.map(user => (
        <MenuItem key={user._id} value={user._id}>
          { user.email }
        </MenuItem>
      )) }
    </Select>
  );
};

export default UserSelect;
