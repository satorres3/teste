import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: FC = () => {
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="sidebar">
      <Link to="/hub" className={location.pathname === '/hub' ? 'active' : ''}>Hub</Link>
      <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>Settings</Link>
      <Link
        to="/workspace/1"
        className={location.pathname.startsWith('/workspace') ? 'active' : ''}
      >
        Workspace (Example)
      </Link>
      <Link
        to="/workspace/1/knowledge"
        className={location.pathname.startsWith('/workspace') && location.pathname.includes('/knowledge') ? 'active' : ''}
      >
        Knowledge (Example)
      </Link>
      <button onClick={() => setIsToggled(!isToggled)}>
        Toggle: {isToggled ? 'On' : 'Off'}
      </button>
    </div>
  );
};

export default Sidebar;
