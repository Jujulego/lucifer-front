import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import {
  Toolbar as MuiToolbar,
  ToolbarProps as MuiToolbarProps,
  Typography
} from '@material-ui/core';

import { useTableContext } from 'contexts/TableContext';
import { StyledProps } from 'utils/style';

// Types
type Classes = 'root' | 'selected' | 'title';
export interface ToolbarProps extends Omit<MuiToolbarProps, 'classes'>, StyledProps<Classes> {
  title: string,
  children?: ReactNode
}

// Styles
const useStyles = makeStyles(({ shape, palette, spacing }) => {
  const secondary = palette.secondary.main;
  const text = palette.getContrastText(secondary);

  return {
    root: {
      paddingRight: spacing(1)
    },
    selected: {
      color: text,
      backgroundColor: secondary,
      borderTopLeftRadius: shape.borderRadius,
      borderTopRightRadius: shape.borderRadius
    },
    title: {
      flex: '1 1 100%'
    }
  }
});

// Component
const TableToolbar = (props: ToolbarProps) => {
  // Props
  const {
    title,
    children,
    ...toolbar
  } = props;

  // Context
  const { selectedCount } = useTableContext();

  // Render
  const styles = useStyles(props);

  return (
    <MuiToolbar {...toolbar} classes={{ root: clsx(styles.root, { [styles.selected]: selectedCount > 0 }) }}>
      { (selectedCount > 0) ? (
        <Typography classes={{ root: styles.title }} color="inherit" variant="subtitle1">{selectedCount} sélectionné(s)</Typography>
      ) : (
        <Typography classes={{ root: styles.title }} variant="h6">{title}</Typography>
      ) }
      { children }
    </MuiToolbar>
  );
};

export default TableToolbar;