import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <div id='clouds'>
        <div className='cloud x1' />
        <div className='cloud x2' />
        <div className='cloud x3' />
        <div className='cloud x4' />
        <div className='cloud x5' />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
