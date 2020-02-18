import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { useUser } from 'store/users/hooks';
import { getUser, updateUser, deleteUserToken, UserUpdate } from 'store/users/thunks';

import CredentialsCard from './CredentialsCard';
import TokenTable from 'components/tokens/TokenTable';

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
  const handleRefresh = useCallback(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const handleUpdate = (update: UserUpdate) => {
    dispatch(updateUser(id, update));
  };

  const handleDeleteToken = (tokenId: string) => {
    dispatch(deleteUserToken(id, tokenId));
  };

  // Effects
  useEffect(() => handleRefresh(), [handleRefresh]);

  // Render
  if (!user) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs lg={5}>
        <CredentialsCard user={user} onUpdate={handleUpdate} />
      </Grid>
      <Grid item xs lg={7}>
        <TokenTable
          data={user.tokens}
          onRefresh={handleRefresh}
          onDelete={handleDeleteToken}
        />
      </Grid>
    </Grid>
  )
};

export default UserPage;