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
  const sorted = useMemo(
    () => daemons?.sort((a, b) => (a.name || a.id).localeCompare(b.name || b.id)),
    [daemons]
  );

  const filtered = useMemo(
    () => blacklist ? sorted?.filter(dmn => !blacklist.find(blk => blk.id === dmn.id)) : sorted,
    [sorted, blacklist]
  );

  // Render
  return (
    <Select {...props}
      value={value || ''}
      disabled={disabled || loading}
      IconComponent={loading ? SmallProgress : IconComponent}
    >
      { !required && (
        <MenuItem value=''>
          <em>Aucun daemon</em>
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
