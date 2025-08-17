import React from 'react';
import LegacyShell from './pages/LegacyShell';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <LegacyShell />
    </ErrorBoundary>
  );
}
