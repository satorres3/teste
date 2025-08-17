import React, { FC } from 'react';
import Sidebar from '../components/Sidebar';

const Hub: FC = () => {
  return (
    <div>
      <Sidebar />
      <div id="hub-page" className="page-view">
        <header className="app-header">
          <div className="header-left">
            <div id="hub-app-logo" className="app-logo small">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth={5} />
                <path d="M20 35 L50 50 L80 35 M50 50 L50 80" fill="none" stroke="currentColor" strokeWidth={4} />
              </svg>
            </div>
            <span id="hub-header-title" className="header-title">The Hub</span>
          </div>
          <div className="header-right">
            <button id="settings-btn" className="header-icon-btn" aria-label="Open Settings">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </button>
            <div className="user-profile-menu">
              <button className="user-profile-trigger" aria-haspopup="true" aria-expanded="false">
                <div className="user-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx={12} cy={7} r={4} /></svg>
                </div>
                <span className="user-name">Alex Thorne</span>
                <svg className="chevron-down" xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
              </button>
              <div className="user-profile-dropdown hidden">
                <div className="dropdown-user-info">
                  <strong>Alex Thorne</strong>
                  <span>alex.thorne@example.com</span>
                </div>
                <a href="#" className="dropdown-link" data-action="logout">
                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1={21} y1={12} x2={9} y2={12} /></svg>
                  <span>Logout</span>
                </a>
              </div>
            </div>
          </div>
        </header>
        <div className="hub-container">
          <h1 id="hub-title-text" className="hub-title">Welcome to the Hub</h1>
          <p id="hub-subtitle-text" className="hub-subtitle">Select a container to get started</p>
          <div id="container-grid" className="container-grid">
            {/* Container cards will be dynamically inserted here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub;
