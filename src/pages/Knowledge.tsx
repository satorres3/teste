import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const Knowledge: FC = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <Sidebar />
      <div>Knowledge Page (Stub, ID: {id})</div>
    </div>
  );
};

export default Knowledge;
// TODO: replace with knowledge markup
