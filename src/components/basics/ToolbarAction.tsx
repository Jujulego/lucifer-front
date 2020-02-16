import React, { ElementType } from 'react';

import {
  IconButton, ExtendButtonBase, IconButtonClassKey, IconButtonTypeMap,
  Tooltip, TooltipProps
} from '@material-ui/core';
import { OverrideProps } from '@material-ui/core/OverridableComponent';

// Types
export type ToolbarActionClassKey = Exclude<IconButtonClassKey, 'colorPrimary' | 'colorSecondary'>;

export type ToolbarActionTypeMap<
  P = {},
  D extends ElementType = IconButtonTypeMap['defaultComponent']
> = {
  props: Omit<IconButtonTypeMap<P, D>['props'], 'color'> & {
    tooltip: string,
    tooltipProps?: Omit<TooltipProps, 'title'>
  },
  defaultComponent: D,
  classKey: ToolbarActionClassKey
};

export type ToolbarActionProps<
  D extends ElementType = ToolbarActionTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ToolbarActionTypeMap<P, D>, D>;

// Component
const ToolbarAction: ExtendButtonBase<ToolbarActionTypeMap> = (props: ToolbarActionProps) => {
  // Props
  const { children, tooltip, tooltipProps, ...button } = props;

  // Render
  return (
    <Tooltip {...tooltipProps} title={tooltip}>
      <IconButton {...button} color="inherit">
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default ToolbarAction;