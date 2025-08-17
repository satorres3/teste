import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

const LegacyShell: FC = () => {
  return <Navigate to="/login" replace />;
};

export default LegacyShell;
