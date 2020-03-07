import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Grid } from '@material-ui/core';

import { PLvl, PName } from 'data/permission';
import { DaemonUpdate } from 'data/daemon';

import { AppDispatch } from 'store';
import { useDaemon } from 'store/daemons/hooks';
import {
  createDaemonToken,
  deleteDaemonToken,
  getDaemon,
  grantDaemon,
  revokeDaemon,
  updateDaemon
} from 'store/daemons/thunks';

import PermissionCard from 'components/permissions/PermissionCard';
import RestrictedAccess from 'components/permissions/RestrictedAccess';

import TokenTable from 'components/tokens/TokenTable';

import DataCard from './DataCard';

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
  const handleUpdate = (update: DaemonUpdate) => { dispatch(updateDaemon(id, update)) };

  const handleGrant = (name: PName, lvl: PLvl) => { dispatch(grantDaemon(id, name, lvl)) };
  const handleRevoke = (name: PName) => { dispatch(revokeDaemon(id, name)) };

  const handleAddToken = async () => await dispatch(createDaemonToken(id, ["Front"]));
  const handleDeleteToken = (tokenId: string) => { dispatch(deleteDaemonToken(id, tokenId)) };

  // Effects
  useEffect(() => { handleRefresh() }, [handleRefresh]);

  // Render
  if (!daemon) return null;

  return (
    <RestrictedAccess name="daemons" level={PLvl.READ}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <DataCard daemon={daemon} onUpdate={handleUpdate} />
        </Grid>
        <Grid item xs={4}>
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
    </RestrictedAccess>
  );
};

export default DaemonPage;
