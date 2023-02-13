import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../app/hooks';
import AuthForm, { FormTypes } from '../components/AuthForm';
import { selectRegistrError, selectRegistrFormStatus } from '../app/slices/user/selectors';
import SnackBarItem from '../components/SnackBarItem';
import { itemStatus } from '../app/slices/user/slice';

const RegistrPage = () => {
  const formStatus = useAppSelector(selectRegistrFormStatus);
  const formError = useAppSelector(selectRegistrError);
  return (
    <>
      <Box sx={{ top: '50%', left: '50%', position: 'absolute', transform: 'translate(-50%, -50%)' }}>
        <AuthForm formStatus={formStatus} text={FormTypes.REG} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '300px', m: '0 auto', mt: '15px' }}>
          <Typography sx={{ fontSize: '16px' }} color='primary'>
            Already have an account?
          </Typography>
          <NavLink to='/login'>
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }} color='secondary'>
              Login
            </Typography>
          </NavLink>
        </Box>
      </Box>
      {formStatus === itemStatus.ERROR ? <SnackBarItem text={formError} severity='error' /> : null}
    </>
  );
};

export default RegistrPage;
