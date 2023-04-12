import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import SideBar from './Sidebar/Sidebar';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function Layouts() {
  return (
    <div className='App'>
      <Header />
      <SideBar />
      <Outlet />
      <Footer />
    </div>
  );
}
