import React, { FC, useMemo } from 'react';

import { Badge } from '@material-ui/core';
import { FilterList as FilterIcon } from '@material-ui/icons';

import { useTableContext } from 'contexts/TableContext';

import { ToolbarAction, ToolbarActionProps } from 'components/basics/index';

// Types
export interface TableFilterActionProps extends Omit<ToolbarActionProps, 'tooltip'> {
  tooltip?: string
}

// Component
const TableFilterAction: FC<TableFilterActionProps> = (props) => {
  // Props
  const {
    tooltip = "Filtres",
    ...action
  } = props;

  // Contexts
  const { filter } = useTableContext();

  // Memos
  const count = useMemo(() => Object.keys(filter).length, [filter]);

  // Render
  return (
    <ToolbarAction
      {...action}
      tooltip={tooltip}
    >
      <Badge badgeContent={count} color="primary">
        <FilterIcon />
      </Badge>
    </ToolbarAction>
  );
};

export default TableFilterAction;