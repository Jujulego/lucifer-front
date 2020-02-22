import React, { ReactNode } from 'react';

import {
  TableCell, TableSortLabel,
  TableCellProps
} from '@material-ui/core';

import { useTableContext } from 'contexts/TableContext';
import { BaseDocument } from 'data/document';
import { OrderByField } from 'utils/sort';

// Types
export interface TableSortCellProps<T extends BaseDocument> extends Omit<TableCellProps, 'sortDirection'> {
  field: OrderByField<T>,
  children: ReactNode
}

// Component
const TableSortCell = <T extends BaseDocument> (props: TableSortCellProps<T>) => {
  // Props
  const {
    field, children,
    ...cell
  } = props;

  // Context
  const { ordering, onOrderBy } = useTableContext<T>();

  // Render
  return (
    <TableCell {...cell}
      sortDirection={ordering.field === field ? ordering.order : false}
    >
      <TableSortLabel
        active={ordering.field === field}
        direction={ordering.field === field ? ordering.order : 'asc'}
        onClick={() => onOrderBy(field)}
      >
        { children }
      </TableSortLabel>
    </TableCell>
  )
};

export default TableSortCell;