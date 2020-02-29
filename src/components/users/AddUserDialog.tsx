import React from 'react';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Grid,
  TextField
} from '@material-ui/core';

import { Credentials } from 'data/user';
import { PasswordField } from 'components/basics/Fields';

// Types
export interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (cred: Credentials) => void;
}

type FormState = Credentials & { confirm: string };

// Component
const AddUserDialog = (props: AddUserDialogProps) => {
  // Props
  const { open, onClose, onAdd } = props;

  // Form
  const { register, getValues, handleSubmit, errors, reset } = useForm<FormState>();

  // Handlers
  const samePassword = (value: string) => {
    const { password } = getValues();
    return value === password || 'Les mots de passe doivent correspondre';
  };

  const handleAdd = (form: FormState) => {
    onAdd({ email: form.email, password: form.password });
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
      <DialogTitle>Nouvel utilisateur</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              label="Email" fullWidth required
              name="email" inputRef={
                register({
                  required: true,
                  validate: (value: string) => validator.isEmail(value) || "Email invalide"
                })
              }
              error={!!errors.email} helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs>
            <PasswordField
              label="Mot de passe" fullWidth required
              name="password" inputRef={
                register({
                  required: true,
                  minLength: { value: 8, message: "8 caractères minimum" }
                })
              }
              error={!!errors.password} helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs>
            <PasswordField
              label="Confirmation" fullWidth required
              name="confirm" inputRef={
                register({
                  required: true,
                  validate: samePassword
                })
              }
              error={!!errors.confirm} helperText={errors.confirm?.message}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button type="reset" color="secondary">Annuler</Button>
        <Button type="submit" color="primary">Ajouter</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
