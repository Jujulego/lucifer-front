import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { AppDispatch, AppState } from 'app.store';

import { _popError } from '../errors.actions';

// Component
const ErrorSnackbar = () => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector(({ errors }: AppState) => errors.length > 0 ? errors[0] : null);

  // Handlers
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(_popError());
  };

  // Render
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={!!error} onClose={handleClose} autoHideDuration={6000}
    >
      <Alert
        severity='error' elevation={6} variant='filled'
        onClose={handleClose}
      >
        { error }
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
