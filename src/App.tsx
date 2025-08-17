import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LegacyShell from './pages/LegacyShell';
import Login from './pages/Login';
import Hub from './pages/Hub';
import SettingsHub from './pages/SettingsHub';
import GlobalSettings from './pages/GlobalSettings';
import Workspace from './pages/Workspace';
import Knowledge from './pages/Knowledge';

const App: FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LegacyShell />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/settings" element={<SettingsHub />} />
          <Route path="/settings/global" element={<GlobalSettings />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/workspace/:id/knowledge" element={<Knowledge />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
