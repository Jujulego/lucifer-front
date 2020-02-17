import React, { ChangeEvent, ComponentType, ElementType, useEffect, useState } from 'react';

import {
  TablePagination as MuiTablePagination,
  TablePaginationProps as MuiTablePaginationProps
} from '@material-ui/core';

import { useTableContext } from 'contexts/TableContext';
import { TablePaginationBaseProps } from '@material-ui/core/TablePagination/TablePagination';

// Types
type DefinedProps = 'count' | 'rowsPerPage' | 'page' | 'onChangePage' | 'onChangeRowsPerPage';
type DefaultElement = ComponentType<TablePaginationBaseProps>;

export type TablePaginationProps<D extends ElementType = DefaultElement>
  = Omit<MuiTablePaginationProps<D>, DefinedProps>;

// Constants
const DEFAULT_RPPO = [10, 25, 50, 100];

// Utils
function getFirst(rppo: TablePaginationProps['rowsPerPageOptions'] = DEFAULT_RPPO): number {
  const first = rppo[0];

  if (typeof first === "object") {
    return first.value;
  }

  return first;
}

// Component
const TablePagination = <D extends ElementType = DefaultElement> (props: { component: D } & TablePaginationProps<D>) => {
    // Props
    const {
      rowsPerPageOptions = DEFAULT_RPPO
    } = props;

    // State
    const [page, setPage]       = useState(0);
    const [rowsPerPage, setRPP] = useState(getFirst(rowsPerPageOptions));

    // Context
    const { filtered, onPaginate } = useTableContext();

    // Effects
    useEffect(() => {
      onPaginate({ page, rowsPerPage });
    }, [onPaginate, page, rowsPerPage]);

    // Handlers
    const handleChangeRPP = (event: ChangeEvent<HTMLInputElement>) => {
      setRPP(parseInt(event.target.value, 10));
      setPage(0);
    };

    const handleChangePage = (_: unknown, newPage: number) => {
      setPage(newPage);
    };

    // Render
    return (
      <MuiTablePagination
        {...props}
        count={filtered.length}

        page={page}
        onChangePage={handleChangePage}

        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRPP}
      />
    );
  };

export default TablePagination;