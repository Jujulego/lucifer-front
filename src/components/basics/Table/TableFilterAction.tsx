import React, { ElementType, useMemo } from 'react';

import { Badge } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

import { useTableContext } from 'contexts/TableContext';

import { ToolbarAction, ToolbarActionDefaultElement, ToolbarActionProps } from 'components/basics/index';

// Types
type DefaultElement = ToolbarActionDefaultElement;

export type TableFilterActionProps<D extends ElementType = DefaultElement>
  = Omit<ToolbarActionProps<D>, 'tooltip'> & {
    tooltip?: string
  };

// Component
const TableFilterAction = <D extends ElementType = DefaultElement> (props: { component?: D } & TableFilterActionProps<D>) => {
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