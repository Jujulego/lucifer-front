import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, FormLabel, FormGroup,
  Grid,
  TextField, MenuItem
} from '@material-ui/core';

import Permission, { PLvl, PName, PERMISSIONS } from 'data/permission';
import { usePermision } from 'store/users/hooks';
import {
  permissionOption, buildLevel, decomposeLevel,
  DecomposedLevel, LEVELS
} from 'utils/permissions';

import LevelCheckbox from './levels/LevelCheckbox';
import RestrictedAccess from './RestrictedAccess';

// Types
export interface EditPermissionDialogProps {
  open: boolean, onClose: () => void,
  permission?: Permission,
  blacklist?: PName[],
  onGrant?: (name: PName, level: PLvl) => void,
  onRevoke?: (name: PName) => void,
}

type FormState = DecomposedLevel & {
  name: PName | ''
};

// Component
const EditPermissionDialog = (props: EditPermissionDialogProps) => {
  // Props
  const {
    open, onClose,
    permission,
    blacklist = [],
    onGrant, onRevoke,
  } = props;

  // Users
  const allowed = usePermision("permissions", PLvl.UPDATE);

  // Form
  const level = decomposeLevel(permission?.level || PLvl.NONE);
  const { control, watch, errors, handleSubmit } = useForm<FormState>({
    defaultValues: { name: permission?.name || '', ...level }
  });

  // Handlers
  const handleGrant = onGrant && ((form: FormState) => {
    if (form.name) onGrant(form.name, buildLevel(form));
    onClose();
  });

  const handleRevoke = onRevoke && ((form: FormState) => {
    if (form.name) onRevoke(form.name);
    onClose();
  });

  // Render
  const opts = permissionOption(watch("name", permission?.name));

  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth

      PaperProps={{
        component: 'form',
        onSubmit: handleGrant && handleSubmit(handleGrant)
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
              { PERMISSIONS.filter(p => blacklist.indexOf(p) === -1).map(name => (
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
                  { LEVELS.map(name => (
                    <Grid key={name} item xs={6}>
                      <Controller
                        name={name} as={LevelCheckbox}
                        control={control}

                        options={opts} disabled={!allowed}
                      />
                    </Grid>
                  )) }
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
              type="button" color="primary" disabled={!handleRevoke}
              onClick={handleRevoke && handleSubmit(handleRevoke)}
            >
              Supprimer
            </Button>
          </RestrictedAccess>
        ) }
        { allowed && (
          <Button type="submit" color="primary" disabled={!handleGrant}>
            { permission ? "Modifier" : "Ajouter" }
          </Button>
        ) }
      </DialogActions>
    </Dialog>
  )
};

export default EditPermissionDialog;
