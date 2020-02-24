import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { FullToken } from 'data/token';
import { AppDispatch } from 'store';
import { usePermision, useUser, Lvl } from 'store/users/hooks';
import {
  createUserToken, getUser, updateUser, deleteUserToken,
  UserUpdate
} from 'store/users/thunks';

import PermissionCard from 'components/permissions/PermissionCard';
import TokenTable from 'components/tokens/TokenTable';

import CredentialsCard from './CredentialsCard';
import { Redirect } from 'react-router';

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

  // Users
  const user = useUser(id);
  const allowed = usePermision("users", Lvl.READ);

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

  const handleDeleteToken = (tokenId: string) => {
    dispatch(deleteUserToken(id, tokenId));
  };

  // Effects
  useEffect(() => handleRefresh(), [handleRefresh]);

  // Render
  if (allowed === false) return <Redirect to="/forbidden" />;
  if (!user || allowed === null) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <CredentialsCard user={user} onUpdate={handleUpdate} />
      </Grid>
      <Grid item xs={12} md={8}>
        <PermissionCard holder={user} onRefresh={handleRefresh} />
      </Grid>
      <Grid item xs={12}>
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