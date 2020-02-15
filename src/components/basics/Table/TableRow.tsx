import React, { MouseEvent, ReactNode } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';

import {
  Checkbox,
  TableCell, TableRow as MuiTableRow,
  TableRowProps as MuiTableRowProps
} from '@material-ui/core';

import { useTableContext } from 'contexts/TableContext';
import Document from 'data/document';

// Types
export interface TableRowProps<T extends Document> extends Omit<MuiTableRowProps, 'selected' | 'onClick'> {
  doc?: T,
  children?: ReactNode
}

// Component
const TableRow = <T extends Document> (props: TableRowProps<T>) => {
  // Props
  const {
    doc, children,
    ...row
  } = props;

  // Contexts
  const ctx = useTableContext<T>();

  // Handlers
  const handleChange = doc ? () => ctx.onSelect(doc._id) : ctx.onSelectAll;
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
  };

  // Render
  const small = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));

  const selectable = doc ? ctx.blacklist.indexOf(doc._id) === -1 : true;
  const selected = doc ? (ctx.selected[doc._id] || false) : ctx.selectedAll;
  const indeterminate = !doc && ctx.selectedCount > 0 && !ctx.selectedAll;

  return (
    <MuiTableRow
      {...row} selected={selectable && doc && selected}
      onClick={(!selectable || !doc) ? undefined : handleChange}
    >
      { !small && (
        <TableCell padding="checkbox">
          { selectable && (
            <Checkbox
              checked={selected} indeterminate={indeterminate}
              onChange={handleChange} onClick={handleClick}
            />
          ) }
        </TableCell>
      ) }
      { children }
    </MuiTableRow>
  )
};

export default TableRow;