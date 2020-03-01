import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button, TextField,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel, FormHelperText,
  Grid
} from '@material-ui/core';

import { DaemonCreate } from 'data/daemon';

import UserSelect from 'components/users/UserSelect';

// Types
export interface AddDaemonDialogProps {
  open: boolean; onClose: () => void;
  onAdd: (data: DaemonCreate) => void;
}

// Component
const AddDaemonDialog = (props: AddDaemonDialogProps) => {
  // Props
  const {
    open, onClose,
    onAdd
  } = props;

  // Form
  const { control, register, handleSubmit, errors, reset } = useForm<DaemonCreate>();

  // Handlers
  const handleAdd = (data: DaemonCreate) => {
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
          <Grid item xs>
            <FormControl fullWidth required error={!!errors.user}>
              <InputLabel>Utilistateur</InputLabel>
              <Controller
                name="user"
                control={control} as={UserSelect}
                rules={{ required: "Utilisateur requis" }}
              />
              { errors.user && (
                <FormHelperText>{ errors.user.message }</FormHelperText>
              ) }
            </FormControl>
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
