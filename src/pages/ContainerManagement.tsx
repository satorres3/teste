import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddContainerModal from '../components/AddContainerModal';

export default function ContainerManagement() {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  useEffect(() => {
    console.log('Route loaded: /settings/containers');
  }, []);
  return (
    <div id="container-management-page" className="page-view">
      <header className="app-header">
        <div className="header-left">
          <button
            className="back-to-settings-btn header-icon-btn"
            aria-label="Back to Settings"
            onClick={() => navigate('/settings')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span id="container-management-title" className="header-title">Container Management</span>
        </div>
        <div className="header-right">
          <button
            className="back-to-hub-btn header-icon-btn"
            aria-label="Go to Hub"
            onClick={() => navigate('/hub')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>
        </div>
      </header>
      <div className="settings-container">
        <div className="settings-section-header">
          <h1 className="settings-title">Container Management</h1>
          <button
            id="add-container-btn"
            className="modal-btn modal-btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            Add New
          </button>
        </div>
        <div id="container-management-grid" className="container-management-grid" />
      </div>
      <AddContainerModal open={showAddModal} onClose={() => setShowAddModal(false)} />
    </div>
  );
}
