import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import { Grid } from '@material-ui/core';

import { PName, PLvl } from 'data/permission';
import { UserUpdate } from 'data/user';

import { AppDispatch } from 'store';
import { usePermision, useUser } from 'store/users/hooks';
import {
  getUser, updateUser,
  createUserToken, deleteUserToken,
  grantUser, elevateUser, revokeUser
} from 'store/users/thunks';

import PermissionCard from 'components/permissions/PermissionCard';
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

  // Users
  const user = useUser(id);
  const allowed = usePermision("users", PLvl.READ);

  // Handlers
  const handleRefresh = useCallback(() => { dispatch(getUser(id)) }, [dispatch, id]);
  const handleUpdate = (update: UserUpdate) => { dispatch(updateUser(id, update)) };

  const handleGrant = (name: PName, level: PLvl) => { dispatch(grantUser(id, name, level)) };
  const handleElevate = (admin: boolean) => { dispatch(elevateUser(id, admin)) };
  const handleRevoke = (name: PName) => { dispatch(revokeUser(id, name)) };

  const handleAddToken = async () => await dispatch(createUserToken(id));
  const handleDeleteToken = (tokenId: string) => { dispatch(deleteUserToken(id, tokenId)) };

  // Effects
  useEffect(() => { handleRefresh() }, [handleRefresh]);

  // Render
  if (allowed === false) return <Redirect to="/forbidden" />;
  if (!user || allowed === null) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <CredentialsCard user={user} onUpdate={handleUpdate} />
      </Grid>
      <Grid item xs={12} md={8}>
        <PermissionCard
          holder={user}
          onRefresh={handleRefresh}
          onElevate={handleElevate}
          onGrant={handleGrant} onRevoke={handleRevoke}
        />
      </Grid>
      <Grid item xs={12}>
        <TokenTable
          holder={user} permission="users"
          onRefresh={handleRefresh}
          onAdd={handleAddToken} onDelete={handleDeleteToken}
        />
      </Grid>
    </Grid>
  );
};

export default UserPage;
