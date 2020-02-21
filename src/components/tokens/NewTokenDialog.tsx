import React from 'react';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Paper,
  Typography, Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { background } from 'utils/colors';

import { CopyFab } from 'components/basics';

// Types
export interface NewTokenDialogProps {
  token: string;
  open: boolean;
  onClose: () => void;
}

// Styles
const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  paper: {
    padding: spacing(1),
    backgroundColor: background(palette, 2),
  },
  token: {
    wordBreak: 'break-all'
  },
  fab: {
    float: 'right',
    marginLeft: spacing(1),
    marginBottom: spacing(1)
  }
}));

// Component
const NewTokenDialog = (props: NewTokenDialogProps) => {
  // Props
  const {
    token,
    open, onClose
  } = props;

  // Render
  const styles = useStyles();

  return (
    <Dialog
      open={open} onClose={() => onClose()}
      maxWidth="xs" fullWidth
    >
      <DialogTitle>Nouveau token</DialogTitle>
      <DialogContent>
        <Paper elevation={0} classes={{ root: styles.paper }}>
          <CopyFab text={token} classes={{ root: styles.fab }} size="small" color="secondary" />
          <Typography classes={{ root: styles.token }}>{ token }</Typography>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose()}>Fermer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTokenDialog;