import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import {
  Table as MaterialTable,
  TableProps as MaterialTableProps
} from '@material-ui/core';

import TableContext, { Order, Ordering, SelectedState } from 'contexts/TableContext';
import Document from 'data/document';
import { Filter, toPredicate } from 'utils/filter';

// Types
export interface TableProps<T extends Document> extends MaterialTableProps {
  data: T[],
  blacklist?: string[],
  toolbar?: ReactNode,
  children?: ReactNode
}

// Component
const Table = <T extends Document> (props: TableProps<T>) => {
  // Props
  const {
    data, blacklist = [],
    toolbar,
    children,
    ...table
  } = props;

  // State
  const [filter, setFilter]     = useState<Filter<T>>({});
  const [ordering, setOrdering] = useState<Ordering<T>>({ order: 'asc' });
  const [selected, setSelected] = useState<SelectedState>({});

  // Effects
  useEffect(() => {
    setSelected({});
  }, [data]);

  // Memos
  const filtered = useMemo(
    () => data.filter(toPredicate(filter)),
    [data, filter]
  );

  const blacklistCount = useMemo(
    () => filtered.reduce((count, doc: T) => (blacklist.indexOf(doc._id) === -1) ? count : count + 1, 0),
    [blacklist, filtered]
  );

  const selectedCount = useMemo(
    () => filtered.reduce((acc, doc) => selected[doc._id] ? acc + 1 : acc, 0),
    [filtered, selected]
  );

  // Render
  const selectedAll = selectedCount >= (filtered.length - blacklistCount);

  const onOrderBy = (field: keyof T) => {
    let order: Order = 'asc';

    if (ordering.field === field && ordering.order === "asc") {
      order = "desc";
    }

    setOrdering({ field, order });
  };

  const onSelect = (id: string) => setSelected(old => ({ ...old, [id]: !old[id] }));
  const onSelectAll = () => {
    if (selectedAll) {
      setSelected({});
    } else {
      setSelected(filtered.reduce<SelectedState>((acc, doc) => {
        if (blacklist.indexOf(doc._id) === -1) {
          acc[doc._id] = true;
        }

        return acc;
      }, {}));
    }
  };

  return (
    <TableContext.Provider
      value={{
        blacklist, documents: data, filtered,
        filter, ordering,
        selected, selectedCount,
        selectedAll: selectedCount > 0 && selectedAll,
        onSelect,
        onSelectAll,
        onFilter: setFilter,
        onOrderBy
      }}
    >
      { toolbar }
      <MaterialTable {...table}>
        { children }
      </MaterialTable>
    </TableContext.Provider>
  );
};

export default Table;