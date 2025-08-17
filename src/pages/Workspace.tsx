import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function Workspace() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('Route loaded: /workspace/:id');
  }, []);
  return (
    <>
    <div id="container-page" className="page-view">
      <Sidebar />
      <div className="container-page-container">
        <header className="app-header">
          <div className="header-left">
            <button id="sidebar-toggle-btn" className="header-icon-btn" aria-label="Toggle sidebar" onClick={() => console.log("Button clicked: Toggle sidebar")}>
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={6} x2={21} y2={6} /><line x1={3} y1={18} x2={21} y2={18} /></svg>
            </button>
            <button
              className="back-to-hub-btn header-icon-btn"
              aria-label="Back to Hub"
              onClick={() => navigate('/hub')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
            </button>
            <span id="container-page-title" className="header-title">Container Assistant</span>
          </div>
          <div className="header-right">
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
        <main className="container-main-content">
          <div className="chatbot-container">
            <div className="chat-active-config">
              <div id="model-select-container" className="custom-select" />
              <div id="persona-select-container" className="custom-select" />
            </div>
            <div id="chat-messages" className="chat-messages">
              <div id="chat-welcome" className="hidden">
                <div id="welcome-icon" className="welcome-icon" />
                <h2 id="welcome-title" className="welcome-title" />
                <p className="welcome-subtitle">Select a suggestion to start the conversation.</p>
                <div id="welcome-questions" className="welcome-questions" />
              </div>
            </div>
            <div id="attachment-preview" className="attachment-preview hidden">
              <span id="attachment-filename" />
              <button id="remove-attachment-btn" aria-label="Remove attachment" onClick={() => console.log("Button clicked: Remove attachment")}>×</button>
            </div>
            <form id="chat-form" className="chat-input-form" aria-label="Chat input form">
              <div className="chat-input-area">
                <textarea id="chat-input" className="chat-input" placeholder="Ask a question..." rows={1} defaultValue={""} />
                <div className="attachment-container">
                  <button type="button" id="attachment-btn" className="attachment-btn" aria-label="Attach file" onClick={() => console.log("Button clicked: Attach file")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                  </button>
                  <div id="attachment-options" className="attachment-options hidden">
                    <button type="button" id="upload-computer-btn" onClick={() => console.log("Button clicked: Upload from Computer")}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1={12} y1={3} x2={12} y2={15} /></svg>
                      <span>Upload from Computer</span>
                    </button>
                  </div>
                </div>
              </div>
              <input type="file" id="file-upload-input" className="hidden" accept="image/*,application/pdf,text/plain" />
              <button type="submit" id="send-chat-btn" className="send-chat-btn" aria-label="Send message" disabled onClick={() => console.log("Button clicked: Send message")}>
                <svg className="send-icon" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={22} y1={2} x2={11} y2={13} /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
                <div className="thinking-loader hidden">
                  <div className="dot" />
                  <div className="dot" />
                  <div className="dot" />
                </div>
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
    {/* Add Container Modal */}
    <div id="add-container-modal" className="modal-overlay hidden">
      <div className="modal-container modal-container-wide">
        <header className="modal-header">
          <h2 className="modal-title">Create New Container</h2>
          <button id="close-modal-btn" className="modal-close-btn" aria-label="Close modal">×</button>
        </header>
        <form id="add-container-form">
          <div className="modal-body">
            <div className="modal-layout">
              <div className="modal-col-left">
                <div className="form-group">
                  <label htmlFor="container-name-input" className="form-label">Container Name</label>
                  <input type="text" id="container-name-input" className="form-input" placeholder="e.g., Marketing, Q3 Product Launch" required />
                </div>
                <div className="form-group">
                  <label htmlFor="container-type-select" className="form-label">Container Type</label>
                  <select id="container-type-select" className="form-input" defaultValue="general">
                    <option value="general">General</option>
                    <option value="product">Product</option>
                    <option value="department">Department</option>
                  </select>
                </div>
                <div id="container-website-group" className="form-group hidden">
                  <label htmlFor="container-website-input" className="form-label">Product Website URL</label>
                  <input type="url" id="container-website-input" className="form-input" placeholder="https://example.com" />
                </div>
                <div className="form-group">
                  <button type="button" id="generate-ai-btn" className="modal-btn modal-btn-primary suggest-ai-btn" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                    <span>Generate with AI</span>
                    <div className="thinking-loader hidden">
                      <div className="dot" />
                      <div className="dot" />
                      <div className="dot" />
                    </div>
                  </button>
                  <div className="ai-status-container">
                    <div id="ai-status-spinner" className="spinner hidden" />
                    <p id="ai-status-text" className="form-help-text" />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="container-desc-input" className="form-label">Description</label>
                  <textarea id="container-desc-input" className="form-textarea" rows={3} placeholder="A brief summary of this container's purpose..." defaultValue={""} />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon</label>
                  <div id="container-icon-selector" className="icon-selector-grid" />
                </div>
                <div className="form-group">
                  <label htmlFor="add-custom-icon-upload" className="form-label">Or Upload Custom Icon</label>
                  <div className="custom-icon-uploader">
                      <img id="add-custom-icon-preview" src={null} alt="Custom icon preview" className="custom-icon-preview hidden" />
                    <button type="button" id="add-custom-icon-btn" className="modal-btn modal-btn-secondary">Choose Image...</button>
                    <input type="file" id="add-custom-icon-upload" className="hidden" accept="image/png, image/jpeg, image/webp, image/svg+xml" />
                  </div>
                </div>
              </div>
              <div id="ai-suggestions-container" className="modal-col-right hidden">
                <div id="add-container-theme-preview" className="settings-section">
                  <h2 className="settings-section-title">Suggested Theme</h2>
                  <div className="appearance-preview">
                    <div className="preview-bot-message">Hello! How can I assist?</div>
                    <div className="preview-user-message">Tell me about this.</div>
                  </div>
                </div>
                <div className="ai-suggestion-group">
                  <label className="ai-suggestion-label">Suggested Quick Questions</label>
                  <ul id="suggested-questions-list" className="ai-suggestion-list" />
                </div>
                <div className="ai-suggestion-group">
                  <label className="ai-suggestion-label">Suggested Personas</label>
                  <ul id="suggested-personas-list" className="ai-suggestion-list" />
                </div>
                <div className="ai-suggestion-group">
                  <label className="ai-suggestion-label">Suggested Apps</label>
                  <ul id="suggested-apps-list" className="ai-suggestion-list" />
                </div>
              </div>
            </div>
          </div>
          <footer className="modal-footer">
            <button type="button" id="cancel-container-btn" className="modal-btn modal-btn-secondary">Cancel</button>
            <button type="submit" id="create-container-btn" className="modal-btn modal-btn-primary" disabled>Create Container</button>
          </footer>
        </form>
      </div>
    </div>
    {/* Function Runner Modal */}
    <div id="function-runner-modal" className="modal-overlay hidden">
      <div className="modal-container">
        <header className="modal-header">
          <h2 id="function-runner-title" className="modal-title">Run Function</h2>
          <button id="close-function-runner-btn" className="modal-close-btn" aria-label="Close modal">×</button>
        </header>
        <form id="function-runner-form">
          <div id="function-runner-body" className="modal-body" />
          <footer className="modal-footer">
            <button type="button" id="cancel-function-runner-btn" className="modal-btn modal-btn-secondary">Cancel</button>
            <button type="submit" id="run-function-btn" className="modal-btn modal-btn-primary">Run</button>
          </footer>
        </form>
      </div>
    </div>
    {/* Delete Confirmation Modal */}
    <div id="delete-confirm-modal" className="modal-overlay hidden">
      <div className="modal-container">
        <header className="modal-header">
          <h2 className="modal-title">Are you sure?</h2>
          <button id="close-delete-modal-btn" className="modal-close-btn" aria-label="Close modal">×</button>
        </header>
        <div className="modal-body">
          <p id="delete-confirm-main-text">Are you sure you want to delete <strong id="delete-item-name" />?</p>
          <p id="delete-confirm-description" className="settings-section-description" />
        </div>
        <footer className="modal-footer">
          <button type="button" id="cancel-delete-btn" className="modal-btn modal-btn-secondary">Cancel</button>
          <button type="button" id="confirm-delete-btn" className="modal-btn btn-danger">Yes, delete it</button>
        </footer>
      </div>
    </div>
  <div id="toast-notification" className="toast" />
  <div id="cookie-consent-banner" className="cookie-banner hidden">
    <p>This website uses cookies to ensure you get the best experience. <a id="privacy-policy-link" href="#" target="_blank">Learn more</a>.</p>
    <button id="accept-cookies-btn" className="modal-btn modal-btn-primary">Accept</button>
  </div>
    </>
  );
}
