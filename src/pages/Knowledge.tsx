import React, { useEffect } from 'react';

export default function Knowledge() {
  useEffect(() => {
    console.log('Route loaded: /workspace/:id/knowledge');
  }, []);
  return (
    <div id="knowledge-page" className="page-view">
      <header className="app-header">
        <div className="header-left">
          <button id="back-to-assistant-btn" className="header-icon-btn" aria-label="Back to Assistant" onClick={() => console.log('Button clicked: Back to Assistant')}>
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span id="knowledge-page-title" className="header-title">Knowledge Base</span>
        </div>
      </header>
      <div className="knowledge-container">
        <h1 id="knowledge-title">Manage Knowledge</h1>
        <p id="knowledge-subtitle" className="settings-section-description">Upload text or image files to provide context to the assistant. The content of these files will be included in every request to the AI.</p>
        <div id="file-dropzone" className="file-dropzone">
          <div className="dropzone-prompt">
            <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1={12} y1={3} x2={12} y2={15} /></svg>
            <p><strong>Drag &amp; drop files here</strong></p>
            <p>or</p>
            <button id="knowledge-upload-btn" type="button" className="modal-btn modal-btn-secondary" onClick={() => console.log('Button clicked: Browse files')}>Browse files</button>
          </div>
        </div>
        <p className="form-help-text" style={{textAlign: 'center', marginTop: '-1.5rem', marginBottom: '2rem'}}>
          Supported formats: PDF, TXT, MD, and common image types (JPG, PNG, WEBP). Office documents are not supported.
        </p>
        <input type="file" id="knowledge-file-input" className="hidden" multiple accept="image/jpeg,image/png,image/webp,image/gif,application/pdf,text/plain,.md,text/markdown" />
        <div className="settings-section">
          <h2 className="settings-section-title">Uploaded Files</h2>
          <div id="knowledge-file-list" className="knowledge-file-list" />
        </div>
      </div>
    </div>
  );
}
