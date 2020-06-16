import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  CircularProgress,
  Divider, IconButton,
  List,
  ListItem,
  ListItemIcon, ListItemSecondaryAction,
  ListItemText
} from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

import { Daemon, UpdateDaemon } from '../models/daemon';
import AddDaemonDependencyDialog from './AddDaemonDependencyDialog';

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
  const [removing, setRemoving] = useState<Record<string, boolean>>({});

  // Memos
  const ids = useMemo(() => daemon.dependencies.map(dmn => dmn.id), [daemon.dependencies]);

  // Effects
  useEffect(() => {
    const update = {
      dependencies: ids.filter(id => !removing[id])
    };

    onUpdate(update)
      .finally(() => {
        setRemoving(old => {
          update.dependencies.forEach(id => {
            old[id] = false;
          });

          return old;
        })
      });
  }, [removing]); // eslint-disable-line react-hooks/exhaustive-deps

  // Handlers
  const handleRemove = async (id: string) => {
    setRemoving(old => ({ ...old, [id]: true }));
  };

  // Render
  return (
    <>
      <List>
        { daemon.dependencies.map(dmn => (
          <Fragment key={dmn.id}>
            <ListItem
              button disabled={removing[dmn.id]}
              component={RouterLink} to={`/daemons/${dmn.id}/dependencies`}
            >
              <ListItemText primary={dmn.name || dmn.id} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end" disabled={removing[dmn.id]}
                  onClick={() => handleRemove(dmn.id)}
                >
                  { (removing[dmn.id]) ? (
                    <CircularProgress size={24} />
                  ) : (
                    <RemoveIcon />
                  ) }
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
      <AddDaemonDependencyDialog
        open={adding} onClose={() => setAdding(false)}
        daemon={daemon} onAdd={onUpdate}
      />
    </>
  );
};

export default DaemonDependenciesTab;
