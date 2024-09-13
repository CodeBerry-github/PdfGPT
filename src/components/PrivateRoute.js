import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Verify the token on the server-side
  fetch('/api/verify-token', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      if (!data.valid) {
        // Token is invalid, log out the user
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
      }
    })
    .catch(error => {
      console.error(error);
      return <Navigate to="/login" replace />;
    });

  return children; // Render the protected route if the token is valid
};

export default PrivateRoute;