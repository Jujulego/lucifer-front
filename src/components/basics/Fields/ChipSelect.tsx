import React from 'react';

import {
  Chip, MenuItem,
  FormControl, InputLabel, Select, FormHelperText,
  FormControlProps, SelectProps, ChipProps,
} from '@material-ui/core';

// Types
interface ChipSelectBaseProps {
  label?: string, helperText?: string,
  options: string[], value: string[],
  onChange: SelectProps['onChange'],

  ChipProps?: Omit<ChipProps, 'label'>,
  SelectProps?: Omit<SelectProps, 'multiple' | 'value' | 'onChange' | 'renderValue'>
}

export type ChipSelectProps =
  Omit<FormControlProps, keyof ChipSelectBaseProps> &
  ChipSelectBaseProps

// Component
const ChipSelect = (props: ChipSelectProps) => {
  // Props
  const {
    label, helperText,
    options, value, onChange,

    ChipProps, SelectProps,

    ...control
  } = props;

  // Render
  return (
    <FormControl {...control}>
      { label && <InputLabel>{ label }</InputLabel> }
      <Select {...SelectProps}
        multiple
        value={value} onChange={onChange}
        renderValue={selected => (
          <div>
            { (selected as string[]).map(value => (
              <Chip {...ChipProps} key={value} label={value} />
            )) }
          </div>
        )}
      >
        { options.map(opt => (
          <MenuItem key={opt} value={opt}>
            { opt }
          </MenuItem>
        )) }
      </Select>
      { helperText && <FormHelperText>{ helperText }</FormHelperText> }
    </FormControl>
  );
};

export default ChipSelect;