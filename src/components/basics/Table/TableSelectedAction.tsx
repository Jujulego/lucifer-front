import React, { ElementType, MouseEvent } from 'react';

import { ExtendButtonBaseTypeMap } from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { useTableContext } from 'contexts/TableContext';
import Document from 'data/document';

import {
  ToolbarAction, ToolbarActionTypeMap, ToolbarActionClassKey
} from 'components/basics/index';

// Types
export type TableSelectedActionTypeMap<
  T extends Document, P = {}, D extends ElementType = ToolbarActionTypeMap['defaultComponent']
> = ExtendButtonBaseTypeMap<{
  props: P & ToolbarActionTypeMap<P, D>['props'] & {
    onActivate?: (documents: T[]) => void
  };
  defaultComponent: D;
  classKey: ToolbarActionClassKey;
}>;

export type TableSelectedActionProps<
  T extends Document, D extends ElementType = ToolbarActionTypeMap['defaultComponent'], P = {}
> = OverrideProps<TableSelectedActionTypeMap<T, P, D>, D>;

// Component
const TableSelectedAction = <T extends Document, D extends ElementType = ToolbarActionTypeMap['defaultComponent']> (props: { component?: D } & TableSelectedActionProps<T, D>) => {
  // Props
  const {
    children, tooltip,
    onActivate, onClick,
    ...action
  } = props;

  // Contexts
  const { filtered, selected, selectedCount } = useTableContext<T>();

  // Handlers
  const handleClick = onActivate ?
    ((event: MouseEvent<HTMLButtonElement>) => {
      // Get selected components
      const docs = filtered.filter(doc => selected[doc._id]);

      // Events !
      if (onClick) onClick(event);
      onActivate(docs);
    }) : onClick;

  // Render
  if (selectedCount === 0) return null;
  return (
    <ToolbarAction tooltip={tooltip} {...action} onClick={handleClick}>
      { children }
    </ToolbarAction>
  );
};

export default TableSelectedAction;