import React from 'react';

import {
  CircularProgress,
  CircularProgressProps,
  MenuItem,
  Select,
  SelectProps,
  useFormControl
} from '@material-ui/core';

import useAPI from 'basics/api.hooks';
import { User } from 'users/models/user';

// Utils
const SmallProgress = (props: CircularProgressProps) => <CircularProgress {...props} size={20} />;

// Types
export type UserSelectProps = Omit<SelectProps, 'value'> & {
  value?: string;
};

// Component
const UserSelect = (props: UserSelectProps) => {
  const { disabled, IconComponent, value } = props;

  // Context
  const ctx = useFormControl();
  const required = props.required || ctx?.required;

  // API
  const { data: users, loading } = useAPI.get<User[]>('/api/users');

  // Render
  return (
    <Select {...props}
      value={value || ''}
      disabled={disabled || loading}
      IconComponent={loading ? SmallProgress : IconComponent}
    >
      { !required && (
        <MenuItem value=''>
          <em>Pas d'utilisateur</em>
        </MenuItem>
      ) }
      { (!users && value) && (
        <MenuItem value={value}>
          { value }
        </MenuItem>
      ) }
      { users?.map(user => (
        <MenuItem key={user.id} value={user.id}>
          { user.name }
        </MenuItem>
      )) }
    </Select>
  );
};

export default UserSelect;
