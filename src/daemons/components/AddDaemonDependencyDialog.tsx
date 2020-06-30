import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  InputLabel
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Daemon, UpdateDaemon } from '../models/daemon';
import DaemonSelect from './DaemonSelect';

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
interface FormState {
  dependency: string
}

export interface AddDaemonDependencyDialogProps {
  open: boolean;
  onClose: () => void;

  daemon: Daemon;
  onAdd: (data: UpdateDaemon) => Promise<any>;
}

// Component
const AddDaemonDependencyDialog = (props: AddDaemonDependencyDialogProps) => {
  const {
    open, onClose,
    daemon, onAdd
  } = props;

  // Form
  const { errors, control, handleSubmit, formState } = useForm<FormState>({ mode: 'onChange' });

  // Callbacks
  const handleClose = () => {
    if (!formState.isSubmitting) {
      onClose();
    }
  }

  const handleAdd = async ({ dependency }: FormState) => {
    await onAdd({
      dependencies: [...daemon.dependencies.map(dmn => dmn.id), dependency]
    });

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
      <DialogContent>
        <FormControl
          variant="outlined" fullWidth className={styles.field}
          error={!!errors.dependency}
        >
          <InputLabel>Dépendance</InputLabel>
          <Controller
            name="dependency"
            control={control} as={DaemonSelect}
            rules={{ required: true }}
            label="Dépendance" required
            blacklist={[daemon, ...daemon.dependencies]}
          />
          { errors.dependency?.message && (
            <FormHelperText>{ errors.dependency.message }</FormHelperText>
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
            disabled={formState.isSubmitting || !formState.isValid}
            type="submit"
          >
            Ajouter
          </Button>
          { formState.isSubmitting && (
            <CircularProgress className={styles.progress} size={24} />
          ) }
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AddDaemonDependencyDialog;
