import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { User } from 'users/models/user';
import { ClosableDialogTitle } from 'basics/components';
import UserSelect from 'users/components/UserSelect';

import { CreateDaemon } from '../models/daemon';

// Styles
const useStyles = makeStyles(({ spacing }) => ({
  field: {
    marginBottom: spacing(2)
  }
}));

// Types
export interface AddDaemonDialogProps {
  open: boolean;
  owner?: User;
  onClose: () => void;
  onAdd: (data: CreateDaemon) => void;
}

// Component
const AddDaemonDialog = (props: AddDaemonDialogProps) => {
  const {
    owner,
    open, onClose, onAdd
  } = props;

  // Form
  const { errors, control, register, handleSubmit } = useForm<CreateDaemon>();

  // Callbacks
  const handleAdd = (data: CreateDaemon) => {
    onAdd(data);
    onClose();
  }

  // Render
  const styles = useStyles();

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
          className={styles.field}
          variant="outlined" fullWidth
          name="name" inputRef={register}
          label="Nom"
          error={!!errors.name} helperText={errors.name?.message}
        />
        <FormControl
          variant="outlined" fullWidth className={styles.field}
          error={!!errors.ownerId}
        >
          <InputLabel>Propriétaire</InputLabel>
          <Controller
            name="ownerId" defaultValue={owner?.id} disabled={!!owner}
            control={control} as={UserSelect}
            label="Propriétaire"
          />
          { errors.ownerId && (
            <FormHelperText>{ errors.ownerId.message }</FormHelperText>
          ) }
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" onClick={() => onClose()}>Annuler</Button>
        <Button color="primary" type="submit">Créer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddDaemonDialog;
