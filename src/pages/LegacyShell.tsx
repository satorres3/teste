export default function LegacyShell() {
  const imgSrc = '';
  return (
    <>
    {/* Login Page View */}
    <div id="login-page" className="page-view">
      <div className="login-container">
        <div id="login-app-logo" className="app-logo large">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" strokeWidth={5} />
            <path d="M20 35 L50 50 L80 35 M50 50 L50 80" fill="none" stroke="currentColor" strokeWidth={4} />
          </svg>
        </div>
        <h1 id="login-title-text" className="login-title">The Future of Tech</h1>
        <p id="login-subtitle-text" className="login-subtitle">Sign in to continue</p>
        <div className="sso-buttons">
          <button id="google-login" className="sso-btn google-btn" aria-label="Sign in with Google">
            <svg viewBox="0 0 48 48" width={24} height={24}><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" /><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" /><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" /><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C43.021,36.251,44,30.495,44,24C44,22.659,43.862,21.35,43.611,20.083z" /></svg>
            <span>Sign in with Google</span>
          </button>
          <button id="microsoft-login" className="sso-btn microsoft-btn" aria-label="Sign in with Microsoft">
            <svg viewBox="0 0 21 21" width={21} height={21} fill="currentColor"><path d="M1 1h9v9H1z" fill="#f25022" /><path d="M11 1h9v9h-9z" fill="#7fba00" /><path d="M1 11h9v9H1z" fill="#00a4ef" /><path d="M11 11h9v9h-9z" fill="#ffb900" /></svg>
            <span>Sign in with Microsoft</span>
          </button>
        </div>
      </div>
    </div>
    {/* Container Hub Page View */}
    <div id="hub-page" className="page-view hidden">
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
    {/* Settings Hub Page View */}
    <div id="settings-hub-page" className="page-view hidden">
      <header className="app-header">
        <div className="header-left">
          <button className="back-to-hub-btn header-icon-btn" aria-label="Back to Hub">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span id="settings-hub-title" className="header-title">Settings</span>
        </div>
        <div className="header-right">
          <button className="back-to-hub-btn header-icon-btn" aria-label="Go to Hub">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>
        </div>
      </header>
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-hub-grid">
          <div id="container-management-card" className="settings-hub-card" role="button" tabIndex={0}>
            <div className="settings-hub-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x={3} y={3} width={7} height={7} /><rect x={14} y={3} width={7} height={7} /><rect x={14} y={14} width={7} height={7} /><rect x={3} y={14} width={7} height={7} /></svg>
            </div>
            <h2 className="settings-hub-card-title">Container Management</h2>
            <p className="settings-hub-card-desc">Create, edit, and manage all your containers and their specific settings.</p>
          </div>
          <div id="global-settings-card" className="settings-hub-card" role="button" tabIndex={0}>
            <div className="settings-hub-card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx={12} cy={12} r={3} /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
            </div>
            <h2 className="settings-hub-card-title">Global Settings</h2>
            <p className="settings-hub-card-desc">Manage application-wide settings like branding, authentication, and privacy.</p>
          </div>
        </div>
      </div>
    </div>
    {/* Container Management Page View */}
    <div id="container-management-page" className="page-view hidden">
      <header className="app-header">
        <div className="header-left">
          <button id="back-to-settings-hub-btn-1" className="header-icon-btn" aria-label="Back to Settings">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span id="container-management-title" className="header-title">Container Management</span>
        </div>
        <div className="header-right">
          <button className="back-to-hub-btn header-icon-btn" aria-label="Go to Hub">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>
        </div>
      </header>
      <div className="settings-container">
        <div className="settings-section-header">
          <h1 className="settings-title">Container Management</h1>
          <button id="add-container-btn" className="modal-btn modal-btn-primary">Add New</button>
        </div>
        <div id="container-management-grid" className="container-management-grid">
          {/* Container management cards will be dynamically inserted here */}
        </div>
      </div>
    </div>
    {/* Global Settings Page View */}
    <div id="global-settings-page" className="page-view hidden">
      <header className="app-header">
        <div className="header-left">
          <button id="back-to-settings-hub-btn-2" className="header-icon-btn" aria-label="Back to Settings">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span id="global-settings-title" className="header-title">Global Settings</span>
        </div>
        <div className="header-right">
          <button className="back-to-hub-btn header-icon-btn" aria-label="Go to Hub">
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
    {/* Settings Detail Page View */}
    <div id="settings-detail-page" className="page-view hidden">
      <header className="app-header">
        <div className="header-left">
          <button id="back-to-container-management-btn" className="header-icon-btn" aria-label="Back to Settings">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={19} y1={12} x2={5} y2={12} /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span id="settings-detail-title" className="header-title">Edit Container</span>
        </div>
        <div className="header-right">
          <button className="back-to-hub-btn header-icon-btn" aria-label="Go to Hub">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          </button>
        </div>
      </header>
      <div id="settings-form-container" className="settings-container">
        <nav id="settings-tabs" className="settings-tabs">
          <button className="tab-link active" data-tab="general">General</button>
          <button className="tab-link" data-tab="customization">Customization</button>
          <button className="tab-link" data-tab="appearance">Appearance</button>
          <button className="tab-link" data-tab="apps">Apps &amp; Functions</button>
          <button className="tab-link" data-tab="integrations">Integrations</button>
          <button className="tab-link" data-tab="knowledge">Knowledge</button>
          <button className="tab-link" data-tab="security">Security</button>
        </nav>
        <div className="settings-panels">
          <div id="tab-panel-general" className="tab-panel active">
            <div className="settings-section">
              <div className="settings-subsection">
                <h3 className="settings-subsection-title">Core Details</h3>
                <div className="form-group">
                  <label htmlFor="edit-container-name" className="form-label">Container Name</label>
                  <input type="text" id="edit-container-name" className="form-input" />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-container-desc" className="form-label">Description</label>
                  <textarea id="edit-container-desc" className="form-textarea" rows={3} defaultValue={""} />
                </div>
                <div className="form-group">
                  <label className="form-label">Icon</label>
                  <div id="edit-container-icon-selector" className="icon-selector-grid" />
                </div>
                <div className="form-group">
                  <label htmlFor="edit-custom-icon-upload" className="form-label">Upload Custom Icon</label>
                  <div className="custom-icon-uploader">
                    <img id="edit-custom-icon-preview" src={imgSrc || ''} alt="Custom icon preview" className="custom-icon-preview hidden" />
                    <button type="button" id="edit-custom-icon-btn" className="modal-btn modal-btn-secondary">Choose Image...</button>
                    <input type="file" id="edit-custom-icon-upload" className="hidden" accept="image/png, image/jpeg, image/webp, image/svg+xml" />
                  </div>
                  <p className="form-help-text">This icon appears on the assistant's welcome screen and in settings.</p>
                </div>
              </div>
              <div className="settings-subsection">
                <h3 className="settings-subsection-title">Visual Identity</h3>
                <div className="form-group">
                  <label className="form-label">Card Background Image</label>
                  <div className="card-image-selector">
                    <div id="card-image-options-list" className="icon-selector-grid" />
                    <img id="edit-card-image-preview" src={imgSrc || ''} alt="Card image preview" className="card-image-preview hidden" />
                    <button type="button" id="edit-card-image-btn" className="modal-btn modal-btn-secondary">Upload Custom Image...</button>
                    <input type="file" id="edit-card-image-upload" className="hidden" accept="image/png, image/jpeg, image/webp" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-panel-customization" className="tab-panel">
            <div className="settings-section">
              <div className="settings-section-header">
                <h2 className="settings-section-title">Quick Questions</h2>
                <button id="suggest-questions-btn" className="suggest-ai-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                  Suggest with AI
                </button>
              </div>
              <div id="quick-questions-list" className="managed-list" />
              <form id="add-quick-question-form" className="add-item-form">
                <input type="text" id="new-quick-question-input" className="form-input" placeholder="Add a new question..." required />
                <button type="submit" className="modal-btn modal-btn-primary">Add</button>
              </form>
            </div>
            <div className="settings-section">
              <div className="settings-section-header">
                <h2 className="settings-section-title">Personas</h2>
                <button id="suggest-personas-btn" className="suggest-ai-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                  Suggest with AI
                </button>
              </div>
              <div id="personas-list" className="managed-list" />
              <form id="add-persona-form" className="add-item-form">
                <input type="text" id="new-persona-input" className="form-input" placeholder="Add a new persona..." required />
                <button type="submit" className="modal-btn modal-btn-primary">Add</button>
              </form>
            </div>
          </div>
          <div id="tab-panel-appearance" className="tab-panel">
            <div className="appearance-layout">
              <div className="appearance-controls">
                <div className="settings-section">
                  <h3 className="settings-subsection-title">User Message</h3>
                  <div className="color-picker-grid">
                    <div className="form-group">
                      <label htmlFor="user-bg-color" className="form-label">Background</label>
                      <input type="color" id="user-bg-color" className="form-input form-input-color" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="user-text-color" className="form-label">Text</label>
                      <input type="color" id="user-text-color" className="form-input form-input-color" />
                    </div>
                  </div>
                </div>
                <div className="settings-section">
                  <h3 className="settings-subsection-title">Assistant Message</h3>
                  <div className="color-picker-grid">
                    <div className="form-group">
                      <label htmlFor="bot-bg-color" className="form-label">Background</label>
                      <input type="color" id="bot-bg-color" className="form-input form-input-color" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bot-text-color" className="form-label">Text</label>
                      <input type="color" id="bot-text-color" className="form-input form-input-color" />
                    </div>
                  </div>
                </div>
                <div className="settings-section">
                  <h3 className="settings-subsection-title">Workspace</h3>
                  <div className="color-picker-grid">
                    <div className="form-group">
                      <label htmlFor="bg-gradient-start-color" className="form-label">Background Start</label>
                      <input type="color" id="bg-gradient-start-color" className="form-input form-input-color" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="bg-gradient-end-color" className="form-label">Background End</label>
                      <input type="color" id="bg-gradient-end-color" className="form-input form-input-color" />
                    </div>
                  </div>
                </div>
                <div className="settings-section">
                  <h3 className="settings-subsection-title">Sidebar</h3>
                  <div className="color-picker-grid">
                    <div className="form-group">
                      <label htmlFor="sidebar-bg-color" className="form-label">Background</label>
                      <input type="color" id="sidebar-bg-color" className="form-input form-input-color" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sidebar-text-color" className="form-label">Text</label>
                      <input type="color" id="sidebar-text-color" className="form-input form-input-color" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="sidebar-highlight-bg-color" className="form-label">Highlight</label>
                      <input type="color" id="sidebar-highlight-bg-color" className="form-input form-input-color" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="appearance-preview-container wide">
                <div className="settings-section">
                  <h2 className="settings-section-title">Live Preview</h2>
                  <div id="appearance-preview" className="appearance-preview wide">
                    <div className="preview-bot-message">Hello! How can I help you today?</div>
                    <div className="preview-user-message">Tell me about this feature.</div>
                  </div>
                  <div id="sidebar-preview" className="sidebar-preview">
                    <div className="preview-sidebar-link active">Active Item</div>
                    <div className="preview-sidebar-link">Another Item</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id="tab-panel-apps" className="tab-panel">
            <div className="settings-section">
              <h2 className="settings-section-title">Functions</h2>
              <p className="settings-section-description">AI-powered tools tailored for this container. Describe a function you need, and AI will build it.</p>
              <div id="functions-list" className="managed-list" />
              <form id="add-function-form" className="add-item-form">
                <input type="text" id="new-function-input" className="form-input" placeholder="e.g., 'A tool to draft outreach emails'" required />
                <button type="submit" id="generate-function-btn" className="modal-btn modal-btn-primary suggest-ai-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM5 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM19 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>
                  <span>Generate with AI</span>
                </button>
              </form>
            </div>
          </div>
          <div id="tab-panel-integrations" className="tab-panel">
            <div className="settings-section">
              <h2 className="settings-section-title">Integrations</h2>
              <p className="settings-section-description">Activate globally enabled integrations for this container. They will appear in the sidebar.</p>
              <div id="container-integrations-list" className="checkbox-list">
                {/* Dynamically populated list of available integrations */}
              </div>
            </div>
          </div>
          <div id="tab-panel-knowledge" className="tab-panel">
            <div className="settings-section">
              <h2 className="settings-section-title">Knowledge Base</h2>
              <p className="settings-section-description">Manage the files this assistant uses for context. All uploaded files will be sent to the model with every request.</p>
              <button id="manage-knowledge-btn" className="modal-btn modal-btn-primary">Manage Knowledge Files</button>
            </div>
          </div>
          <div id="tab-panel-security" className="tab-panel">
            <div className="settings-section">
              <h2 className="settings-section-title">Knowledge Base Visibility</h2>
              <div className="form-group-row">
                <div>
                  <label htmlFor="is-knowledge-public" className="toggle-switch-label">Make Knowledge Base Public</label>
                  <p className="form-help-text">If enabled, users can see the "Knowledge" tab and upload files. The AI uses the knowledge base for answers regardless of this setting.</p>
                </div>
                <label className="toggle-switch"><input type="checkbox" id="is-knowledge-public" /><span className="slider" /></label>
              </div>
            </div>
            <div className="settings-section">
              <h2 className="settings-section-title">Access Control</h2>
              <p className="settings-section-description">Enter user emails or group names that can access this container.</p>
              <div id="access-control-list" className="managed-list" />
              <form id="add-accessor-form" className="add-item-form">
                <input type="text" id="new-accessor-input" className="form-input" placeholder="e.g., admin@company.com" required />
                <button type="submit" className="modal-btn modal-btn-primary">Add</button>
              </form>
            </div>
            <div className="settings-section">
              <h2 className="settings-section-title">Available Models</h2>
              <div id="available-models-list" className="checkbox-list">
                {/* This will be populated dynamically */}
              </div>
            </div>
            <div className="settings-section danger-zone">
              <h2 className="settings-section-title">Danger Zone</h2>
              <div className="danger-zone-content">
                <div>
                  <strong>Delete this container</strong>
                  <p>Once you delete a container, there is no going back. Please be certain.</p>
                </div>
                <button id="delete-container-btn" className="modal-btn btn-danger">Delete Container</button>
              </div>
            </div>
          </div>
        </div>
        <footer className="settings-footer">
          <button type="button" id="cancel-settings-btn" className="modal-btn modal-btn-secondary">Cancel</button>
          <button type="button" id="save-settings-btn" className="modal-btn modal-btn-primary" disabled>Save Changes</button>
        </footer>
      </div>
    </div>
    {/* Knowledge Base Page View */}
    <div id="knowledge-page" className="page-view hidden">
      <header className="app-header">
        <div className="header-left">
          <button id="back-to-assistant-btn" className="header-icon-btn" aria-label="Back to Assistant">
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
            <button id="knowledge-upload-btn" type="button" className="modal-btn modal-btn-secondary">Browse files</button>
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
    {/* Default Container Page View */}
    <div id="container-page" className="page-view hidden">
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
            <li><a id="sidebar-assistant-link" className="sidebar-link active"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg><span>Assistant</span></a></li>
            <li><a id="sidebar-knowledge-link" className="sidebar-link"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v15H6.5A2.5 2.5 0 0 1 4 14.5v-10A2.5 2.5 0 0 1 6.5 2z" /></svg><span>Knowledge</span></a></li>
          </ul>
          <div id="sidebar-integrations-section" className="sidebar-section" />
          <div id="sidebar-apps-section" className="sidebar-section" />
          <div id="sidebar-history-section" className="sidebar-section">
            <h3 className="sidebar-section-title">History</h3>
            <ul id="sidebar-history-list" />
          </div>
        </nav>
      </aside>
      <div className="container-page-container">
        <header className="app-header">
          <div className="header-left">
            <button id="sidebar-toggle-btn" className="header-icon-btn" aria-label="Toggle sidebar">
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1={3} y1={12} x2={21} y2={12} /><line x1={3} y1={6} x2={21} y2={6} /><line x1={3} y1={18} x2={21} y2={18} /></svg>
            </button>
            <button className="back-to-hub-btn header-icon-btn" aria-label="Back to Hub">
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
              <button id="remove-attachment-btn" aria-label="Remove attachment">×</button>
            </div>
            <form id="chat-form" className="chat-input-form" aria-label="Chat input form">
              <div className="chat-input-area">
                <textarea id="chat-input" className="chat-input" placeholder="Ask a question..." rows={1} defaultValue={""} />
                <div className="attachment-container">
                  <button type="button" id="attachment-btn" className="attachment-btn" aria-label="Attach file">
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
                  </button>
                  <div id="attachment-options" className="attachment-options hidden">
                    <button type="button" id="upload-computer-btn">
                      <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1={12} y1={3} x2={12} y2={15} /></svg>
                      <span>Upload from Computer</span>
                    </button>
                  </div>
                </div>
              </div>
              <input type="file" id="file-upload-input" className="hidden" accept="image/*,application/pdf,text/plain" />
              <button type="submit" id="send-chat-btn" className="send-chat-btn" aria-label="Send message" disabled>
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
                    <img id="add-custom-icon-preview" src={imgSrc || ''} alt="Custom icon preview" className="custom-icon-preview hidden" />
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
