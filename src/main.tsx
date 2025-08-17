import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import './styles/login.css';
import './styles/hub.css';
import './styles/settings.css';
import './styles/workspace.css';
import './styles/sidebar.css';
import './styles/chat.css';
import './styles/modal.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
