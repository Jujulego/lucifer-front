import React from 'react';

import {
  Dialog, DialogContent,
  Paper,
  Typography, Theme
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { background } from 'utils/colors';

import { FullDaemon } from 'data/daemon';

import { ClosableDialogTitle, CopyButton } from 'components/basics';

// Types
export interface NewDaemonDialogProps {
  daemon: FullDaemon | null;
  open: boolean;
  onClose: () => void;
}

// Styles
const useStyles = makeStyles(({ palette, spacing }: Theme) => ({
  paper: {
    display: 'flex',
    marginBottom: spacing(2),
    padding: spacing(1),
    backgroundColor: background(palette, 2),
  },
  caption: {
    paddingLeft: spacing(1),
  },
  text: {
    flexGrow: 1,
    wordBreak: 'break-all'
  },
  fab: {
    float: 'right',
    marginLeft: spacing(1),
    marginBottom: spacing(1)
  }
}));

// Component
const NewDaemonDialog = (props: NewDaemonDialogProps) => {
  // Props
  const {
    daemon,
    open, onClose
  } = props;

  // Render
  const styles = useStyles();
  if (!daemon) return null;

  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <ClosableDialogTitle onClose={() => onClose()}>Nouveau daemon</ClosableDialogTitle>
      <DialogContent>
        <Typography classes={{ root: styles.caption }} variant="caption">Identifiant :</Typography>
        <Paper elevation={0} classes={{ root: styles.paper }}>
          <Typography classes={{ root: styles.text }}>{ daemon._id }</Typography>
          <CopyButton text={daemon._id} size="small" />
        </Paper>
        <Typography classes={{ root: styles.caption }} variant="caption">Secret :</Typography>
        <Paper elevation={0} classes={{ root: styles.paper }}>
          <Typography classes={{ root: styles.text }}>{ daemon.secret }</Typography>
          <CopyButton text={daemon.secret} size="small" />
        </Paper>
        <Typography align="center" color="primary" gutterBottom><em>Attention !</em> Le secret ne sera plus accessible !</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default NewDaemonDialog;
