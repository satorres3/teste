import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Workspace: FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Sidebar />
      <div>Workspace Page (Stub, ID: {id})</div>
    </div>
  );
};

export default Workspace;
// TODO: replace with workspace markup
