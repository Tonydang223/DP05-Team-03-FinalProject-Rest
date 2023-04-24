import React from 'react';
import { Layout } from 'antd';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import SideBar from './Sidebar/Sidebar';
import ProtectedRoute from '../routes/protectedRoute.route';
import { useEffect } from 'react';
import { fetchUser } from '../services/axiosInstance';
import { useDispatch } from 'react-redux';
import { setAuth } from '../redux/slice/userSlice';

export default function Layouts() {
  const location = useLocation();
  const dispatch = useDispatch();

  const getProfile = async () => {
    const res = await fetchUser();
    dispatch(setAuth(res));
  };

  useEffect(() => {
    getProfile();
  }, []);

  return localStorage.getItem('authorization') ? (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <SideBar />
      {/* <Navbar /> */}
      <ProtectedRoute>
        <Outlet style={{ backgroundColor: '#fafafa' }} />
      </ProtectedRoute>
    </Layout>
  ) : (
    <Navigate to='/login' replace state={{ from: location }} />
  );
}
