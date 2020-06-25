import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button, CircularProgress,
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
  },
  wrapper: {
    position: 'relative'
  },
  progress: {
    position: 'absolute',
    top: 'calc(50% - 12px)',
    left: 'calc(50% - 12px)',
  }
}));

// Types
export interface AddDaemonDialogProps {
  open: boolean;
  owner?: User;
  onClose: () => void;
  onAdd: (data: CreateDaemon) => Promise<any>;
}

// Component
const AddDaemonDialog = (props: AddDaemonDialogProps) => {
  const {
    owner,
    open, onClose, onAdd
  } = props;

  // Form
  const { errors, control, register, handleSubmit, formState } = useForm<CreateDaemon>();

  // Callbacks
  const handleClose = () => {
    if (!formState.isSubmitting) {
      onClose();
    }
  }

  const handleAdd = async (data: CreateDaemon) => {
    await onAdd(data);
    onClose();
  }

  // Render
  const styles = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}

      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(handleAdd)
      }}
    >
      <ClosableDialogTitle onClose={handleClose}>Nouveau daemon</ClosableDialogTitle>
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
        <Button
          color="secondary"
          disabled={formState.isSubmitting}
          onClick={handleClose}
        >
          Annuler
        </Button>
        <div className={styles.wrapper}>
          <Button
            color="primary"
            disabled={formState.isSubmitting}
            type="submit"
          >
            Créer
          </Button>
          { formState.isSubmitting && (
            <CircularProgress className={styles.progress} size={24} />
          ) }
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddDaemonDialog;
