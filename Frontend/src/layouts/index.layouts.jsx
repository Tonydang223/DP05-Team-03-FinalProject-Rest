import React from 'react';
import { Layout } from 'antd';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import SideBar from './Sidebar/Sidebar';

export default function Layouts() {
  const location = useLocation();

  return localStorage.getItem('access_token') ? (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideBar />
      <Layout className='site-layout'>
        {/* <Navbar /> */}
        <Outlet style={{ backgroundColor: '#fafafa' }} />
      </Layout>
    </Layout>
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
}
