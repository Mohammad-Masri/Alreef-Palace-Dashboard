import { MenuItem, TextField } from '@mui/material';
import React from 'react';

const MySelect = ({ label, id, name, options, optionValueKey, optionLabelKey, ...props }) => {
  return (
    <TextField select focused fullWidth id={id} name={name} label={label} {...props}>
      {options.map((o) => {
        return (
          <MenuItem key={o[optionValueKey]} value={o[optionValueKey]}>
            {o[optionLabelKey]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default MySelect;
