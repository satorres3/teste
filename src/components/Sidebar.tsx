import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside id="container-sidebar" className="container-sidebar">
      <div className="sidebar-header">
        <h2 id="sidebar-container-title">Container</h2>
      </div>
      <nav className="sidebar-nav">
        <button id="new-chat-btn" className="sidebar-link new-chat-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={12} y1={5} x2={12} y2={19} /><line x1={5} y1={12} x2={19} y2={12} /></svg>
          <span>New Chat</span>
        </button>
        <ul id="sidebar-main-nav">
          <li>
            <Link
              id="sidebar-assistant-link"
              to="/hub"
              className={`sidebar-link${location.pathname === '/hub' ? ' active' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Assistant</span>
            </Link>
          </li>
          <li>
            <Link
              id="sidebar-knowledge-link"
              to="/workspace/1/knowledge"
              className={`sidebar-link${location.pathname.includes('/knowledge') ? ' active' : ''}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
              <span>Knowledge</span>
            </Link>
          </li>
        </ul>
        <div id="sidebar-integrations-section" className="sidebar-section" />
        <div id="sidebar-apps-section" className="sidebar-section" />
        <div id="sidebar-history-section" className="sidebar-section">
          <h3 className="sidebar-section-title">History</h3>
          <ul id="sidebar-history-list" />
        </div>
      </nav>
    </aside>
  );
}

