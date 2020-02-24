import React, { memo } from 'react';
import clsx from 'clsx';
import { capitalize } from 'lodash';

import { Typography, Tooltip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

import Permission from 'data/permission';
import { permissionOption, decomposeLevel } from 'utils/permissions';

// Types
interface LetterProps { active: boolean, value: string, option?: string | null }

export interface PermissionLevelProps {
  permission: Permission
}

// Styles
const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    minWidth: 42,
    textAlign: 'center'
  },
  disabled: {
    color: palette.text.disabled,
    pointerEvents: 'none'
  }
}));

// Components
const Letter = memo((props: LetterProps) => {
  // Props
  const { active, value, option } = props;

  // Render
  const styles = useStyles();
  const text = capitalize(option || value);

  if (option === null) return null;
  return (
    <Tooltip title={text}>
      <span className={clsx({ [styles.disabled]: !active })}>
        { text[0] }
      </span>
    </Tooltip>
  );
});

const PermissionLevel = memo((props: PermissionLevelProps) => {
  // Props
  const { permission } = props;

  // Render
  const styles = useStyles();
  const lvl = decomposeLevel(permission.level);
  const opts = permissionOption(permission.name);

  return (
    <Typography color="secondary" classes={{ root: styles.root }}>
      <Letter active={lvl.create} value="create" option={opts.level?.create} />
      <Letter active={lvl.read}   value="read"   option={opts.level?.read}   />
      <Letter active={lvl.update} value="update" option={opts.level?.update} />
      <Letter active={lvl.delete} value="delete" option={opts.level?.delete} />
    </Typography>
  )
});

export default PermissionLevel;