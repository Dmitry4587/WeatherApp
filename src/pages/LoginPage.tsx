import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import AuthForm, { FormTypes } from '../components/AuthForm';
import { selectLoginError, selectLoginFormStatus } from '../app/slices/user/selectors';
import SnackBarItem from '../components/SnackBarItem';
import { itemStatus } from '../app/slices/user/slice';

const LoginPage = () => {
  const formStatus = useAppSelector(selectLoginFormStatus);
  const formError = useAppSelector(selectLoginError);

  return (
    <>
      <Box sx={{ top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <AuthForm text={FormTypes.LOGIN} formStatus={formStatus} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', m: '0 auto', mt: '15px' }}>
          <Typography sx={{ fontSize: '16px' }} color='primary'>
            Dont have an account?
          </Typography>
          <NavLink to='/registr'>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }} color='secondary'>
              Registr
            </Typography>
          </NavLink>
        </Box>
      </Box>
      {formStatus === itemStatus.ERROR ? <SnackBarItem text={formError} severity='error' /> : null}
    </>
  );
};

export default LoginPage;
