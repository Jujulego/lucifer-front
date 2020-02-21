import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { FullToken } from 'data/token';
import { AppDispatch } from 'store';
import { useUser } from 'store/users/hooks';
import {
  createUserToken, getUser, updateUser, deleteUserToken,
  UserUpdate
} from 'store/users/thunks';

import TokenTable from 'components/tokens/TokenTable';

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
  const dispatch = useDispatch<AppDispatch>();

  // API
  const user = useUser(id);

  // Handlers
  const handleRefresh = useCallback(() => {
    dispatch(getUser(id));
  }, [dispatch, id]);

  const handleUpdate = (update: UserUpdate) => {
    dispatch(updateUser(id, update));
  };

  const handleAddToken = async (): Promise<FullToken | null> => {
    return await dispatch(createUserToken(id));
  };

  const handleDeleteToken = async (tokenId: string) => {
    await dispatch(deleteUserToken(id, tokenId));
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
          onAdd={handleAddToken}
          onDelete={handleDeleteToken}
        />
      </Grid>
    </Grid>
  )
};

export default UserPage;