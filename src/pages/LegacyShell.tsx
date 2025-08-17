
import React, { FC } from 'react';
import Sidebar from '../components/Sidebar';

const LegacyShell: FC = () => {
  return (
    <div>
      <Sidebar />
      <div>Root Page (Restored)</div>
    </div>
  );
};

export default LegacyShell;

