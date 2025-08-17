import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const LegacyShell: FC = () => {
  const isAuthenticated = false; // TODO: replace with real auth check

  if (isAuthenticated) {
    return <Navigate to="/hub" replace />;
  }

  return (
    <div>
      <Sidebar />
      <div>Root Page (Restored)</div>
    </div>
  );
};

export default LegacyShell;
