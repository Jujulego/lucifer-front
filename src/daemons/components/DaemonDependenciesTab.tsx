import React, { Fragment, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider, FormControl, IconButton, InputLabel,
  List,
  ListItem,
  ListItemIcon, ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

import { Daemon, UpdateDaemon } from '../models/daemon';
import DaemonSelect from './DaemonSelect';

// Types
export interface DaemonDependenciesProps {
  daemon: Daemon;
  onUpdate: (update: UpdateDaemon) => Promise<any>;
}

// Component
const DaemonDependenciesTab = (props: DaemonDependenciesProps) => {
  const { daemon, onUpdate } = props;

  // State
  const [adding, setAdding] = useState(false);
  const [dependency, setDependency] = useState<string>();

  // Memos
  const ids = useMemo(() => daemon.dependencies.map(dmn => dmn.id), [daemon.dependencies]);

  // Handlers
  const handleAdd = async () => {
    if (dependency) {
      await onUpdate({
        dependencies: [...ids, dependency]
      });
    }

    setAdding(false);
    setDependency(undefined);
  };

  const handleRemove = async (id: string) => {
    await onUpdate({
      dependencies: ids.filter(dmn => dmn !== id)
    });
  };

  // Render
  return (
    <>
      <List>
        { daemon.dependencies.map(dmn => (
          <Fragment key={dmn.id}>
            <ListItem
              button
              component={RouterLink} to={`/daemons/${dmn.id}/dependencies`}
            >
              <ListItemText primary={dmn.name || dmn.id} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleRemove(dmn.id)}>
                  <RemoveIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </Fragment>
        )) }
        <ListItem button onClick={() => setAdding(true)}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Ajouter" />
        </ListItem>
      </List>
      <Dialog open={adding} onClose={() => setAdding(false)}>
        <DialogContent>
          <FormControl variant="outlined" fullWidth>
            <InputLabel>Dépendance</InputLabel>
            <DaemonSelect
              label="Dépendance" value={dependency}
              blacklist={[daemon, ...daemon.dependencies]}
              onChange={(event) => setDependency(event.target.value as string)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={() => setAdding(false)}>
            Annuler
          </Button>
          <Button color="primary" onClick={handleAdd}>
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DaemonDependenciesTab;
