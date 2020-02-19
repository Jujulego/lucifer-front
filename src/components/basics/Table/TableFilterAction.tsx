import React, { ComponentType, ElementType, useMemo, useState } from 'react';

import { ExtendButtonBaseTypeMap } from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { Badge } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

import { useTableContext } from 'contexts/TableContext';
import Document from 'data/document';
import { Filter } from 'utils/filter';

import { ToolbarAction, ToolbarActionClassKey, ToolbarActionTypeMap } from 'components/basics/index';

// Types
export interface TableFilterDialogProps {
  open: boolean;
  onClose: () => void;
}

export type TableFilterActionTypeMap<
  P = {}, D extends ElementType = ToolbarActionTypeMap['defaultComponent']
> = ExtendButtonBaseTypeMap<{
  props: P & Omit<ToolbarActionTypeMap<P, D>['props'], 'tooltip'> & {
    tooltip?: string;
    dialog?: ComponentType<TableFilterDialogProps>;
  };
  defaultComponent: D;
  classKey: ToolbarActionClassKey;
}>;

export type TableFilterActionProps<
  D extends ElementType = ToolbarActionTypeMap['defaultComponent'], P = {}
> = OverrideProps<TableFilterActionTypeMap<P, D>, D>;

// Utils
const removeEmptyFields = <T extends Document> (filter: Filter<T>) => (key: keyof Filter<T>): boolean => {
  const value = filter[key];
  if (Array.isArray(value)) return value.length !== 0;

  return !!value;
};

// Component
const TableFilterAction = <D extends ElementType = ToolbarActionTypeMap['defaultComponent']> (props: { component?: D } & TableFilterActionProps<D>) => {
  // Props
  const {
    tooltip = "Filtres",
    dialog: DialogComponent,
    onClick,
    ...action
  } = props;

  // Contexts
  const { filter } = useTableContext();

  // State
  const [open, setOpen] = useState(false);

  // Memos
  const count = useMemo(
    () => Object.keys(filter).filter(removeEmptyFields(filter)).length,
    [filter]
  );

  // Handlers
  const handleClick = (event: MouseEvent) => {
    if (DialogComponent) setOpen(true);
    if (onClick) onClick(event);
  };

  // Render
  return (
    <>
      <ToolbarAction {...action} onClick={handleClick} tooltip={tooltip}>
        <Badge badgeContent={count} color="primary">
          <FilterIcon />
        </Badge>
      </ToolbarAction>
      { DialogComponent && (
        <DialogComponent open={open} onClose={() => { setOpen(false); }} />
      ) }
    </>
  );
};

export default TableFilterAction;