import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions,
  FormControl, InputLabel
} from '@material-ui/core';

import { useTableContext } from 'contexts/TableContext';
import Daemon from 'data/daemon';
import { Filter } from 'utils/filter';

import { TableFilterDialogProps } from 'components/basics/Table';
import UserSelect from 'components/users/UserSelect';

// Types
export type FilterDaemonDialogProps = TableFilterDialogProps

// Component
const FilterDaemonDialog = (props: FilterDaemonDialogProps) => {
  // Props
  const { open, onClose } = props;

  // Context
  const { filter, onFilter } = useTableContext<Daemon>();

  // Form
  const { control, handleSubmit, reset } = useForm<Filter<Daemon>>();

  // Handlers
  const handleFilter = (filter: Filter<Daemon>) => {
    onFilter(filter);
    onClose();
  };

  const handleReset = () => {
    reset(filter);
    onClose();
  };

  // Render
  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth

      PaperProps={{
        component: "form",
        onReset: handleReset,
        onSubmit: handleSubmit(handleFilter),
      }}
    >
      <DialogTitle>Filtres actifs</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Utilistateur</InputLabel>
          <Controller
            name="user" defaultValue={filter.user || ''}
            control={control} as={UserSelect}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button type="reset" color="secondary">Annuler</Button>
        <Button type="submit" color="primary">Filtrer</Button>
      </DialogActions>
    </Dialog>
  )
};

export default FilterDaemonDialog;
