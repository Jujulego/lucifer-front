import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';

import { useTableContext } from 'contexts/TableContext';
import Token from 'data/token';

import { ChipSelect, TableFilterDialogProps } from 'components/basics';
import { Filter } from 'utils/filter';

// Types
export type TokenFilterDialogProps = TableFilterDialogProps;

// Component
const TokenFilterDialog = (props: TokenFilterDialogProps) => {
  // Props
  const { open, onClose } = props;

  // Context
  const { documents, filter, onFilter } = useTableContext<Token>();

  // Form
  const { control, handleSubmit } = useForm<Filter<Token>>();

  // Memo
  const tags = useMemo(() => Array.from(
    documents.reduce<Set<string>>((acc, doc) => {
      doc.tags.forEach(tag => acc.add(tag));
      return acc;
    }, new Set())
  ), [documents]);

  // Handlers
  const handleFilter = (filter: Filter<Token>) => {
    onFilter(filter);
    onClose();
  };

  // Render
  return (
    <Dialog
      open={open} onClose={onClose}
      maxWidth="xs" fullWidth
    >
      <DialogTitle>Filtres actifs</DialogTitle>
      <DialogContent>
        <Controller
          name="tags" defaultValue={filter.tags || []}
          control={control} as={ChipSelect}

          label="Tags" fullWidth
          ChipProps={{ size: "small" }}

          options={tags}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => { onClose(); }} color="secondary">Annuler</Button>
        <Button onClick={handleSubmit(handleFilter)} color="primary">Filtrer</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TokenFilterDialog;