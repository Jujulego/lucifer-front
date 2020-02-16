import React from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { useUser } from 'store/users/hooks';
import { updateUser, UserUpdate } from 'store/users/thunks';

import CredentialsCard from './CredentialsCard';

// Types
interface UserPageProps {
  id: string;
}

// Component
const UserPage = (props: UserPageProps) => {
  // Props
  const { id } = props;

  // Redux
  const dispatch = useDispatch();

  // API
  const user = useUser(id);

  // Handlers
  const handleUpdate = (update: UserUpdate) => {
    dispatch(updateUser(id, update));
  };

  // Render
  if (!user) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs lg={5}>
        <CredentialsCard user={user} onUpdate={handleUpdate} />
      </Grid>
    </Grid>
  )
};

export default UserPage;