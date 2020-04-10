import React from 'react';

import {
  Select, SelectProps, MenuItem,
  CircularProgress, CircularProgressProps, useFormControl,
} from '@material-ui/core';

import { SimpleUser } from 'data/user';
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

  // Context
  const ctx = useFormControl();
  const required = props.required || ctx?.required;

  // API
  const { data: users, loading } = useAPI.get<SimpleUser[]>('/api/users');

  // Users
  const user = useUser(value, false);

  // Render
  return (
    <Select
      {...props} value={value || ''}
      disabled={disabled || loading}
      IconComponent={loading ? SmallProgress : IconComponent}
    >
      { !required && (
        <MenuItem value="">
          <em>Pas d'utilisateur</em>
        </MenuItem>
      ) }
      { (!users && value) && (
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
