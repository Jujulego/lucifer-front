import React from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { capitalize } from 'lodash';

import {
  Button, Checkbox,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, FormLabel, FormGroup, FormControlLabel,
  Grid,
  TextField
} from '@material-ui/core';

import Permission, { PermissionLevel as Lvl, PermissionName } from 'data/permission';
import { usePermision } from 'store/users/hooks';
import { permissionOption, buildLevel, decomposeLevel, DecomposedLevel } from 'utils/permissions';

import RestrictedAccess from './RestrictedAccess';

// Types
export interface EditPermissionDialogProps {
  open: boolean, onClose: () => void,
  permission?: Permission,
  onGrant: (name: PermissionName, level: Lvl) => void,
  onRevoke: (name: PermissionName) => void,
}

interface LevelCheckboxProps {
  defaultValue: boolean,
  name: string, option?: string | null,
  control: Control
}

type FormState = DecomposedLevel & {
  name: PermissionName
};

// Components
const LevelCheckbox = (props: LevelCheckboxProps) => {
  // Props
  const {
    name, option,
    control
  } = props;

  // Render
  if (option === null) return null;

  const label = capitalize(option || name);
  return (
    <FormControlLabel
      label={label}
      control={
        <Controller
          name={name} as={Checkbox}
          control={control}
        />
      }
    />
  );
};

const EditPermissionDialog = (props: EditPermissionDialogProps) => {
  // Props
  const {
    open, onClose,
    permission,
    onGrant, onRevoke,
  } = props;

  // Users
  const allowed = usePermision("permissions", Lvl.UPDATE);

  // Form
  const level = decomposeLevel(permission?.level || Lvl.NONE);
  const { control, register, watch, errors, handleSubmit } = useForm<FormState>({
    defaultValues: { name: permission?.name, ...level }
  });

  // Handlers
  const handleGrant = (form: FormState) => {
    onGrant(form.name, buildLevel(form));
    onClose();
  };

  const handleRevoke = (form: FormState) => {
    onRevoke(form.name);
    onClose();
  };

  // Render
  const opts = permissionOption(watch("name", permission?.name));

  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth

      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(handleGrant)
      }}
    >
      <DialogTitle>Permission</DialogTitle>
      <DialogContent>
        <Grid container direction="column" spacing={2}>
          <Grid item xs>
            <TextField
              name="name" inputRef={register({ required: true })}

              label="Nom" required disabled={!allowed} fullWidth
              error={!!errors.name} helperText={errors.name?.message}
            />
          </Grid>
          <Grid item xs>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Niveau</FormLabel>
              <FormGroup>
                <Grid container>
                  <Grid item xs={6}>
                    <LevelCheckbox
                      defaultValue={level.create}
                      name="create" control={control}
                      option={opts?.level?.create}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LevelCheckbox
                      defaultValue={level.read}
                      name="read" control={control}
                      option={opts?.level?.read}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LevelCheckbox
                      defaultValue={level.update}
                      name="update" control={control}
                      option={opts?.level?.update}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LevelCheckbox
                      defaultValue={level.delete}
                      name="delete" control={control}
                      option={opts?.level?.delete}
                    />
                  </Grid>
                </Grid>
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        { permission && (
          <RestrictedAccess name="permissions" level={Lvl.DELETE}>
            <Button
              type="button" color="primary"
              onClick={handleSubmit(handleRevoke)}
            >
              Supprimer
            </Button>
          </RestrictedAccess>
        ) }
        { allowed && (
          <Button type="submit" color="primary">Ajouter</Button>
        ) }
      </DialogActions>
    </Dialog>
  )
};

export default EditPermissionDialog;