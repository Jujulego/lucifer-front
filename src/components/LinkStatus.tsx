import React, { MouseEvent, useContext, useEffect, useState } from 'react';

import {
  Divider,
  IconButton, IconButtonProps,
  List, ListItem, ListItemIcon, ListItemText,
  Popover,
  Tooltip, Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SyncIcon from '@material-ui/icons/Sync';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';

import EventContext from 'contexts/EventContext';
import useAPI from 'utils/hooks/useAPI';

import pkg from '../../package.json';

// Types
export type LinkStatusProps = Omit<IconButtonProps<'button'>, 'onClick'>;

interface Version {
  version: string,
  commit?: string
}

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
  '@keyframes rotate': {
    from: { transform: 'rotate(360deg)' },
    to: { transform: 'rotate(0deg)' },
  },

  connecting: {
    animationName: '$rotate',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease'
  },
  header: {
    display: 'inline-block',
    width: 56
  },
  commit: {
    color: palette.text.secondary
  }
}));

// Component
const LinkStatus = (props: LinkStatusProps) => {
  // Context
  const { status } = useContext(EventContext);

  // State
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  // API
  const { data: version, reload } = useAPI.get<Version>('/api/version');

  // Effects
  useEffect(() => {
    if (status === 'connected') {
      reload();
    }
  }, [status, reload]);

  // Handlers
  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  // Render
  const styles = useStyles();

  return (
    <>
      <Tooltip title={status}>
        <IconButton {...props} onClick={handleOpen}>
          { (status === 'connected') && <SwapVertIcon /> }
          { (status === 'connecting') && <SyncIcon classes={{ root: styles.connecting }} /> }
          { (status === 'broken') && <SyncProblemIcon /> }
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={anchor}
        keepMounted
        open={anchor != null} onClose={handleClose}
      >
        <List>
          { (status === 'connected') && (
            <ListItem>
              <ListItemIcon><SwapVertIcon /></ListItemIcon>
              <ListItemText>Connecté</ListItemText>
            </ListItem>
          ) }
          { (status === 'connecting') && (
            <ListItem>
              <ListItemIcon><SyncIcon classes={{ root: styles.connecting }} /></ListItemIcon>
              <ListItemText>Connection ...</ListItemText>
            </ListItem>
          ) }
          { (status === 'broken') && (
            <ListItem>
              <ListItemIcon><SyncProblemIcon /></ListItemIcon>
              <ListItemText>Déconnecté</ListItemText>
            </ListItem>
          ) }
          <Divider />
          <ListItem>
            <ListItemText primaryTypographyProps={{ noWrap: true }}>
              <span className={styles.header}>App</span>{ pkg.version }
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText primaryTypographyProps={{ noWrap: true }}>
              <span className={styles.header}>API</span>{ version?.version }
              { (version?.commit) && <em className={styles.commit}> @{ version?.commit }</em> }
            </ListItemText>
          </ListItem>
        </List>
      </Popover>
    </>
  );
};

export default LinkStatus;
