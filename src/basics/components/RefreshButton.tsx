import React from 'react';

import { CircularProgress, Fade, IconButton } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles({
  root: {
    display: 'grid',
    justifyItems: 'center',

    '& > *': {
      gridArea: '1 / 1 / 2 / 2',
    }
  }
});

// Types
export interface RefreshButtonProps {
  refreshing: boolean;
  onClick?: () => void;
}

// Component
const RefreshButton = (props: RefreshButtonProps) => {
  const { refreshing, onClick } = props;

  // Render
  const styles = useStyles();

  return (
    <IconButton className={styles.root} onClick={onClick} disabled={refreshing}>
      <Fade in={refreshing}>
        <CircularProgress size={24} />
      </Fade>
      <Fade in={!refreshing}>
        <RefreshIcon />
      </Fade>
    </IconButton>
  );
};

export default RefreshButton;
