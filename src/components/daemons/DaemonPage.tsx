import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { PName, PLvl } from 'data/permission';

import { AppDispatch } from 'store';
import { useDaemon } from 'store/daemons/hooks';
import {
  getDaemon,
  grantDaemon, revokeDaemon,
  createDaemonToken, deleteDaemonToken
} from 'store/daemons/thunks';

import PermissionCard from 'components/permissions/PermissionCard';
import TokenTable from 'components/tokens/TokenTable';

// Types
interface DaemonPageProps {
  id: string;
}

// Component
const DaemonPage = (props: DaemonPageProps) => {
  // Props
  const { id } = props;

  // Redux
  const dispatch = useDispatch<AppDispatch>();

  // Daemons
  const daemon = useDaemon(id);

  // Handlers
  const handleRefresh = useCallback(() => { dispatch(getDaemon(id)) }, [dispatch, id]);

  const handleGrant = (name: PName, lvl: PLvl) => { dispatch(grantDaemon(id, name, lvl)) };
  const handleRevoke = (name: PName) => { dispatch(revokeDaemon(id, name)) };

  const handleAddToken = async () => await dispatch(createDaemonToken(id, ["Front"]));
  const handleDeleteToken = (tokenId: string) => { dispatch(deleteDaemonToken(id, tokenId)) };

  // Effects
  useEffect(() => { handleRefresh() }, [handleRefresh]);

  // Render
  if (!daemon) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
      </Grid>
      <Grid item xs={8}>
        <PermissionCard
          holder={daemon} blacklist={["permissions"]}
          onRefresh={handleRefresh}
          onGrant={handleGrant} onRevoke={handleRevoke}
        />
      </Grid>
      <Grid item xs={12}>
        <TokenTable
          holder={daemon} permission="daemons"
          onRefresh={handleRefresh}
          onAdd={handleAddToken} onDelete={handleDeleteToken}
        />
      </Grid>
    </Grid>
  );
};

export default DaemonPage;
