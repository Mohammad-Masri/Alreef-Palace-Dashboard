import { Grid, Switch } from '@mui/material';

import React from 'react';
import RowGrid from '../RowGrid';

const MySwitch = ({ label, id, name, ...props }) => {
  return (
    <RowGrid
      children={
        <>
          <Grid item xs={9}>
            {label}
          </Grid>
          <Grid item xs={3}>
            <Switch id={id} name={name} label={label} {...props} />
          </Grid>
        </>
      }
    />
  );
};

export default MySwitch;
