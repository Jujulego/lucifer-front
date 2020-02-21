import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { AppDispatch, AppState } from 'store';
import { popError } from 'store/errors/actions';

// Components
const ErrorSnackbar = () => {
  // Redux
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: AppState) => state.errors.length === 0 ? null : state.errors[0]);

  // Handlers
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    dispatch(popError());
  };

  // Render
  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      open={error != null} onClose={handleClose} autoHideDuration={6000}
    >
      <Alert
        severity="error" elevation={6} variant="filled"
        onClose={handleClose}
      >
        { error }
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;