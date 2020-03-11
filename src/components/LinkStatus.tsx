import React, { useContext } from 'react';

import {
  IconButton, IconButtonProps,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import SwapVertIcon from '@material-ui/icons/SwapVert';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';

import EventContext from 'contexts/EventContext';

// Types
export type LinkStatusProps = Omit<IconButtonProps<'button'>, 'onClick'>;

// Styles
const useStyles = makeStyles({
  '@keyframes rotate': {
    from: { transform: 'rotate(360deg)' },
    to: { transform: 'rotate(0deg)' },
  },

  connecting: {
    animationName: '$rotate',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease'
  }
});

// Component
const LinkStatus = (props: LinkStatusProps) => {
  // Context
  const { status } = useContext(EventContext);

  // Render
  const styles = useStyles();

  return (
    <Tooltip title={status}>
      <IconButton {...props}>
        { (status === 'connected') && <SwapVertIcon /> }
        { (status === 'connecting') && <SyncIcon classes={{ root: styles.connecting }} /> }
        { (status === 'broken') && <SyncProblemIcon /> }
      </IconButton>
    </Tooltip>
  );
};

export default LinkStatus;
