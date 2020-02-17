import React, { ElementType } from 'react';

import {
  IconButton, IconButtonClassKey, IconButtonProps, IconButtonTypeMap,
  Tooltip, TooltipProps
} from '@material-ui/core';

import { StyledProps } from 'utils/style';

// Types
type DefaultElement = IconButtonTypeMap['defaultComponent'];

export type ToolbarActionClassKey = Exclude<IconButtonClassKey, 'colorPrimary' | 'colorSecondary'>;
export type ToolbarActionDefaultElement = DefaultElement;
export type ToolbarActionProps<D extends ElementType = DefaultElement>
  = Omit<IconButtonProps<D>, 'color' | 'classes'> & StyledProps<ToolbarActionClassKey> & {
    tooltip: string,
    tooltipProps?: Omit<TooltipProps, 'title'>
  };

// Component
const ToolbarAction = <D extends ElementType = DefaultElement> (props: { component?: D } & ToolbarActionProps<D>) => {
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