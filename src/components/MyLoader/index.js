import React from 'react';

import { CircularProgress, Grid } from '@mui/material';

const MyLoader = () => {
  return (
    <Grid container direction="column" justifyContent="center" alignItems="center">
      <Grid item>
        <CircularProgress variant="indeterminate" size={100} thickness={0.7} />
      </Grid>
    </Grid>
  );
};

export default MyLoader;
