import React, { memo } from 'react';
import { capitalize } from 'lodash';
import clsx from 'clsx';

import { Tooltip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import { LevelName, PermissionOptions } from 'utils/permissions';

// Types
export interface LevelLetterProps {
  active: boolean;
  name: LevelName;
  options: PermissionOptions;
}

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
  disabled: {
    color: palette.text.disabled,
    pointerEvents: 'none'
  }
}));

// Component
const LevelLetter = memo((props: LevelLetterProps) => {
  // Props
  const { active, name, options } = props;

  // Render
  const styles = useStyles();
  const option = options.level && options.level[name];
  if (option === null) return null;

  const text = capitalize(option || name);
  return (
    <Tooltip title={text}>
      <span className={clsx({ [styles.disabled]: !active })}>
        { text[0] }
      </span>
    </Tooltip>
  );
});

export default LevelLetter;