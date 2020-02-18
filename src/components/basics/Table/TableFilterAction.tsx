import React, { ElementType, useMemo } from 'react';

import { ExtendButtonBaseTypeMap } from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { Badge } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

import { useTableContext } from 'contexts/TableContext';

import { ToolbarAction, ToolbarActionClassKey, ToolbarActionTypeMap } from 'components/basics/index';

// Types
export type TableFilterActionTypeMap<
  P = {}, D extends ElementType = ToolbarActionTypeMap['defaultComponent']
> = ExtendButtonBaseTypeMap<{
  props: P & Omit<ToolbarActionTypeMap<P, D>['props'], 'tooltip'> & {
    tooltip?: string
  };
  defaultComponent: D;
  classKey: ToolbarActionClassKey;
}>;

export type TableFilterActionProps<
  D extends ElementType = ToolbarActionTypeMap['defaultComponent'], P = {}
> = OverrideProps<TableFilterActionTypeMap<P, D>, D>;

// Component
const TableFilterAction = <D extends ElementType = ToolbarActionTypeMap['defaultComponent']> (props: { component?: D } & TableFilterActionProps<D>) => {
  // Props
  const { tooltip = "Filtres", ...action } = props;

  // Contexts
  const { filter } = useTableContext();

  // Memos
  const count = useMemo(() => Object.keys(filter).length, [filter]);

  // Render
  return (
    <ToolbarAction {...action} tooltip={tooltip}>
      <Badge badgeContent={count} color="primary">
        <FilterIcon />
      </Badge>
    </ToolbarAction>
  );
};

export default TableFilterAction;