import React, { memo } from 'react';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Permission from 'data/permission';
import { permissionOption, decomposeLevel, LEVELS } from 'utils/permissions';

import LevelLetter from './levels/LevelLetter';

// Types
export interface PermissionLevelProps {
  permission: Permission
}

// Styles
const useStyles = makeStyles({
  root: {
    minWidth: 42,
    textAlign: 'center'
  }
});

// Component
const PermissionLevel = memo((props: PermissionLevelProps) => {
  // Props
  const { permission } = props;

  // Render
  const styles = useStyles();
  const lvl = decomposeLevel(permission.level);
  const opts = permissionOption(permission.name);

  return (
    <Typography color="secondary" classes={{ root: styles.root }}>
      { LEVELS.map(name => (
        <LevelLetter
          key={name}
          name={name} active={lvl[name]}
          options={opts}
        />
      )) }
    </Typography>
  )
});

export default PermissionLevel;