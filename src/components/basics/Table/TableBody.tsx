import React, { ReactNode, useMemo } from 'react';

import {
  TableBody as MaterialTableBody,
  TableBodyProps as MaterialTableBodyProps
} from '@material-ui/core';

import { Order, useTableContext } from 'contexts/TableContext';
import Document from 'data/document';
import { Comparator, OrderByField, desc, stableSort } from 'utils/sort';

// Types
export interface TableBodyProps<T extends Document> extends MaterialTableBodyProps {
  children: (doc: T) => ReactNode
}

// Utils
function getSorting<T extends Document>(field: OrderByField<T>, order: Order): Comparator<T> {
  return order === 'desc' ? (a, b) => desc(a, b, field) : (a, b) => -desc(a, b, field);
}

// Component
const TableBody = <T extends Document> (props: TableBodyProps<T>) => {
  // Props
  const { children, ...body } = props;

  // Contexts
  const { filtered, ordering } = useTableContext<T>();

  // Memos
  const sorted = useMemo<T[]>(() => {
    if (ordering.field === undefined) return filtered;
    return stableSort(filtered, getSorting(ordering.field, ordering.order));
  }, [filtered, ordering]);

  // Render
  return (
    <MaterialTableBody {...body}>
      { sorted.map(children) }
    </MaterialTableBody>
  )
};

export default TableBody;