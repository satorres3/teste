import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';

const LegacyShell: FC = () => {
  return <Navigate to="/hub" replace />;
};

export default LegacyShell;
