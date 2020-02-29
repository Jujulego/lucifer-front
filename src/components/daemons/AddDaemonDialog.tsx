import React from 'react';
import { useForm } from 'react-hook-form';

import {
  Button, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid
} from '@material-ui/core';

import { DaemonUpdate } from 'data/daemon';

// Types
export interface AddDaemonDialogProps {
  open: boolean; onClose: () => void;
  onAdd: (data: DaemonUpdate) => void;
}

// Component
const AddDaemonDialog = (props: AddDaemonDialogProps) => {
  // Props
  const {
    open, onClose,
    onAdd
  } = props;

  // Form
  const { register, handleSubmit, errors, reset } = useForm<DaemonUpdate>();

  // Handlers
  const handleAdd = (data: DaemonUpdate) => {
    onAdd(data);
    onClose();
  };

  const handleReset = () => {
    reset();
    onClose();
  };

  // Render
  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth

      PaperProps={{
        component: "form",
        onSubmit: handleSubmit(handleAdd),
        onReset: handleReset
      }}
    >
      <DialogTitle>Nouveau daemon</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              label="Nom" fullWidth
              name="name" inputRef={register()}
              error={!!errors.name} helperText={errors.name?.message}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="reset" color="secondary">Annuler</Button>
        <Button type="submit" color="primary">Ajouter</Button>
      </DialogActions>
    </Dialog>
  )
};

export default AddDaemonDialog;
