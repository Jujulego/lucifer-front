import React, { ComponentType, ElementType, useMemo, useState } from 'react';

import { ExtendButtonBaseTypeMap } from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { Badge } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

import { useTableContext } from 'contexts/TableContext';
import Document, { AnyDocument } from 'data/document';
import { Filter } from 'utils/filter';

import TableAction, { TableActionClassKey, TableActionTypeMap } from './TableAction';

// Types
export interface TableFilterDialogProps {
  open: boolean;
  onClose: () => void;
}

export type TableFilterActionTypeMap<
  T extends Document = AnyDocument,
  P = {}, D extends ElementType = TableActionTypeMap<T>['defaultComponent']
> = ExtendButtonBaseTypeMap<{
  props: P & Omit<TableActionTypeMap<T, P, D>['props'], 'tooltip'> & {
    tooltip?: string;
    dialog?: ComponentType<TableFilterDialogProps>;
  };
  defaultComponent: D;
  classKey: TableActionClassKey;
}>;

export type TableFilterActionProps<
  T extends Document = AnyDocument,
  D extends ElementType = TableActionTypeMap<T>['defaultComponent'], P = {}
> = OverrideProps<TableFilterActionTypeMap<T, P, D>, D>;

// Utils
const removeEmptyFields = <T extends Document> (filter: Filter<T>) => (key: keyof Filter<T>): boolean => {
  const value = filter[key];
  if (Array.isArray(value)) return value.length !== 0;

  return !!value;
};

// Component
const TableFilterAction = <T extends Document = AnyDocument, D extends ElementType = TableActionTypeMap<T>['defaultComponent']> (props: { component?: D } & TableFilterActionProps<T, D>) => {
  // Props
  const {
    tooltip = "Filtres",
    dialog: DialogComponent,
    disabled,
    onClick,
    ...action
  } = props;

  // Contexts
  const { filtered, filter } = useTableContext<T>();

  // State
  const [open, setOpen] = useState(false);

  // Memos
  const count = useMemo(
    () => Object.tsKeys(filter).filter(removeEmptyFields(filter)).length,
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