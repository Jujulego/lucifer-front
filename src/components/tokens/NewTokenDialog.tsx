import React from 'react';

import {
  IconButton,
  Dialog, DialogTitle, DialogContent,
  Paper,
  Typography, Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

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
  title: {
    display: 'flex',

    '& > h2': {
      flexGrow: 1,
    }
  },
  closeBtn: {
    marginTop: -8,
    marginBottom: -8,
  },
  paper: {
    marginBottom: spacing(2),
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
      <DialogTitle disableTypography classes={{ root: styles.title }}>
        <Typography component="h2" variant="h6">Nouveau token</Typography>
        <IconButton classes={{ root: styles.closeBtn }} edge="end" onClick={() => onClose()}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Paper elevation={0} classes={{ root: styles.paper }}>
          <CopyFab text={token} classes={{ root: styles.fab }} size="small" color="secondary" />
          <Typography classes={{ root: styles.token }}>{ token }</Typography>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default NewTokenDialog;