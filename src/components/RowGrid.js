import { Grid } from '@mui/material';
import React from 'react';

const RowGrid = ({ children, ...props }) => {
  return (
    <Grid container direction="row" justifyContent="flex-end" alignItems="center" spacing={1} {...props}>
      {children}
    </Grid>
  );
};

export default RowGrid;
