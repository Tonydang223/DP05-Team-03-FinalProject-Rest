import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

export default function ProtectedRoute({ role }) {
  const isLoggedIn = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role');
  if (isLoggedIn && role === userRole) {
    return <Outlet />;
  }
  if (isLoggedIn && role !== userRole) {
    if (userRole === 'Admin') {
      return <Navigate to='/admin' />;
    }
    if (userRole === 'Manager') {
      return <Navigate to='/manager' />;
    }
    if (userRole === 'Staff') {
      return <Navigate to='/staff' />;
    }
  }

  return <Navigate to='/login' />;
}
