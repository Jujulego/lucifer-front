import React from 'react';

import { CircularProgress, Fade, IconButton, IconButtonProps } from '@material-ui/core';
import { Refresh as RefreshIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

// Styles
const useStyles = makeStyles({
  label: {
    display: 'grid',
    justifyItems: 'center',

    '& > *': {
      gridArea: '1 / 1 / 2 / 2',
    }
  }
});

// Types
export type RefreshButtonProps = IconButtonProps & {
  refreshing: boolean;
}

// Component
const RefreshButton = (props: RefreshButtonProps) => {
  const {
    disabled, refreshing,
    onClick,
    ...btn
  } = props;

  // Render
  const styles = useStyles();

  return (
    <IconButton {...btn}
      classes={{ label: styles.label }}
      disabled={disabled || refreshing}
      onClick={onClick}
    >
      <Fade in={refreshing} unmountOnExit mountOnEnter>
        <CircularProgress size={24} />
      </Fade>
      <Fade in={!refreshing}>
        <RefreshIcon />
      </Fade>
    </IconButton>
  );
};

export default RefreshButton;
