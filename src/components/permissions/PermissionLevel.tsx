import React, { memo } from 'react';
import clsx from 'clsx';
import { capitalize } from 'lodash';

import { Typography, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Permission, { PermissionLevel as Lvl } from 'data/permission';
import { permissionOption } from 'utils/permissions';

// Types
interface DecomposedLevel {
  create: boolean, read: boolean, update: boolean, delete: boolean
}

interface LetterProps { active: boolean, value: string, option?: string }

export interface PermissionLevelProps {
  permission: Permission
}

// Styles
const useStyles = makeStyles({
  hide: {
    opacity: 0,
    pointerEvents: 'none'
  }
});

// Utils
const decompose = (level: Lvl): DecomposedLevel => ({
  create: (level & Lvl.CREATE) === Lvl.CREATE,
  read:   (level & Lvl.READ)   === Lvl.READ,
  update: (level & Lvl.UPDATE) === Lvl.UPDATE,
  delete: (level & Lvl.DELETE) === Lvl.DELETE,
});

// Components
const Letter = memo((props: LetterProps) => {
  // Props
  const { active, value, option } = props;

  // Render
  const styles = useStyles();
  const text = capitalize(option || value);

  return (
    <Tooltip title={text}>
      <span className={clsx({ [styles.hide]: !active })}>{ text[0] }</span>
    </Tooltip>
  );
});

const PermissionLevel = memo((props: PermissionLevelProps) => {
  // Props
  const { permission } = props;

  // Render
  const lvl = decompose(permission.level);
  const opts = permissionOption(permission.name);

  return (
    <Typography color="secondary">
      <Letter active={lvl.create} value="create" option={opts.level?.create} />
      <Letter active={lvl.read}   value="read"   option={opts.level?.read}   />
      <Letter active={lvl.update} value="update" option={opts.level?.update} />
      <Letter active={lvl.delete} value="delete" option={opts.level?.delete} />
    </Typography>
  )
});

export default PermissionLevel;