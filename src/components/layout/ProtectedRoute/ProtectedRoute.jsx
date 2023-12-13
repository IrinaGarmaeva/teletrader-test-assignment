import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, element }) {
  return (
    isLoggedIn ? element : <Navigate to="/" replace />
  );
}

export default ProtectedRoute;
