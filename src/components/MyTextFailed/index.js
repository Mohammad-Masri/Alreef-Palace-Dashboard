/* eslint-disable */
import React from 'react';
import { TextField } from '@mui/material';

function MyTextFailed({ label, id, name, ...props }) {
  return <TextField focused fullWidth id={id} name={name} label={label} {...props} />;
}
export default MyTextFailed;
