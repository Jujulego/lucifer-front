import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  Badge,
  CircularProgress, Collapse,
  Divider, IconButton,
  List,
  ListItem,
  ListItemIcon, ListItemSecondaryAction,
  ListItemText, Paper, PaperProps
} from '@material-ui/core';
import {
  Add as AddIcon,
  ArrowDownward,
  ArrowUpward,
  ExpandLess,
  ExpandMore,
  Remove as RemoveIcon
} from '@material-ui/icons';

import { Daemon, UpdateDaemon } from '../models/daemon';
import AddDaemonDependencyDialog from './AddDaemonDependencyDialog';

// Utils
const SquarePaper = (props: PaperProps) => <Paper {...props} square elevation={0}/>;

// Types
export interface DaemonDependenciesProps {
  daemon: Daemon;
  onUpdate: (update: UpdateDaemon) => Promise<any>;
}

// Component
const DaemonDependenciesTab = (props: DaemonDependenciesProps) => {
  const { daemon, onUpdate } = props;

  // State
  const [part, setPart] = useState('dependencies');
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
      <List disablePadding>
        <ListItem
          button onClick={() => setPart(old => old === 'dependencies' ? '' : 'dependencies')}
          ContainerComponent={SquarePaper}
        >
          <ListItemIcon>
            <Badge color="primary" badgeContent={daemon.dependencies.length}>
              <ArrowUpward />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Dépendances" />
          <ListItemSecondaryAction>
            { (part === 'dependencies') ? <ExpandMore /> : <ExpandLess /> }
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={part === 'dependencies'} timeout="auto" >
          <List disablePadding>
            { daemon.dependencies.map(dmn => (
              <Fragment key={dmn.id}>
                <Divider />
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
              </Fragment>
            )) }
            <Divider />
            <ListItem button onClick={() => setAdding(true)}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Ajouter" />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem
          button onClick={() => setPart(old => old === 'dependents' ? '' : 'dependents')}
          ContainerComponent={SquarePaper}
        >
          <ListItemIcon>
            <Badge color="primary" badgeContent={daemon.dependents.length}>
              <ArrowDownward />
            </Badge>
          </ListItemIcon>
          <ListItemText primary="Dépendents" />
          <ListItemSecondaryAction>
            { (part === 'dependents') ? <ExpandMore /> : <ExpandLess /> }
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={part === 'dependents'} timeout="auto">
          <List disablePadding>
            { daemon.dependents.map(dmn => (
              <Fragment key={dmn.id}>
                <Divider />
                <ListItem
                  button
                  component={RouterLink} to={`/daemons/${dmn.id}/dependencies`}
                >
                  <ListItemText primary={dmn.name || dmn.id} />
                </ListItem>
              </Fragment>
            )) }
          </List>
        </Collapse>
      </List>
      <AddDaemonDependencyDialog
        open={adding} onClose={() => setAdding(false)}
        daemon={daemon} onAdd={onUpdate}
      />
    </>
  );
};

export default DaemonDependenciesTab;
