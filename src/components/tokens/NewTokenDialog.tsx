import React, { useState } from 'react';
import copy from 'copy-to-clipboard';

import {
  Button, IconButton, Tooltip,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Paper, Grid,
  Typography, Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import { background } from 'utils/colors';

// Types
export interface NewTokenDialogProps {
  token: string;
  open: boolean;
  onClose: () => void;
}

// Styles
const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  paper: {
    marginRight: spacing(1),
    padding: spacing(1),
    backgroundColor: background(palette, 2),
  },
  token: {
    wordWrap: 'break-word'
  }
}));

// Component
const NewTokenDialog = (props: NewTokenDialogProps) => {
  // Props
  const {
    token,
    open, onClose
  } = props;

  // State
  const [tooltip, setTooltip] = useState(false);

  // Handlers
  const handleCopy = async () => {
    if (copy(token, { format: 'text/plain' })) {
      setTooltip(true);
      setTimeout(() => setTooltip(false), 1500);
    }
  };

  // Render
  const styles = useStyles();

  return (
    <Dialog
      open={open} onClose={() => onClose()}
      maxWidth="xs" fullWidth
    >
      <DialogTitle>Nouveau token</DialogTitle>
      <DialogContent>
        <Grid container wrap="nowrap">
          <Grid item xs zeroMinWidth>
            <Paper elevation={0} classes={{ root: styles.paper }}>
              <Typography classes={{ root: styles.token }}>{ token }</Typography>
            </Paper>
          </Grid>
          <Grid item xs="auto">
            <Tooltip
              title="Copié"
              open={tooltip} onOpen={() => setTooltip(true)} onClose={() => setTooltip(false)}
              disableFocusListener disableHoverListener disableTouchListener
            >
              <IconButton edge="end" onClick={handleCopy}>
                <FileCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose()}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTokenDialog;