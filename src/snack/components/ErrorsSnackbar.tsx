import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';

import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import { ErrorsContext, ErrorState } from '../errors.context';

// Component
const ErrorsSnackbar = () => {
  // Context
  const { errors } = useContext(ErrorsContext);

  // State
  const [error, setError] = useState<ErrorState>();
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState(0);

  // Effects
  useEffect(() => {
    if (!error) {
      const err = errors.find(err => err.id > last);

      setError(err);
      setOpen(!!err);
    }
  }, [errors, last, error]);

  // Handlers
  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    if (error) setLast(error.id);
    setOpen(false);
  };

  const handleExited = () => {
    setError(undefined);
  }

  // Render
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open} autoHideDuration={6000}
      onClose={handleClose}
      onExited={handleExited}
    >
      { error && (
        <Alert
          severity='error' elevation={6} variant='filled'
          onClose={handleClose}
        >
          #{ error.id }: { error.error?.toString() }
        </Alert>
      ) }
    </Snackbar>
  );
};

export default ErrorsSnackbar;
