import React from 'react';
import ReactDOM from 'react-dom';
import { SnackbarProvider, withSnackbar } from 'notistack';
import { Alert, Snackbar } from '@mui/material';

export const toast = (msg, variant) => {
  const Display = withSnackbar(({ message, variant }) => {
    const [open, setOpen] = React.useState(true);
    console.log('variant:', variant);

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    return (
      <Snackbar
        open={open}
        autoHideDuration={6000}
        variant={variant}
        onClose={handleClose}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Alert onClose={handleClose} severity={variant} color={variant} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    );
  });

  const mountPoint = document.getElementById('snackbarhelper');
  ReactDOM.render(
    <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
      <Display message={msg} variant={variant} />
    </SnackbarProvider>,
    mountPoint
  );
};

export const showSuccessSnackbarMessage = (msg) => {
  toast(msg, 'success');
};

export const showErrorSnackbarMessage = (msg) => {
  toast(msg, 'error');
};

export const showWarningSnackbarMessage = (msg) => {
  toast(msg, 'warning');
};
