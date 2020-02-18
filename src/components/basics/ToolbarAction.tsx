import React, { ElementType } from 'react';

import {
  ExtendButtonBaseTypeMap,
  IconButton, IconButtonClassKey, IconButtonTypeMap,
  Tooltip, TooltipProps
} from '@material-ui/core';

import { OverrideProps } from '@material-ui/core/OverridableComponent';

// Types
export type ToolbarActionClassKey = Exclude<IconButtonClassKey, 'colorPrimary' | 'colorSecondary'>;

export type ToolbarActionTypeMap<
  P = {}, D extends ElementType = IconButtonTypeMap['defaultComponent']
> = ExtendButtonBaseTypeMap<{
  props: P & Omit<IconButtonTypeMap<P, D>['props'], 'color'> & {
    tooltip: string,
    tooltipProps?: Omit<TooltipProps, 'title'>
  };
  defaultComponent: D;
  classKey: ToolbarActionClassKey;
}>;

export type ToolbarActionProps<
  D extends ElementType = IconButtonTypeMap['defaultComponent'], P = {}
> = OverrideProps<ToolbarActionTypeMap<P, D>, D>;

// Component
const ToolbarAction = <D extends ElementType = IconButtonTypeMap['defaultComponent']> (props: { component?: D } & ToolbarActionProps<D>) => {
  // Props
  const { children, tooltip, tooltipProps, ...button } = props;

  // Render
  return (
    <Tooltip {...tooltipProps} title={tooltip}>
      <IconButton {...button} color="inherit">
        { children }
      </IconButton>
    </Tooltip>
  );
};

export default ToolbarAction;