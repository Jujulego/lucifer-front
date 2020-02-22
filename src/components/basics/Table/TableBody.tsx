import React, { ReactNode, useMemo } from 'react';

import {
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps
} from '@material-ui/core';

import { Order, useTableContext } from 'contexts/TableContext';
import { BaseDocument } from 'data/document';
import { Comparator, OrderByField, desc, stableSort } from 'utils/sort';

// Types
export interface TableBodyProps<T extends BaseDocument> extends Omit<MuiTableBodyProps, 'classes'> {
  children: (doc: T) => ReactNode
}

// Utils
function getSorting<T extends BaseDocument>(field: OrderByField<T>, order: Order): Comparator<T> {
  return order === 'desc' ? (a, b) => desc(a, b, field) : (a, b) => -desc(a, b, field);
}

// Component
const TableBody = <T extends BaseDocument> (props: TableBodyProps<T>) => {
  // Props
  const { children, ...body } = props;

  // Contexts
  const { filtered, ordering, paginator } = useTableContext<T>();

  // Memos
  const sorted = useMemo<T[]>(() => {
    if (ordering.field === undefined) return filtered;

    return stableSort(filtered, getSorting(ordering.field, ordering.order));
  }, [filtered, ordering]);

  const paginated = useMemo<T[]>(() => {
    if (!paginator) return sorted;

    const { page, rowsPerPage } = paginator;
    return sorted.slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  }, [paginator, sorted]);

  // Render
  if (paginated.length === 0) return null;

  return (
    <MuiTableBody {...body}>
      { paginated.map(children) }
    </MuiTableBody>
  )
};

export default TableBody;