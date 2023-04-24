import React from 'react';
import Navbar from './Header/Header';
import Footer from './Footer/Footer';

import { Layout } from 'antd';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function Layouts() {
  const location = useLocation();

  return localStorage.getItem('access_token') ? (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Layout className='site-layout'>
        <Navbar />
        <Outlet />
        <Footer />
      </Layout>
    </Layout>
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
}
