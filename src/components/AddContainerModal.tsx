import React from 'react';

interface AddContainerModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AddContainerModal({ open, onClose }: AddContainerModalProps) {
  return (
    <div id="add-container-modal" className={`modal-overlay ${open ? '' : 'hidden'}`}>
      <div className="modal-container modal-container-wide">
        <header className="modal-header">
          <h2 className="modal-title">Create New Container</h2>
          <button id="close-modal-btn" className="modal-close-btn" aria-label="Close modal" onClick={onClose}>×</button>
        </header>
        <form id="add-container-form" onSubmit={(e) => { e.preventDefault(); console.log('Form submitted: Create container'); }}>
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
                  <button type="button" id="generate-ai-btn" className="modal-btn modal-btn-primary suggest-ai-btn" disabled onClick={() => console.log('Button clicked: Generate with AI')}>
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
                  <textarea id="container-desc-input" className="form-textarea" rows={3} placeholder="A brief summary of this container's purpose..." />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon</label>
                  <div id="container-icon-selector" className="icon-selector-grid" />
                </div>
                <div className="form-group">
                  <label htmlFor="add-custom-icon-upload" className="form-label">Or Upload Custom Icon</label>
                  <div className="custom-icon-uploader">
                    <img id="add-custom-icon-preview" src={undefined as unknown as string} alt="Custom icon preview" className="custom-icon-preview hidden" />
                    <button type="button" id="add-custom-icon-btn" className="modal-btn modal-btn-secondary" onClick={() => console.log('Button clicked: Choose custom icon')}>Choose Image...</button>
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
            <button type="button" id="cancel-container-btn" className="modal-btn modal-btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" id="create-container-btn" className="modal-btn modal-btn-primary" disabled>Create Container</button>
          </footer>
        </form>
      </div>
    </div>
  );
}
