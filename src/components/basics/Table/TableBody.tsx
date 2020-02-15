import React, { ReactNode, useMemo } from 'react';

import {
  TableBody as MuiTableBody,
  TableBodyProps as MuiTableBodyProps
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Order, useTableContext } from 'contexts/TableContext';
import Document from 'data/document';
import { Comparator, OrderByField, desc, stableSort } from 'utils/sort';
import { StyledProps } from 'utils/style';

// Styles
const useStyles = makeStyles({
  root: {
    '&:last-child > tr:last-child > td': {
      borderBottom: 'none'
    }
  }
});

// Types
export type TableBodyClassKey = 'root';
export interface TableBodyProps<T extends Document> extends Omit<MuiTableBodyProps, 'classes'>, StyledProps<TableBodyClassKey> {
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
  const styles = useStyles(props);

  return (
    <MuiTableBody {...body} classes={{ root: styles.root }}>
      { sorted.map(children) }
    </MuiTableBody>
  )
};

export default TableBody;