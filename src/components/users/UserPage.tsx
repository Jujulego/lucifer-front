import React from 'react';

import { Grid } from '@material-ui/core';

import { useUser } from 'store/users/hooks';

import CredentialsCard from './CredentialsCard';

// Types
interface UserPageProps {
  id: string;
}

// Component
const UserPage = (props: UserPageProps) => {
  // Props
  const { id } = props;

  // API
  const user = useUser(id);

  // Render
  if (!user) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs lg={5}>
        <CredentialsCard user={user} onUpdate={() => {}} />
      </Grid>
    </Grid>
  )
};

export default UserPage;