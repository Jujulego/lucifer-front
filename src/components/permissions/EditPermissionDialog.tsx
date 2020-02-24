import React, { memo } from 'react';
import { Control, Controller, useForm } from 'react-hook-form';
import { capitalize } from 'lodash';

import {
  Button, Checkbox,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, FormLabel, FormGroup, FormControlLabel,
  Grid,
  TextField, MenuItem
} from '@material-ui/core';

import Permission, { PLvl, PName, PERMISSIONS } from 'data/permission';
import { usePermision } from 'store/users/hooks';
import { permissionOption, buildLevel, decomposeLevel, DecomposedLevel } from 'utils/permissions';

import RestrictedAccess from './RestrictedAccess';

// Types
export interface EditPermissionDialogProps {
  open: boolean, onClose: () => void,
  permission?: Permission,
  onGrant: (name: PName, level: PLvl) => void,
  onRevoke: (name: PName) => void,
}

interface LevelCheckboxProps {
  name: string, option?: string | null,
  control: Control
}

type FormState = DecomposedLevel & {
  name: PName
};

// Components
const LevelCheckbox = memo(({ name, option, control }: LevelCheckboxProps) => (
  (option === null) ? null : (
    <FormControlLabel
      label={capitalize(option || name)}
      control={
        <Controller
          name={name} as={Checkbox}
          control={control}
        />
      }
    />
  )
));

const EditPermissionDialog = (props: EditPermissionDialogProps) => {
  // Props
  const {
    open, onClose,
    permission,
    onGrant, onRevoke,
  } = props;

  // Users
  const allowed = usePermision("permissions", PLvl.UPDATE);

  // Form
  const level = decomposeLevel(permission?.level || PLvl.NONE);
  const { control, watch, errors, handleSubmit } = useForm<FormState>({
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
            <Controller
              name="name" as={TextField}
              control={control}
              rules={{ required: true }}

              select
              label="Nom" required disabled={!allowed} fullWidth
              error={!!errors.name} helperText={errors.name?.message}
            >
              { PERMISSIONS.map(name => (
                <MenuItem key={name} value={name}>
                  { permissionOption(name).name }
                </MenuItem>
              )) }
            </Controller>
          </Grid>
          <Grid item xs>
            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Niveau</FormLabel>
              <FormGroup>
                <Grid container>
                  <Grid item xs={6}>
                    <LevelCheckbox
                      name="create" control={control}
                      option={opts?.level?.create}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LevelCheckbox
                      name="read" control={control}
                      option={opts?.level?.read}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LevelCheckbox
                      name="update" control={control}
                      option={opts?.level?.update}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <LevelCheckbox
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
          <RestrictedAccess name="permissions" level={PLvl.DELETE}>
            <Button
              type="button" color="primary"
              onClick={handleSubmit(handleRevoke)}
            >
              Supprimer
            </Button>
          </RestrictedAccess>
        ) }
        { allowed && (
          <Button type="submit" color="primary">
            { permission ? "Modifier" : "Ajouter" }
          </Button>
        ) }
      </DialogActions>
    </Dialog>
  )
};

export default EditPermissionDialog;