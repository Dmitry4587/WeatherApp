import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { selectUserInfo } from '../../app/slices/user/selectors';

interface AuthProps {
  children: React.ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const user = useAppSelector(selectUserInfo);

  if (!user) {
    return <Navigate to='/login' />;
  }

  return <div>{children}</div>;
};

export default Auth;
