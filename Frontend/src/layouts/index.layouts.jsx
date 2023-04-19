import React from 'react';
import Navbar from './Header/Header';
import Footer from './Footer/Footer';
import SideBar from './Sidebar/Sidebar';

import { Layout } from 'antd';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
export default function Layouts() {
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideBar />
      <Layout className='site-layout'>
        <Navbar />
        <Outlet />
        <Footer />
      </Layout>
    </Layout>
  );
}
