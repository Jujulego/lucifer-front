import React, { memo } from 'react';
import { capitalize } from 'lodash';

import {
  Checkbox, FormControlLabel,
  CheckboxProps
} from '@material-ui/core';

import { LevelName, PermissionOptions } from 'utils/permissions';

// Types
export interface LevelCheckboxProps extends CheckboxProps {
  name: LevelName;
  options: PermissionOptions;
}

// Components
const LevelCheckbox = memo((props: LevelCheckboxProps) => {
  // Props
  const { name, options, ...checkbox } = props;

  // Render
  const option = options.level && options.level[name];
  if (option === null) return null;

  return (
    <FormControlLabel
      label={capitalize(option || name)}
      control={<Checkbox {...checkbox} />}
    />
  );
});

export default LevelCheckbox;