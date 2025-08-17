import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GlobalSettings() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('Route loaded: /settings/global');
  }, []);
  return (
    <div id="global-settings-page" className="page-view">
      <header className="app-header">
        <div className="header-left">
          <button
            id="back-to-settings-hub-btn-2"
            className="header-icon-btn"
            aria-label="Back to Settings"
            onClick={() => navigate('/settings')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span id="global-settings-title" className="header-title">Global Settings</span>
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
        <h1 className="settings-title">Global Settings</h1>
        <nav id="global-settings-tabs" className="settings-tabs">
          <button className="tab-link active" data-tab="branding">Branding &amp; Appearance</button>
          <button className="tab-link" data-tab="models">Model Management</button>
          <button className="tab-link" data-tab="auth">Authentication</button>
          <button className="tab-link" data-tab="privacy">Privacy &amp; Cookies</button>
          <button className="tab-link" data-tab="integrations">Integrations</button>
        </nav>
        <form id="global-settings-form">
          <div id="global-settings-panels" className="settings-panels">
            <div id="tab-panel-branding" className="tab-panel active">
              <div className="settings-section">
                <div className="appearance-layout">
                  <div className="appearance-controls">
                    <h2 className="settings-section-title">Global Branding &amp; Appearance</h2>
                    <p className="settings-section-description">Customize the main logo and titles for all users.</p>
                    <div className="form-group">
                      <label htmlFor="edit-global-logo" className="form-label">Application Logo</label>
                      <button type="button" id="edit-global-logo-btn" className="modal-btn modal-btn-secondary">Choose Image...</button>
                      <input type="file" id="edit-global-logo-upload" className="hidden" accept="image/png, image/jpeg, image/webp, image/svg+xml" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-login-title" className="form-label">Login Page Title</label>
                      <input type="text" id="edit-login-title" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-login-subtitle" className="form-label">Login Page Subtitle</label>
                      <input type="text" id="edit-login-subtitle" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-hub-header-title" className="form-label">Hub Page Header Title</label>
                      <input type="text" id="edit-hub-header-title" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-hub-title" className="form-label">Hub Page Main Title</label>
                      <input type="text" id="edit-hub-title" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="edit-hub-subtitle" className="form-label">Hub Page Subtitle</label>
                      <input type="text" id="edit-hub-subtitle" className="form-input" />
                    </div>
                  </div>
                  <div className="appearance-preview-container">
                    <div className="settings-section">
                      <h2 className="settings-section-title">Live Preview</h2>
                      <div id="branding-preview" className="branding-preview">
                        <div className="login-container">
                          <div id="branding-preview-logo" className="app-logo large">
                            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                              <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth={5} />
                              <path d="M20 35 L50 50 L80 35 M50 50 L50 80" fill="none" stroke="currentColor" strokeWidth={4} />
                            </svg>
                          </div>
                          <h1 id="branding-preview-title" className="login-title" />
                          <p id="branding-preview-subtitle" className="login-subtitle" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="tab-panel-models" className="tab-panel">
              <div className="settings-section">
                <h2 className="settings-section-title">AI Model Management</h2>
                <p className="settings-section-description">Add, edit, or remove the AI models available across the application. The model ID should match the API identifier (e.g., 'gemini-2.5-flash').</p>
                <div id="model-management-list" className="managed-list">
                  {/* Dynamically inserted model list */}
                </div>
                <input type="text" id="new-model-id" className="form-input" placeholder="Model ID (e.g., brand/model-name)" required />
                <input type="text" id="new-model-api" className="form-input" placeholder="API provider (e.g., google)" required />
                <input type="text" id="new-model-icon" className="form-input" placeholder="<svg>...</svg>" required />
                <button type="submit" className="modal-btn modal-btn-primary">Add Model</button>
              </div>
            </div>
            <div id="tab-panel-auth" className="tab-panel">
              <div className="settings-section">
                <h2 className="settings-section-title">Authentication (OAuth)</h2>
                <p className="settings-section-description">Enable or disable third-party login providers and configure their credentials.</p>
                <div className="settings-subsection">
                  <h3 className="settings-subsection-title">Google Login</h3>
                  <div className="form-group-row">
                    <label htmlFor="enable-google-login" className="toggle-switch-label">Enable Google Login</label>
                    <label className="toggle-switch"><input type="checkbox" id="enable-google-login" /><span className="slider" /></label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="google-client-id" className="form-label">Google Client ID</label>
                    <input type="text" id="google-client-id" className="form-input" placeholder="Enter Google Client ID" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="google-client-secret" className="form-label">Google Client Secret</label>
                    <input type="password" id="google-client-secret" className="form-input" placeholder="Enter Google Client Secret" />
                  </div>
                </div>
                <div className="settings-subsection">
                  <h3 className="settings-subsection-title">Microsoft Login</h3>
                  <div className="form-group-row">
                    <label htmlFor="enable-microsoft-login" className="toggle-switch-label">Enable Microsoft Login</label>
                    <label className="toggle-switch"><input type="checkbox" id="enable-microsoft-login" /><span className="slider" /></label>
                  </div>
                  <div className="form-group">
                    <label htmlFor="microsoft-client-id" className="form-label">Microsoft Client ID</label>
                    <input type="text" id="microsoft-client-id" className="form-input" placeholder="Enter Microsoft Client ID" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="microsoft-client-secret" className="form-label">Microsoft Client Secret</label>
                    <input type="password" id="microsoft-client-secret" className="form-input" placeholder="Enter Microsoft Client Secret" />
                  </div>
                </div>
              </div>
            </div>
            <div id="tab-panel-privacy" className="tab-panel">
              <div className="settings-section">
                <h2 className="settings-section-title">Privacy &amp; Cookies</h2>
                <p className="settings-section-description">Manage privacy settings for your users.</p>
                <div className="form-group-row">
                  <label htmlFor="enable-cookie-banner" className="toggle-switch-label">Enable Cookie Consent Banner</label>
                  <label className="toggle-switch"><input type="checkbox" id="enable-cookie-banner" /><span className="slider" /></label>
                </div>
                <div className="form-group">
                  <label htmlFor="privacy-policy-url" className="form-label">Privacy Policy URL</label>
                  <input type="url" id="privacy-policy-url" className="form-input" placeholder="https://example.com/privacy" />
                </div>
              </div>
            </div>
            <div id="tab-panel-integrations" className="tab-panel">
              <div className="settings-section">
                <h2 className="settings-section-title">Integrations</h2>
                <p className="settings-section-description">Globally enable or disable integrations. They can be activated per-container in the container's settings.</p>
                <div id="integrations-grid" className="integrations-grid">
                  {/* Integration cards will be inserted here by JS */}
                </div>
              </div>
            </div>
          </div></form>
        <footer className="settings-footer">
          <button type="button" id="cancel-global-settings-btn" className="modal-btn modal-btn-secondary">Cancel</button>
          <button type="button" id="save-global-settings-btn" className="modal-btn modal-btn-primary" disabled>Save Changes</button>
        </footer>
      </div>
    </div>
  );
}
