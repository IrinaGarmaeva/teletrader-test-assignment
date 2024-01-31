import React, { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  isLoggedIn: boolean,
  element: ReactElement
};

function ProtectedRoute({ isLoggedIn, element }: ProtectedRouteProps) {
  return (
    isLoggedIn ? element : <Navigate to="/" replace />
  );
}

export default ProtectedRoute;
