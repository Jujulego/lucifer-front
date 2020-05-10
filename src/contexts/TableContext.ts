import { createContext, useContext } from 'react';

import { Filter } from 'utils/filter';
import { OrderByField } from 'utils/sort';

// Types
export interface Document {
  readonly id: string;
}
export type AnyDocument = Document & { [extra in string | symbol | number]: any };

export interface SelectedState { [id: string]: boolean }

export type Order = 'asc' | 'desc'
export interface Ordering<T extends Document> {
  field?: OrderByField<T>,
  order: Order
}

export interface Paginator {
  page: number, rowsPerPage: number
}

interface BaseTableContextProps<T extends Document> {
  blacklist: string[],
  documents: T[],
  filter: Filter<T>, filtered: T[],
  ordering: Ordering<T>,

  selectedAll: boolean,
  selectableCount: number,
  selectedCount: number,
  selected: SelectedState,

  paginator?: Paginator,

  onSelect: (id: string) => void,
  onSelectAll: () => void,
  onFilter: (filter: Filter<T>) => void,
  onPaginate: (paginator: Paginator) => void
}

export type TableContextProps<T extends Document> = BaseTableContextProps<T> & {
  onOrderBy: (field: OrderByField<T>) => void
};

type TableContextDefaults = BaseTableContextProps<AnyDocument> & {
  onOrderBy: (field: any) => void
};

// Default values
const tableDefaults: TableContextDefaults = {
  blacklist: [],
  documents: [],
  filter: {}, filtered: [],
  ordering: { order: 'asc' },

  selectedAll: false,
  selectableCount: 0, selectedCount: 0,
  selected: {},

  onSelect: () => {},
  onSelectAll: () => {},
  onFilter: () => {},
  onOrderBy: () => {},
  onPaginate: () => {}
};

// Context
const TableContext = createContext(tableDefaults);

// Hook
export function useTableContext<T extends Document = AnyDocument>(): TableContextProps<T> {
  return useContext(TableContext);
}

export default TableContext;
