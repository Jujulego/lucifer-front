import React, { useMemo } from 'react';

import {
  CircularProgress,
  CircularProgressProps,
  MenuItem,
  Select,
  SelectProps,
  useFormControl
} from '@material-ui/core';

import { Daemon, useDaemons } from '../daemons.hooks';

// Utils
const SmallProgress = (props: CircularProgressProps) => <CircularProgress {...props} size={20} />;

// Types
export type DaemonSelectProps = Omit<SelectProps, 'value'> & {
  value?: string;
  blacklist?: Daemon[];
};

// Component
const DaemonSelect = (props: DaemonSelectProps) => {
  const {
    blacklist,
    disabled, IconComponent, value
  } = props;

  // Context
  const ctx = useFormControl();
  const required = props.required || ctx?.required;

  // API
  const { daemons, loading } = useDaemons();

  // Memos
  const filtered = useMemo(
    () => blacklist ? daemons?.filter(dmn => !blacklist.find(blk => blk.id === dmn.id)) : daemons,
    [daemons, blacklist]
  )

  // Render
  return (
    <Select {...props}
      value={value || ''}
      disabled={disabled || loading}
      IconComponent={loading ? SmallProgress : IconComponent}
    >
      { !required && (
        <MenuItem value=''>
          <em>Pas d'utilisateur</em>
        </MenuItem>
      ) }
      { (!daemons && value) && (
        <MenuItem value={value}>
          { value }
        </MenuItem>
      ) }
      { filtered?.map(dmn => (
        <MenuItem key={dmn.id} value={dmn.id}>
          { dmn.name }
        </MenuItem>
      )) }
    </Select>
  );
};

export default DaemonSelect;
