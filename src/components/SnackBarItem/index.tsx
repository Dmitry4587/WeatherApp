import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

const SnackBarItem = ({ text, severity }: { text: string | null; severity: AlertColor }) => {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} variant='filled' sx={{ width: '100%' }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackBarItem;
