import React, { ElementType, MouseEvent } from 'react';

import { ExtendButtonBaseTypeMap } from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

import { Document } from '../../models/document';
import { useTable } from '../../table.context';

import ToolbarAction, { ToolbarActionTypeMap, ToolbarActionClassKey } from '../ToolbarAction';

// Types
type When = "always" | "some" | "nothing"; // selected

export type TableActionClassKey = ToolbarActionClassKey;
export type TableActionTypeMap<
  T extends Document,
  P = {}, D extends ElementType = ToolbarActionTypeMap['defaultComponent']
> = ExtendButtonBaseTypeMap<{
  props: P & ToolbarActionTypeMap<P, D>['props'] & {
    when?: When,
    onActivate?: (documents: T[]) => void
  };
  defaultComponent: D;
  classKey: TableActionClassKey;
}>;

export type TableActionProps<
  T extends Document,
  D extends ElementType = ToolbarActionTypeMap['defaultComponent'], P = {}
> = OverrideProps<TableActionTypeMap<T, P, D>, D>;

// Component
const TableAction = <T extends Document, D extends ElementType = ToolbarActionTypeMap['defaultComponent']> (props: { component?: D } & TableActionProps<T, D>) => {
  // Props
  const {
    children, tooltip, when = "always",
    onActivate, onClick,
    ...action
  } = props;

  // Contexts
  const { filtered, selected, selectedCount } = useTable<T>();

  // Handlers
  const handleClick = onActivate ?
    ((event: MouseEvent<HTMLButtonElement>) => {
      // Get selected components
      const docs = filtered.filter(doc => selected[doc.id]);

      // Events !
      if (onClick) onClick(event);
      onActivate(docs);
    }) : onClick;

  // Render
  if (when === "some" && selectedCount === 0) return null;
  if (when === "nothing" && selectedCount !== 0) return null;

  return (
    <ToolbarAction tooltip={tooltip} {...action} onClick={handleClick}>
      { children }
    </ToolbarAction>
  );
};

export default TableAction;
