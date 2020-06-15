import React, { useState } from 'react';

import { DialogContent, DialogTitle, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { Add as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { ConfirmDialog, RefreshButton, TableAction, TableToolbar } from 'basics/components';
import { useConfirm } from 'basics/confirm.hooks';

import { Daemon } from '../models/daemon';
import { useDaemons } from '../daemons.hooks';
import AddDaemonDialog from '../components/AddDaemonDialog';
import DaemonTable from '../components/DaemonTable';

// Styles
const useStyles = makeStyles({
  content: {
    padding: 0
  }
});

// Component
const AllDaemonTable = () => {
  // State
  const [adding, setAdding] = useState(false);

  // Utils
  const { confirm, state: dialog } = useConfirm<Daemon[]>([]);

  // API
  const { daemons = [], loading, reload, create, remove } = useDaemons();

  // Callbacks
  const handleDelete = async (dmns: Daemon[]) => {
    if (await confirm(dmns)) {
      await remove(dmns.map(dmn => dmn.id))
    }
  };

  // Render
  const styles = useStyles();

  const toolbar = (
    <Paper square>
      <TableToolbar title="Daemons">
        <TableAction
          when="nothing"
          onClick={() => setAdding(true)}
        >
          <AddIcon />
        </TableAction>
        <TableAction
          when="some"
          onActivate={handleDelete}
        >
          <DeleteIcon />
        </TableAction>
        <RefreshButton refreshing={loading} onClick={reload} />
      </TableToolbar>
    </Paper>
  );

  return (
    <>
      <DaemonTable daemons={daemons} toolbar={toolbar} />
      <AddDaemonDialog
        open={adding} onClose={() => setAdding(false)}
        onAdd={create}
      />
      <ConfirmDialog state={dialog} fullWidth maxWidth="xs">
        { dmns => (
          <>
            <DialogTitle>Supprimer { dmns.length } daemons ?</DialogTitle>
            <DialogContent className={styles.content} dividers>
              <List>
                { dmns.map(dmn => (
                  <ListItem key={dmn.id}>
                    <ListItemText primary={dmn.name} secondary={dmn.id} />
                  </ListItem>
                )) }
              </List>
            </DialogContent>
          </>
        ) }
      </ConfirmDialog>
    </>
  );
};

export default AllDaemonTable;
