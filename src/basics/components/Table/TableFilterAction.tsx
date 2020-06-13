import React, { ComponentType, ElementType, useMemo, useState } from 'react';

import { ExtendButtonBase, ExtendButtonBaseTypeMap } from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { Badge } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

import { Filter } from 'utils/filter';

import { useTable } from '../../table.context';
import TableAction, { TableActionClassKey, TableActionTypeMap } from './TableAction';

// Types
export interface TableFilterDialogProps {
  open: boolean;
  onClose: () => void;
}

export type TableFilterActionTypeMap<
  P = {},
  D extends ElementType = 'button'
> = ExtendButtonBaseTypeMap<{
  props: P & Omit<TableActionTypeMap<any, P, D>['props'], 'tooltip'> & {
    tooltip?: string;
    dialog?: ComponentType<TableFilterDialogProps>;
  };
  defaultComponent: D;
  classKey: TableActionClassKey;
}>;

export type TableFilterActionProps<
  D extends ElementType = TableFilterActionTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<TableFilterActionTypeMap<P, D>, D>;

// Utils
const removeEmptyFields = (filter: Filter<any>) => (key: keyof Filter<any>): boolean => {
  const value = filter[key as string | number];
  if (Array.isArray(value)) return value.length !== 0;

  return !!value;
};

// Component
const TableFilterAction: ExtendButtonBase<TableFilterActionTypeMap> = <D extends ElementType> (props: { component?: D } & TableFilterActionProps<D>) => {
  // Props
  const {
    tooltip = "Filtres",
    dialog: DialogComponent,
    disabled,
    onClick,
    ...action
  } = props;

  // Contexts
  const { filtered, filter } = useTable();

  // State
  const [open, setOpen] = useState(false);

  // Memos
  const count = useMemo(
    () => Object.keys(filter)
      .filter(removeEmptyFields(filter))
      .length,
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
      <TableAction {...action}
        disabled={filtered.length === 0 || disabled}
        tooltip={tooltip}
        onClick={handleClick}
      >
        <Badge badgeContent={count} color="primary">
          <FilterIcon />
        </Badge>
      </TableAction>
      { DialogComponent && (
        <DialogComponent open={open} onClose={() => { setOpen(false); }} />
      ) }
    </>
  );
};

export default TableFilterAction;
