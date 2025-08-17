import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Hub from './pages/Hub';
import SettingsHub from './pages/SettingsHub';
import GlobalSettings from './pages/GlobalSettings';
import Workspace from './pages/Workspace';
import Knowledge from './pages/Knowledge';
import ContainerManagement from './pages/ContainerManagement';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hub" element={<Hub />} />
          <Route path="/settings" element={<SettingsHub />} />
          <Route path="/settings/containers" element={<ContainerManagement />} />
          <Route path="/settings/global" element={<GlobalSettings />} />
          <Route path="/workspace/:id" element={<Workspace />} />
          <Route path="/workspace/:id/knowledge" element={<Knowledge />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
