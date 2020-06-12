import React from 'react';
import { useForm } from 'react-hook-form';

import { Button, Dialog, DialogActions, DialogContent, TextField } from '@material-ui/core';

import { ClosableDialogTitle } from 'basics/components';

import { CreateDaemon } from '../models/daemon';

// Types
export interface AddDaemonDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (data: CreateDaemon) => void;
}

// Component
const AddDaemonDialog = (props: AddDaemonDialogProps) => {
  const {
    open, onClose,
    onAdd
  } = props;

  // Form
  const { errors, register, handleSubmit } = useForm<CreateDaemon>();

  // Callbacks
  const handleAdd = (data: CreateDaemon) => {
    onAdd(data);
    onClose();
  }

  // Render
  return (
    <Dialog
      maxWidth="xs" fullWidth
      open={open}
      onClose={() => onClose()}

      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(handleAdd)
      }}
    >
      <ClosableDialogTitle onClose={() => onClose()}>Nouveau daemon</ClosableDialogTitle>
      <DialogContent>
        <TextField
          label="Nom" fullWidth
          name="name" inputRef={register}
          error={!!errors.name} helperText={errors.name?.message}
        />
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => onClose()}>Annuler</Button>
        <Button color="primary" type="submit">Créer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDaemonDialog;
