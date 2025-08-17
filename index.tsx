/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { GoogleGenAI, Chat, Part, Type, GenerateContentResponse } from "@google/genai";

document.addEventListener('DOMContentLoaded', () => {

    // --- [MODULE] src/types.ts ---
    interface FunctionParameter {
        name: string;
        type: 'string' | 'number' | 'textarea';
        description: string;
    }

    interface AppFunction {
        id: string;
        name: string;
        description: string;
        icon: string;
        parameters: FunctionParameter[];
        promptTemplate: string;
        enabled: boolean;
    }

    type ChatHistory = { role: 'user' | 'model'; parts: Part[] }[];

    type ChatEntry = {
        id: string;
        name: string;
        history: ChatHistory;
    };

    type KnowledgeFile = {
        name: string;
        type: string;
        base64Content: string;
        size: number;
        uploadDate: string;
    };

    interface ChatTheme {
        userBg: string;
        userText: string;
        botBg: string;
        botText: string;
        bgGradientStart: string;
        bgGradientEnd: string;
        sidebarBg: string;
        sidebarText: string;
        sidebarHighlightBg: string;
    }

    interface Branding {
        loginTitle: string;
        loginSubtitle: string;
        hubTitle: string;
        hubSubtitle: string;
        hubHeaderTitle: string;
        appLogo?: string; // base64 data URL
        enableGoogleLogin: boolean;
        googleClientId: string;
        googleClientSecret: string;
        enableMicrosoftLogin: boolean;
        microsoftClientId: string;
        microsoftClientSecret: string;
        enableCookieBanner: boolean;
        privacyPolicyUrl: string;
        integrations: {
            sharepoint: boolean;
            brevo: boolean;
            hubspot: boolean;
            docusign: boolean;
            outlook: boolean;
        };
    }

    interface AIModel {
        id: string;
        icon: string;
        api: string;
    }

    interface Container {
        id:string;
        name: string;
        description: string;
        icon: string; // Can be SVG string or base64 data URL
        cardImageUrl: string;
        quickQuestions: string[];
        availableModels: string[];
        availablePersonas: string[];
        selectedModel: string;
        selectedPersona: string;
        functions: AppFunction[];
        enabledIntegrations: string[];
        accessControl: string[];
        chats: ChatEntry[];
        activeChatId: string | null;
        knowledgeBase: KnowledgeFile[];
        theme: ChatTheme;
        isKnowledgeBasePublic: boolean;
    }

    type ItemToDelete = {
        type: 'container' | 'chat' | 'knowledgeFile';
        containerId: string | null;
        chatId: string | null;
        fileName: string | null;
    } | null;

    type DraftNewContainer = Omit<Container, 'id' | 'chats' | 'activeChatId' | 'availableModels' | 'selectedModel' | 'selectedPersona' | 'accessControl' | 'enabledIntegrations' | 'isKnowledgeBasePublic'>;

    // --- [MODULE] src/constants.ts ---
    const DEFAULT_THEME: ChatTheme = {
        userBg: '#0077b6',
        userText: '#ffffff',
        botBg: '#1a1a2e',
        botText: '#f0f0f0',
        bgGradientStart: '#0f0c29',
        bgGradientEnd: '#24243e',
        sidebarBg: '#0f0c29',
        sidebarText: '#a9a9b3',
        sidebarHighlightBg: 'rgba(0, 191, 255, 0.1)',
    };

    const DEFAULT_BRANDING: Branding = {
        loginTitle: 'The Future of Tech',
        loginSubtitle: 'Sign in to continue',
        hubTitle: 'Welcome to the Hub',
        hubSubtitle: 'Select a container to get started',
        hubHeaderTitle: 'The Hub',
        appLogo: '',
        enableGoogleLogin: true,
        googleClientId: '',
        googleClientSecret: '',
        enableMicrosoftLogin: true,
        microsoftClientId: '',
        microsoftClientSecret: '',
        enableCookieBanner: false,
        privacyPolicyUrl: '',
        integrations: {
            sharepoint: false,
            brevo: false,
            hubspot: false,
            docusign: false,
            outlook: true,
        }
    };

    const DEFAULT_MODELS: AIModel[] = [
        { id: 'gemini-2.5-flash', api: 'google', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.75 4.75L10.25 9.25L5.75 11.75L10.25 14.25L12.75 18.75L15.25 14.25L19.75 11.75L15.25 9.25L12.75 4.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.75 4.75L10.25 9.25L5.75 11.75L10.25 14.25L12.75 18.75L15.25 14.25L19.75 11.75L15.25 9.25L12.75 4.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
        { id: 'openai/gpt-4o', api: 'openai', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path><path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="1.5" stroke-miterlimit="10"></path></svg>` },
        { id: 'anthropic/claude-3-opus', api: 'anthropic', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 16V12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 8H12.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
        { id: 'meta/llama-3-70b', api: 'meta', icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 15.5562C2 15.5562 5.33333 16.6671 8 15.5562C10.6667 14.4454 10.6667 11.1116 13.3333 10.0007C16 8.88989 18.6667 11.1116 22 10.0007" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M2 8.88889C2 8.88889 5.33333 9.99978 8 8.88889C10.6667 7.77805 10.6667 4.44426 13.3333 3.33337C16 2.22249 18.6667 4.44426 22 3.33337" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>` },
    ];

    const INITIAL_CONTAINERS_DATA = [
        {
            name: 'Data Security',
            description: 'Protecting our digital assets and infrastructure.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
            cardImageUrl: 'https://images.unsplash.com/photo-1550751827-4138d04d405b?q=80&w=1280&auto=format&fit=crop',
            quickQuestions: ["What is phishing?", "Latest security threats?", "Recommend a password manager.", "How to secure my home Wi-Fi?"],
            availableModels: DEFAULT_MODELS.map(m => m.id),
            availablePersonas: ["Helpful Assistant", "Security Expert", "Strict Enforcer"],
            selectedModel: 'gemini-2.5-flash',
            selectedPersona: 'Helpful Assistant',
            functions: [],
            enabledIntegrations: [],
            knowledgeBase: [],
            accessControl: ["admin@company.com", "security-team"],
            theme: { userBg: '#0077b6', userText: '#ffffff', botBg: '#1a1a2e', botText: '#f0f0f0', bgGradientStart: '#0d1b2a', bgGradientEnd: '#1b263b', sidebarBg: '#0d1b2a', sidebarText: '#a9a9b3', sidebarHighlightBg: 'rgba(0, 191, 255, 0.1)' },
            isKnowledgeBasePublic: false,
        },
        {
            name: 'Sales',
            description: 'Driving growth, strategy, and revenue generation.',
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20V16"></path></svg>`,
            cardImageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1280&auto=format&fit=crop',
            quickQuestions: ["Summarize last week's leads.", "Who is our biggest competitor?", "Draft a follow-up email.", "Give me a sales pitch for Product X."],
            availableModels: DEFAULT_MODELS.map(m => m.id),
            availablePersonas: ["Helpful Assistant", "Sales Coach", "Data Analyst"],
            selectedModel: 'gemini-2.5-flash',
            selectedPersona: 'Helpful Assistant',
            functions: [],
            enabledIntegrations: ['outlook'],
            knowledgeBase: [],
            accessControl: ["admin@company.com", "sales-team"],
            theme: { userBg: '#0077b6', userText: '#ffffff', botBg: '#1a1a2e', botText: '#f0f0f0', bgGradientStart: '#142b27', bgGradientEnd: '#2b413c', sidebarBg: '#142b27', sidebarText: '#a9a9b3', sidebarHighlightBg: 'rgba(0, 191, 255, 0.1)' },
            isKnowledgeBasePublic: false,
        }
    ];

    const AVAILABLE_ICONS_WITH_DESC = [
        { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>`, description: 'A simple square, representing a generic or foundational container.' },
        { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`, description: 'A shield, representing security, protection, and defense.' },
        { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20V16"></path></svg>`, description: 'A bar chart, representing sales, data, analytics, and growth.' },
        { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`, description: 'An information symbol, for help, support, or general knowledge.' },
        { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`, description: 'A star, for special projects, favorites, or high-priority items.' },
        { svg: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`, description: 'A package or box, representing products, inventory, or launches.' }
    ];

    const CARD_IMAGE_OPTIONS = [
        { url: 'https://images.unsplash.com/photo-1550751827-4138d04d405b?q=80&w=1280&auto=format&fit=crop', description: 'A server room with glowing blue lights, representing technology, data, and security.' },
        { url: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1280&auto=format&fit=crop', description: 'A modern office meeting with professionals discussing charts, representing business, sales, and collaboration.' },
        { url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1280&auto=format&fit=crop', description: 'A team working together at a desk with laptops and documents, representing teamwork, projects, and development.' },
        { url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1280&auto=format&fit=crop', description: 'A close-up of a laptop showing financial charts and graphs, suitable for finance, analytics, or data-driven departments.' },
        { url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1280&auto=format&fit=crop', description: 'A person presenting a strategy on a clear board, representing marketing, planning, and strategy.' },
        { url: 'https://images.unsplash.com/photo-1581092916374-03595232a51a?q=80&w=1280&auto=format&fit=crop', description: 'A scientist in a lab coat working with test tubes, representing research, science, and development.' },
    ];

    const AVAILABLE_ICONS = AVAILABLE_ICONS_WITH_DESC.map(i => i.svg);

    const FUNCTION_ICONS = [
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`,
        `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
    ];

    // --- [MODULE] src/dom.ts ---
    const DOM = {
        pageViews: {
            login: document.getElementById('login-page'),
            hub: document.getElementById('hub-page'),
            settingsHub: document.getElementById('settings-hub-page'),
            containerManagement: document.getElementById('container-management-page'),
            globalSettings: document.getElementById('global-settings-page'),
            settingsDetail: document.getElementById('settings-detail-page'),
            department: document.getElementById('container-page'),
            knowledge: document.getElementById('knowledge-page'),
        },
        modals: {
            addContainer: document.getElementById('add-container-modal'),
            functionRunner: document.getElementById('function-runner-modal'),
            deleteConfirm: document.getElementById('delete-confirm-modal'),
        },
        buttons: {
            googleLogin: document.getElementById('google-login'),
            microsoftLogin: document.getElementById('microsoft-login'),
            settings: document.getElementById('settings-btn'),
            addContainer: document.getElementById('add-container-btn'),
            backToHub: document.querySelectorAll('.back-to-hub-btn'),
            backToSettingsHub1: document.getElementById('back-to-settings-hub-btn-1'),
            backToSettingsHub2: document.getElementById('back-to-settings-hub-btn-2'),
            backToContainerManagement: document.getElementById('back-to-container-management-btn'),
            backToAssistant: document.getElementById('back-to-assistant-btn'),
            sidebarToggle: document.getElementById('sidebar-toggle-btn'),
            attachment: document.getElementById('attachment-btn') as HTMLButtonElement,
            uploadComputer: document.getElementById('upload-computer-btn'),
            removeAttachment: document.getElementById('remove-attachment-btn'),
            suggestQuestions: document.getElementById('suggest-questions-btn') as HTMLButtonElement,
            suggestPersonas: document.getElementById('suggest-personas-btn') as HTMLButtonElement,
            generateFunction: document.getElementById('generate-function-btn') as HTMLButtonElement,
            generateAi: document.getElementById('generate-ai-btn') as HTMLButtonElement,
            closeModal: document.getElementById('close-modal-btn'),
            cancelContainer: document.getElementById('cancel-container-btn'),
            createContainer: document.getElementById('create-container-btn') as HTMLButtonElement,
            closeFunctionRunner: document.getElementById('close-function-runner-btn'),
            cancelFunctionRunner: document.getElementById('cancel-function-runner-btn'),
            deleteContainer: document.getElementById('delete-container-btn'),
            closeDeleteModal: document.getElementById('close-delete-modal-btn'),
            cancelDelete: document.getElementById('cancel-delete-btn'),
            confirmDelete: document.getElementById('confirm-delete-btn'),
            newChat: document.getElementById('new-chat-btn'),
            sendChat: document.getElementById('send-chat-btn') as HTMLButtonElement,
            manageKnowledge: document.getElementById('manage-knowledge-btn'),
            knowledgeUpload: document.getElementById('knowledge-upload-btn'),
            saveSettings: document.getElementById('save-settings-btn') as HTMLButtonElement,
            cancelSettings: document.getElementById('cancel-settings-btn') as HTMLButtonElement,
            saveGlobalSettings: document.getElementById('save-global-settings-btn') as HTMLButtonElement,
            cancelGlobalSettings: document.getElementById('cancel-global-settings-btn') as HTMLButtonElement,
            addCustomIcon: document.getElementById('add-custom-icon-btn') as HTMLButtonElement,
            editCustomIcon: document.getElementById('edit-custom-icon-btn') as HTMLButtonElement,
            editGlobalLogo: document.getElementById('edit-global-logo-btn') as HTMLButtonElement,
            acceptCookies: document.getElementById('accept-cookies-btn'),
            editCardImage: document.getElementById('edit-card-image-btn') as HTMLButtonElement,
        },
        forms: {
            chat: document.getElementById('chat-form') as HTMLFormElement,
            addContainer: document.getElementById('add-container-form') as HTMLFormElement,
            addQuickQuestion: document.getElementById('add-quick-question-form') as HTMLFormElement,
            addPersona: document.getElementById('add-persona-form') as HTMLFormElement,
            addAccessor: document.getElementById('add-accessor-form') as HTMLFormElement,
            addFunction: document.getElementById('add-function-form') as HTMLFormElement,
            addModel: document.getElementById('add-model-form') as HTMLFormElement,
            functionRunner: document.getElementById('function-runner-form') as HTMLFormElement,
            settingsContainer: document.getElementById('settings-form-container') as HTMLFormElement,
            globalSettings: document.getElementById('global-settings-form') as HTMLFormElement,
        },
        inputs: {
            chat: document.getElementById('chat-input') as HTMLTextAreaElement,
            fileUpload: document.getElementById('file-upload-input') as HTMLInputElement,
            containerName: document.getElementById('container-name-input') as HTMLInputElement,
            containerDesc: document.getElementById('container-desc-input') as HTMLTextAreaElement,
            containerType: document.getElementById('container-type-select') as HTMLSelectElement,
            containerWebsite: document.getElementById('container-website-input') as HTMLInputElement,
            editContainerName: document.getElementById('edit-container-name') as HTMLInputElement,
            editContainerDesc: document.getElementById('edit-container-desc') as HTMLTextAreaElement,
            newQuickQuestion: document.getElementById('new-quick-question-input') as HTMLInputElement,
            newPersona: document.getElementById('new-persona-input') as HTMLInputElement,
            newAccessor: document.getElementById('new-accessor-input') as HTMLInputElement,
            newFunction: document.getElementById('new-function-input') as HTMLInputElement,
            newModelId: document.getElementById('new-model-id') as HTMLInputElement,
            newModelApi: document.getElementById('new-model-api') as HTMLInputElement,
            newModelIcon: document.getElementById('new-model-icon') as HTMLInputElement,
            knowledgeFile: document.getElementById('knowledge-file-input') as HTMLInputElement,
            userBgColor: document.getElementById('user-bg-color') as HTMLInputElement,
            userTextColor: document.getElementById('user-text-color') as HTMLInputElement,
            botBgColor: document.getElementById('bot-bg-color') as HTMLInputElement,
            botTextColor: document.getElementById('bot-text-color') as HTMLInputElement,
            bgGradientStartColor: document.getElementById('bg-gradient-start-color') as HTMLInputElement,
            bgGradientEndColor: document.getElementById('bg-gradient-end-color') as HTMLInputElement,
            sidebarBgColor: document.getElementById('sidebar-bg-color') as HTMLInputElement,
            sidebarTextColor: document.getElementById('sidebar-text-color') as HTMLInputElement,
            sidebarHighlightBgColor: document.getElementById('sidebar-highlight-bg-color') as HTMLInputElement,
            addCustomIconUpload: document.getElementById('add-custom-icon-upload') as HTMLInputElement,
            editCustomIconUpload: document.getElementById('edit-custom-icon-upload') as HTMLInputElement,
            editCardImageUpload: document.getElementById('edit-card-image-upload') as HTMLInputElement,
            editLoginTitle: document.getElementById('edit-login-title') as HTMLInputElement,
            editLoginSubtitle: document.getElementById('edit-login-subtitle') as HTMLInputElement,
            editHubHeaderTitle: document.getElementById('edit-hub-header-title') as HTMLInputElement,
            editHubTitle: document.getElementById('edit-hub-title') as HTMLInputElement,
            editHubSubtitle: document.getElementById('edit-hub-subtitle') as HTMLInputElement,
            editGlobalLogoUpload: document.getElementById('edit-global-logo-upload') as HTMLInputElement,
            enableGoogleLogin: document.getElementById('enable-google-login') as HTMLInputElement,
            googleClientId: document.getElementById('google-client-id') as HTMLInputElement,
            googleClientSecret: document.getElementById('google-client-secret') as HTMLInputElement,
            enableMicrosoftLogin: document.getElementById('enable-microsoft-login') as HTMLInputElement,
            microsoftClientId: document.getElementById('microsoft-client-id') as HTMLInputElement,
            microsoftClientSecret: document.getElementById('microsoft-client-secret') as HTMLInputElement,
            enableCookieBanner: document.getElementById('enable-cookie-banner') as HTMLInputElement,
            privacyPolicyUrl: document.getElementById('privacy-policy-url') as HTMLInputElement,
            isKnowledgePublic: document.getElementById('is-knowledge-public') as HTMLInputElement,
        },
        containers: {
            containerGrid: document.getElementById('container-grid'),
            containerManagementGrid: document.getElementById('container-management-grid'),
            chatMessages: document.getElementById('chat-messages'),
            chatWelcome: document.getElementById('chat-welcome'),
            welcomeIcon: document.getElementById('welcome-icon'),
            welcomeQuestions: document.getElementById('welcome-questions'),
            sidebarAppsSection: document.getElementById('sidebar-apps-section'),
            sidebarIntegrationsSection: document.getElementById('sidebar-integrations-section'),
            sidebarHistoryList: document.getElementById('sidebar-history-list'),
            sidebarAssistantLink: document.getElementById('sidebar-assistant-link'),
            sidebarKnowledgeLink: document.getElementById('sidebar-knowledge-link'),
            attachmentOptions: document.getElementById('attachment-options'),
            attachmentPreview: document.getElementById('attachment-preview'),
            containerIconSelector: document.getElementById('container-icon-selector'),
            editContainerIconSelector: document.getElementById('edit-container-icon-selector'),
            quickQuestionsList: document.getElementById('quick-questions-list'),
            personasList: document.getElementById('personas-list'),
            accessControlList: document.getElementById('access-control-list'),
            availableModelsList: document.getElementById('available-models-list'),
            modelManagementList: document.getElementById('model-management-list'),
            functionsList: document.getElementById('functions-list'),
            functionRunnerBody: document.getElementById('function-runner-body'),
            settingsTabs: document.getElementById('settings-tabs'),
            settingsPanels: document.querySelectorAll('#settings-detail-page .tab-panel'),
            globalSettingsTabs: document.getElementById('global-settings-tabs'),
            globalSettingsPanels: document.querySelectorAll('#global-settings-page .tab-panel'),
            modelSelect: document.getElementById('model-select-container'),
            personaSelect: document.getElementById('persona-select-container'),
            fileDropzone: document.getElementById('file-dropzone'),
            knowledgeFileList: document.getElementById('knowledge-file-list'),
            aiSuggestions: document.getElementById('ai-suggestions-container'),
            suggestedQuestions: document.getElementById('suggested-questions-list'),
            suggestedPersonas: document.getElementById('suggested-personas-list'),
            suggestedApps: document.getElementById('suggested-apps-list'),
            addContainerThemePreview: document.getElementById('add-container-theme-preview'),
            toast: document.getElementById('toast-notification'),
            containerWebsiteGroup: document.getElementById('container-website-group'),
            appearancePreview: document.getElementById('appearance-preview'),
            sidebarPreview: document.getElementById('sidebar-preview'),
            brandingPreview: document.getElementById('branding-preview'),
            loginAppLogo: document.getElementById('login-app-logo'),
            hubAppLogo: document.getElementById('hub-app-logo'),
            cookieBanner: document.getElementById('cookie-consent-banner'),
            containerManagementCard: document.getElementById('container-management-card'),
            globalSettingsCard: document.getElementById('global-settings-card'),
            integrationsGrid: document.getElementById('integrations-grid'),
            containerIntegrationsList: document.getElementById('container-integrations-list'),
            cardImageOptionsList: document.getElementById('card-image-options-list'),
        },
        textElements: {
            containerPageTitle: document.getElementById('container-page-title'),
            sidebarContainerTitle: document.getElementById('sidebar-container-title'),
            attachmentFilename: document.getElementById('attachment-filename'),
            settingsHubTitle: document.getElementById('settings-hub-title'),
            containerManagementTitle: document.getElementById('container-management-title'),
            globalSettingsTitle: document.getElementById('global-settings-title'),
            settingsDetailTitle: document.getElementById('settings-detail-title'),
            functionRunnerTitle: document.getElementById('function-runner-title'),
            deleteItemName: document.getElementById('delete-item-name'),
            deleteConfirmDescription: document.getElementById('delete-confirm-description'),
            aiStatusText: document.getElementById('ai-status-text'),
            aiStatusSpinner: document.getElementById('ai-status-spinner'),
            welcomeTitle: document.getElementById('welcome-title'),
            knowledgePageTitle: document.getElementById('knowledge-page-title'),
            knowledgeTitle: document.getElementById('knowledge-title'),
            knowledgeSubtitle: document.getElementById('knowledge-subtitle'),
            loginTitle: document.getElementById('login-title-text'),
            loginSubtitle: document.getElementById('login-subtitle-text'),
            hubHeaderTitle: document.getElementById('hub-header-title'),
            hubTitle: document.getElementById('hub-title-text'),
            hubSubtitle: document.getElementById('hub-subtitle-text'),
            brandingPreviewTitle: document.getElementById('branding-preview-title'),
            brandingPreviewSubtitle: document.getElementById('branding-preview-subtitle'),
            privacyPolicyLink: document.getElementById('privacy-policy-link') as HTMLAnchorElement,
        },
        loaders: {
            sendChat: document.querySelector('#send-chat-btn .thinking-loader'),
            aiGenerate: document.querySelector('#generate-ai-btn .thinking-loader'),
        },
        previews: {
            addCustomIcon: document.getElementById('add-custom-icon-preview') as HTMLImageElement,
            editCustomIcon: document.getElementById('edit-custom-icon-preview') as HTMLImageElement,
            editCardImage: document.getElementById('edit-card-image-preview') as HTMLImageElement,
            addContainerTheme: document.querySelector('#add-container-theme-preview .appearance-preview'),
            brandingLogo: document.getElementById('branding-preview-logo'),
        }
    };

    // --- [MODULE] src/state.ts ---
    const state = {
        containers: [] as Container[],
        branding: { ...DEFAULT_BRANDING },
        availableModels: [] as AIModel[],
        draftBranding: null as Branding | null,
        draftAvailableModels: null as AIModel[] | null,
        currentContainerId: null as string | null,
        currentSettingsContainerId: null as string | null,
        draftSettingsContainer: null as Container | null,
        attachedFile: null as { name: string, type: string, base64: string } | null,
        draftNewContainer: null as DraftNewContainer | null,
        currentRunningFunction: null as AppFunction | null,
        containerChats: new Map<string, Chat>(), // Key: `${containerId}-${chatId}-${modelName}`
        itemToDelete: null as ItemToDelete,
    };

    // --- [MODULE] src/utils.ts ---
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = error => reject(error);
        });
    };

    const markdownToHtml = (md: string): string => {
        let html = md.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return html.replace(/^### (.*$)/gim, '<h3>$1</h3>').replace(/^## (.*$)/gim, '<h2>$1</h2>').replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/^\s*[\*-] (.*$)/gim, '<li>$1</li>').replace(/(<\/li>\s*<li>)/g, '</li><li>')
            .replace(/((<li>.*<\/li>)+)/gs, '<ul>$1</ul>').replace(/\n/g, '<br />').replace(/<br \/>\s*<h[1-3]>/g, '<h$1>')
            .replace(/<\/h[1-3]>\s*<br \/>/g, '</h3>').replace(/<br \/>\s*<ul>/g, '<ul>').replace(/<\/ul>\s*<br \/>/g, '</ul>');
    };

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const formatDate = (isoString: string) => {
        return new Date(isoString).toLocaleDateString(undefined, {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    };

    const saveState = () => {
        try {
            const appState = {
                containers: state.containers,
                branding: state.branding,
                availableModels: state.availableModels
            };
            localStorage.setItem('appState', JSON.stringify(appState));
        } catch (error) {
            console.error("Could not save state to localStorage:", error);
        }
    };
    
    const loadState = () => {
        try {
            const savedState = localStorage.getItem('appState');
            if (savedState) {
                const parsedState = JSON.parse(savedState);
                state.containers = parsedState.containers || [];
                // Deep merge branding to handle new properties gracefully
                state.branding = {
                    ...DEFAULT_BRANDING,
                    ...(parsedState.branding || {}),
                    integrations: {
                        ...DEFAULT_BRANDING.integrations,
                        ...(parsedState.branding?.integrations || {}),
                    }
                };
                state.availableModels = parsedState.availableModels || [...DEFAULT_MODELS];
            } else {
                // First time load: create IDs for initial data
                state.containers = INITIAL_CONTAINERS_DATA.map(c => ({
                    ...c,
                    id: `cont-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
                    chats: [],
                    activeChatId: null,
                }));
                state.branding = { ...DEFAULT_BRANDING };
                state.availableModels = [...DEFAULT_MODELS];
                saveState();
            }
        } catch (error) {
            console.error("Could not load state from localStorage:", error);
            // Fallback to defaults
            state.containers = [];
            state.branding = { ...DEFAULT_BRANDING };
            state.availableModels = [...DEFAULT_MODELS];
        }
    };

    // --- [MODULE] src/ui.ts ---
    const checkForSettingChanges = (isInitial: boolean = false) => {
        if (!state.currentSettingsContainerId || !state.draftSettingsContainer) return;
        const originalContainer = state.containers.find(c => c.id === state.currentSettingsContainerId);
        if (!originalContainer) return;

        const hasChanges = JSON.stringify(originalContainer) !== JSON.stringify(state.draftSettingsContainer);

        if (DOM.buttons.saveSettings && DOM.buttons.cancelSettings) {
            DOM.buttons.saveSettings.disabled = !hasChanges;
            DOM.buttons.cancelSettings.disabled = !hasChanges;
        }

        if (isInitial) {
            DOM.buttons.saveSettings.disabled = true;
            DOM.buttons.cancelSettings.disabled = true;
        }
    };

    const checkForGlobalSettingChanges = (isInitial: boolean = false) => {
        if (!state.draftBranding || !state.draftAvailableModels) return;

        const brandingChanged = JSON.stringify(state.branding) !== JSON.stringify(state.draftBranding);
        const modelsChanged = JSON.stringify(state.availableModels) !== JSON.stringify(state.draftAvailableModels);
        const hasChanges = brandingChanged || modelsChanged;

        if (DOM.buttons.saveGlobalSettings && DOM.buttons.cancelGlobalSettings) {
            DOM.buttons.saveGlobalSettings.disabled = !hasChanges;
            DOM.buttons.cancelGlobalSettings.disabled = !hasChanges;
        }

        if (isInitial) {
            DOM.buttons.saveGlobalSettings.disabled = true;
            DOM.buttons.cancelGlobalSettings.disabled = true;
        }
    };

    const openFunctionRunner = (func: AppFunction) => {
        if (!DOM.modals.functionRunner || !DOM.textElements.functionRunnerTitle || !DOM.containers.functionRunnerBody || !DOM.forms.functionRunner) return;

        state.currentRunningFunction = func;

        DOM.textElements.functionRunnerTitle.textContent = func.name;
        DOM.containers.functionRunnerBody.innerHTML = ''; // Clear previous form

        func.parameters.forEach(param => {
            const paramGroup = document.createElement('div');
            paramGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = `param-${param.name.replace(/\s+/g, '-')}`;
            label.textContent = param.name;
            
            let inputElement;
            if (param.type === 'textarea') {
                inputElement = document.createElement('textarea');
            } else {
                inputElement = document.createElement('input');
                inputElement.type = param.type === 'number' ? 'number' : 'text';
            }
            inputElement.id = `param-${param.name.replace(/\s+/g, '-')}`;
            inputElement.name = param.name;
            inputElement.className = 'form-input';
            inputElement.placeholder = param.description;
            inputElement.required = true;

            const description = document.createElement('p');
            description.className = 'form-help-text';
            description.textContent = param.description;

            paramGroup.appendChild(label);
            paramGroup.appendChild(inputElement);
            paramGroup.appendChild(description);
            DOM.containers.functionRunnerBody.appendChild(paramGroup);
        });

        DOM.modals.functionRunner.classList.remove('hidden');
    };
    
    const showPage = (pageKey: keyof typeof DOM.pageViews, title?: string) => {
        const pageName = title || (pageKey.charAt(0).toUpperCase() + pageKey.slice(1)).replace(/([A-Z])/g, ' $1').trim();
        document.title = `The Future of Tech - ${pageName}`;
        Object.values(DOM.pageViews).forEach(page => page?.classList.add('hidden'));
        DOM.pageViews[pageKey]?.classList.remove('hidden');

        const isContainerPage = pageKey === 'department' || pageKey === 'knowledge';
        document.body.classList.toggle('no-sidebar', !isContainerPage);

        // Manage sidebar visibility for container pages
        if (isContainerPage) {
            const isSidebarOpen = DOM.pageViews.department?.classList.contains('sidebar-open');
            if (window.innerWidth < 992 && !isSidebarOpen) {
                 DOM.pageViews.department?.classList.remove('sidebar-open');
            } else if (window.innerWidth >= 992) {
                 DOM.pageViews.department?.classList.add('sidebar-open');
            }
        } else {
             DOM.pageViews.department?.classList.remove('sidebar-open');
        }
    };

    const showToast = (message: string) => {
        if (!DOM.containers.toast) return;
        DOM.containers.toast.textContent = message;
        DOM.containers.toast.classList.add('show');
        setTimeout(() => {
            DOM.containers.toast?.classList.remove('show');
        }, 3000);
    };

    const addMessageToUI = (parts: Part[], sender: 'user' | 'bot', thinking: boolean = false) => {
        if (!DOM.containers.chatMessages) return null;

        if (DOM.containers.chatWelcome && !DOM.containers.chatWelcome.classList.contains('hidden')) {
            DOM.containers.chatWelcome.classList.add('hidden');
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        if (thinking) {
            messageDiv.classList.add('thinking');
            messageDiv.id = 'thinking-indicator';
            messageDiv.innerHTML = `<div class="dot"></div><div class="dot"></div><div class="dot"></div>`;
        } else {
            let fullText = '';
            parts.forEach(part => {
                if ('text' in part) {
                    const text = part.text as string;
                    messageDiv.innerHTML += markdownToHtml(text);
                    fullText += text;
                }
            });
            
            if (fullText.length > 15) {
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.setAttribute('aria-label', 'Copy message');
                copyBtn.innerHTML = `<svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg><svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
                copyBtn.addEventListener('click', () => { navigator.clipboard.writeText(fullText).then(() => { copyBtn.classList.add('copied'); setTimeout(() => copyBtn.classList.remove('copied'), 1500); }); });
                messageDiv.appendChild(copyBtn);
            }
        }

        DOM.containers.chatMessages.appendChild(messageDiv);
        DOM.containers.chatMessages.scrollTop = DOM.containers.chatMessages.scrollHeight;
        return messageDiv;
    };

    const renderAddContainerSuggestions = () => {
        if (!state.draftNewContainer || !DOM.containers.suggestedQuestions || !DOM.containers.suggestedPersonas || !DOM.containers.suggestedApps || !DOM.previews.addContainerTheme) return;

        const draft = state.draftNewContainer;

        // Set description and icon in the main form
        if (DOM.inputs.containerDesc) {
            DOM.inputs.containerDesc.value = draft.description;
        }
        if (DOM.containers.containerIconSelector) {
            const iconButton = DOM.containers.containerIconSelector.querySelector(`button[data-icon='${draft.icon}']`) as HTMLButtonElement;
            if (iconButton) {
                DOM.containers.containerIconSelector.querySelector('.selected')?.classList.remove('selected');
                iconButton.classList.add('selected');
            }
        }

        // Update theme preview
        if(DOM.previews.addContainerTheme) {
            updateAppearancePreview(draft.theme, DOM.previews.addContainerTheme as HTMLElement, null);
        }
        
        const populateList = (element: HTMLElement, items: string[]) => {
            element.innerHTML = '';
            items.forEach(itemText => {
                const item = document.createElement('li');
                item.textContent = itemText;
                element.appendChild(item);
            });
        };

        populateList(DOM.containers.suggestedQuestions, draft.quickQuestions);
        populateList(DOM.containers.suggestedPersonas, draft.availablePersonas);
        
        DOM.containers.suggestedApps.innerHTML = '';
        draft.functions.forEach(func => {
            const item = document.createElement('div');
            item.className = 'suggested-app-item';
            item.innerHTML = `${func.icon} <span>${func.name}</span>`;
            DOM.containers.suggestedApps.appendChild(item);
        });
    };

    const renderChatHistory = (containerId: string) => {
        if (!DOM.containers.chatMessages || !DOM.containers.chatWelcome) return;

        DOM.containers.chatMessages.querySelectorAll('.chat-message').forEach(el => el.remove());

        const container = state.containers.find(c => c.id === containerId);
        if (!container) return;

        const activeChat = container.chats.find(c => c.id === container.activeChatId);
        const history = activeChat ? activeChat.history : [];

        if (history.length === 0 && container) {
            if (DOM.containers.welcomeIcon) {
                renderIcon(DOM.containers.welcomeIcon, container.icon);
            }
            if (DOM.textElements.welcomeTitle) DOM.textElements.welcomeTitle.textContent = `Welcome to ${container.name}`;

            if (DOM.containers.welcomeQuestions) {
                DOM.containers.welcomeQuestions.innerHTML = '';
                container.quickQuestions.slice(0, 4).forEach(q => {
                    const bubble = document.createElement('button');
                    bubble.className = 'quick-question';
                    bubble.textContent = q;
                    DOM.containers.welcomeQuestions.appendChild(bubble);
                });
            }
            DOM.containers.chatWelcome.classList.remove('hidden');
        } else {
            DOM.containers.chatWelcome.classList.add('hidden');
            history.forEach(message => addMessageToUI(message.parts, message.role === 'user' ? 'user' : 'bot'));
        }
    };

    const renderSidebar = (containerId: string) => {
        const container = state.containers.find(c => c.id === containerId);
        if (!container) return;

        if (DOM.containers.sidebarKnowledgeLink?.parentElement) {
            DOM.containers.sidebarKnowledgeLink.parentElement.classList.toggle('hidden', !container.isKnowledgeBasePublic);
        }
        DOM.buttons.attachment.classList.toggle('hidden', !container.isKnowledgeBasePublic);


        if (DOM.containers.sidebarAppsSection) {
            DOM.containers.sidebarAppsSection.innerHTML = '';
            const enabledFunctions = container.functions.filter(f => f.enabled);
            if (enabledFunctions.length > 0) {
                const title = document.createElement('h3');
                title.className = 'sidebar-section-title';
                title.textContent = 'Apps';
                DOM.containers.sidebarAppsSection.appendChild(title);
                const list = document.createElement('ul');
                enabledFunctions.forEach(func => {
                    const item = document.createElement('li');
                    const link = document.createElement('a');
                    link.className = 'sidebar-link';
                    link.innerHTML = `${func.icon}<span>${func.name}</span>`;
                    link.onclick = () => openFunctionRunner(func);
                    item.appendChild(link);
                    list.appendChild(item);
                });
                DOM.containers.sidebarAppsSection.appendChild(list);
            }
        }

        if (DOM.containers.sidebarIntegrationsSection) {
            DOM.containers.sidebarIntegrationsSection.innerHTML = '';
            if (container.enabledIntegrations.length > 0) {
                 const title = document.createElement('h3');
                title.className = 'sidebar-section-title';
                title.textContent = 'Integrations';
                DOM.containers.sidebarIntegrationsSection.appendChild(title);
                const list = document.createElement('ul');
                container.enabledIntegrations.forEach(integKey => {
                     const details = getIntegrationDetails(integKey as keyof Branding['integrations']);
                     const item = document.createElement('li');
                     const link = document.createElement('a');
                     link.className = 'sidebar-link';
                     link.innerHTML = `${details.icon}<span>${details.name}</span>`;
                     item.appendChild(link);
                     list.appendChild(item);
                });
                DOM.containers.sidebarIntegrationsSection.appendChild(list);
            }
        }

        if (DOM.containers.sidebarHistoryList) {
            DOM.containers.sidebarHistoryList.innerHTML = '';
            container.chats.forEach(chat => {
                const item = document.createElement('li');
                const link = document.createElement('a');
                link.className = 'sidebar-link';
                if (chat.id === container.activeChatId) {
                    link.classList.add('active');
                }
                link.dataset.chatId = chat.id;
                link.innerHTML = `<span>${chat.name}</span>`;

                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'delete-chat-btn';
                deleteBtn.setAttribute('aria-label', `Delete conversation: ${chat.name}`);
                deleteBtn.innerHTML = `&times;`;
                deleteBtn.onclick = (e) => {
                    e.stopPropagation();
                    handleDeleteChatClick(container.id, chat.id);
                };

                item.appendChild(link);
                item.appendChild(deleteBtn);
                DOM.containers.sidebarHistoryList.appendChild(item);
            });
        }
    };

    const renderIcon = (element: HTMLElement, icon: string) => {
        if (icon.startsWith('data:image')) {
            element.innerHTML = `<img src="${icon}" alt="Container Icon">`;
        } else {
            element.innerHTML = icon;
        }
    };

    const renderBranding = () => {
        const { branding } = state;

        if (DOM.textElements.loginTitle) DOM.textElements.loginTitle.textContent = branding.loginTitle;
        if (DOM.textElements.loginSubtitle) DOM.textElements.loginSubtitle.textContent = branding.loginSubtitle;
        if (DOM.buttons.googleLogin?.parentElement) DOM.buttons.googleLogin.parentElement.style.display = branding.enableGoogleLogin ? 'flex' : 'none';
        if (DOM.buttons.microsoftLogin?.parentElement) DOM.buttons.microsoftLogin.parentElement.style.display = branding.enableMicrosoftLogin ? 'flex' : 'none';
        if (DOM.textElements.hubHeaderTitle) DOM.textElements.hubHeaderTitle.textContent = branding.hubHeaderTitle;
        if (DOM.textElements.hubTitle) DOM.textElements.hubTitle.textContent = branding.hubTitle;
        if (DOM.textElements.hubSubtitle) DOM.textElements.hubSubtitle.textContent = branding.hubSubtitle;

        const logoHtml = branding.appLogo
            ? `<img src="${branding.appLogo}" alt="App Logo">`
            : `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M20 35 L50 50 L80 35 M50 50 L50 80" fill="none" stroke="currentColor" stroke-width="4"/></svg>`;

        if (DOM.containers.loginAppLogo) DOM.containers.loginAppLogo.innerHTML = logoHtml;
        if (DOM.containers.hubAppLogo) DOM.containers.hubAppLogo.innerHTML = logoHtml;

        if (DOM.containers.cookieBanner) {
            if (branding.enableCookieBanner && !localStorage.getItem('cookiesAccepted')) {
                DOM.containers.cookieBanner.classList.remove('hidden');
            } else {
                DOM.containers.cookieBanner.classList.add('hidden');
            }
        }
        if (DOM.textElements.privacyPolicyLink) {
            if (branding.privacyPolicyUrl) {
                DOM.textElements.privacyPolicyLink.href = branding.privacyPolicyUrl;
                DOM.textElements.privacyPolicyLink.style.display = 'inline';
            } else {
                DOM.textElements.privacyPolicyLink.style.display = 'none';
            }
        }
    };

    const renderAllContainers = () => {
        if (!DOM.containers.containerGrid || !DOM.containers.containerManagementGrid) return;
        DOM.containers.containerGrid.innerHTML = '';
        DOM.containers.containerManagementGrid.innerHTML = '';
        state.containers.forEach(container => {
            const card = document.createElement('div');
            card.className = 'management-card';
            card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('data-container-id', container.id);

            const hubCard = card.cloneNode(true) as HTMLElement;
            hubCard.innerHTML = `
                <div class="management-card-bg" style="background-image: url('${container.cardImageUrl}');"></div>
                <div class="management-card-overlay">
                    <h3 class="management-card-title">${container.name}</h3>
                    <p class="management-card-description">${container.description}</p>
                </div>
            `;
            DOM.containers.containerGrid.appendChild(hubCard);
            
            card.innerHTML = `
                <div class="management-card-bg" style="background-image: url('${container.cardImageUrl}');"></div>
                <div class="management-card-overlay">
                    <h3 class="management-card-title">${container.name}</h3>
                </div>
            `;
            DOM.containers.containerManagementGrid.appendChild(card);
        });
    };

    const renderManagedList = (containerEl: HTMLElement | null, items: string[], onRemove: (index: number) => void) => {
        if (!containerEl) return;
        containerEl.innerHTML = '';
        items.forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'managed-list-item';
            el.innerHTML = `<span>${item}</span>`;
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '&times;'; removeBtn.onclick = () => onRemove(index);
            el.appendChild(removeBtn);
            containerEl.appendChild(el);
        });
    };

    const renderQuickQuestionsList = () => {
        if (!state.draftSettingsContainer) return;
        const list = state.draftSettingsContainer.quickQuestions;
        renderManagedList(DOM.containers.quickQuestionsList, list, (index) => {
            list.splice(index, 1);
            renderQuickQuestionsList();
            checkForSettingChanges();
        });
    };

    const renderPersonasList = () => {
        if (!state.draftSettingsContainer) return;
        const list = state.draftSettingsContainer.availablePersonas;
        renderManagedList(DOM.containers.personasList, list, (index) => {
            list.splice(index, 1);
            renderPersonasList();
            checkForSettingChanges();
        });
    };

    const renderAccessControlList = () => {
        if (!state.draftSettingsContainer) return;
        const list = state.draftSettingsContainer.accessControl;
        renderManagedList(DOM.containers.accessControlList, list, (index) => {
            list.splice(index, 1);
            renderAccessControlList();
            checkForSettingChanges();
        });
    };

    const renderFunctionsList = (containerId: string) => {
        if (!DOM.containers.functionsList || !state.draftSettingsContainer) return;
        const draft = state.draftSettingsContainer;
        DOM.containers.functionsList.innerHTML = '';
        draft.functions.forEach((func, index) => {
            const el = document.createElement('div');
            el.className = 'managed-list-item function-item';
            el.innerHTML = `<div class="function-item-icon">${func.icon}</div><div class="function-item-details"><strong>${func.name}</strong><p>${func.description}</p></div><div class="function-controls"><label class="toggle-switch"><input type="checkbox" ${func.enabled ? 'checked' : ''}><span class="slider"></span></label><button class="remove-btn" aria-label="Remove function">&times;</button></div>`;
            (el.querySelector('input[type="checkbox"]') as HTMLInputElement)?.addEventListener('change', (e) => {
                draft.functions[index].enabled = (e.target as HTMLInputElement).checked;
                checkForSettingChanges();
            });
            el.querySelector('.remove-btn')?.addEventListener('click', () => {
                draft.functions.splice(index, 1);
                renderFunctionsList(containerId);
                checkForSettingChanges();
            });
            DOM.containers.functionsList.appendChild(el);
        });
    };

    const renderIconSelector = (containerEl: HTMLElement | null, onSelect: (icon: string) => void, selectedIcon: string) => {
        if (!containerEl) return;
        containerEl.innerHTML = '';
        AVAILABLE_ICONS.forEach(iconSvg => {
            const iconOption = document.createElement('button');
            iconOption.type = 'button';
            iconOption.className = 'icon-option';
            iconOption.innerHTML = iconSvg;
            iconOption.setAttribute('data-icon', iconSvg);
            if (iconSvg === selectedIcon) iconOption.classList.add('selected');

            iconOption.addEventListener('click', () => {
                containerEl.querySelector('.selected')?.classList.remove('selected');
                iconOption.classList.add('selected');
                onSelect(iconSvg);
            });
            containerEl.appendChild(iconOption);
        });
    };

    const renderAppearanceSettings = (container: Container) => {
        DOM.inputs.userBgColor.value = container.theme.userBg;
        DOM.inputs.userTextColor.value = container.theme.userText;
        DOM.inputs.botBgColor.value = container.theme.botBg;
        DOM.inputs.botTextColor.value = container.theme.botText;
        DOM.inputs.bgGradientStartColor.value = container.theme.bgGradientStart;
        DOM.inputs.bgGradientEndColor.value = container.theme.bgGradientEnd;
        DOM.inputs.sidebarBgColor.value = container.theme.sidebarBg;
        DOM.inputs.sidebarTextColor.value = container.theme.sidebarText;
        DOM.inputs.sidebarHighlightBgColor.value = container.theme.sidebarHighlightBg;
        updateAppearancePreview(container.theme);
    };

    const getIntegrationDetails = (key: keyof Branding['integrations']) => {
        const details: { [key: string]: { name: string, icon: string } } = {
            sharepoint: { name: 'SharePoint', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="color: #0072C6;"><path d="M14.3,3.2H4.5C3.7,3.2,3,3.9,3,4.7v14.6C3,20.1,3.7,20.8,4.5,20.8h14.9c0.8,0,1.5-0.7,1.5-1.5V8.5L14.3,3.2z M17.2,17.2H6.8V6.8h6.9v3.6h3.6V17.2z"/></svg>` },
            brevo: { name: 'Brevo', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="color: #009DFF;"><path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M15.6,15.6L12,12l3.6-3.6l-1.4-1.4L9.2,12l4.2,4.2L15.6,15.6z"/></svg>` },
            hubspot: { name: 'HubSpot', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="color: #FF7A59;"><path d="M12.9,2.4c-0.2-0.2-0.5-0.2-0.7,0L3.7,10.9c-0.2,0.2-0.2,0.5,0,0.7l8.5,8.5c0.2,0.2,0.5,0.2,0.7,0l8.5-8.5c0.2-0.2,0.2-0.5,0-0.7L12.9,2.4z M12,16.5c-2.5,0-4.5-2,4.5-4.5s2-4.5,4.5-4.5s4.5,2,4.5,4.5S14.5,16.5,12,16.5z"/></svg>` },
            docusign: { name: 'DocuSign', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="color: #FFC425;"><path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M15,15H9v-2h6V15z M17,11H7V9h10V11z"/></svg>` },
            outlook: { name: 'Outlook', icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="color: #0078D4;"><path d="M21,4H3C1.9,4,1,4.9,1,6v12c0,1.1,0.9,2,2,2h18c1.1,0,2-0.9,2-2V6C23,4.9,22.1,4,21,4z M12,13.5L3.5,8H20.5L12,13.5z M3,6h1V7l8,5l8-5V6h1v12H3V6z"/></svg>` },
        };
        return details[key] || { name: key, icon: '' };
    }

    const renderIntegrations = (integrations: Branding['integrations']) => {
        if (!DOM.containers.integrationsGrid) return;
        DOM.containers.integrationsGrid.innerHTML = '';
        for (const key in integrations) {
            if (Object.prototype.hasOwnProperty.call(integrations, key)) {
                const typedKey = key as keyof Branding['integrations'];
                const details = getIntegrationDetails(typedKey);
                const card = document.createElement('div');
                card.className = 'integration-card';
                card.innerHTML = `
                    <div class="integration-icon">${details.icon}</div>
                    <span class="integration-name">${details.name}</span>
                    <label class="toggle-switch">
                        <input type="checkbox" data-integration-key="${typedKey}" ${integrations[typedKey] ? 'checked' : ''}>
                        <span class="slider"></span>
                    </label>
                `;
                card.querySelector('input')?.addEventListener('change', (e) => {
                    const target = e.target as HTMLInputElement;
                    const integrationKey = target.dataset.integrationKey as keyof Branding['integrations'];
                    if (state.draftBranding && integrationKey) {
                        state.draftBranding.integrations[integrationKey] = target.checked;
                        checkForGlobalSettingChanges();
                    }
                });
                DOM.containers.integrationsGrid.appendChild(card);
            }
        }
    };

    const renderBrandingSettings = (branding: Branding) => {
        DOM.inputs.editLoginTitle.value = branding.loginTitle;
        DOM.inputs.editLoginSubtitle.value = branding.loginSubtitle;
        DOM.inputs.editHubHeaderTitle.value = branding.hubHeaderTitle;
        DOM.inputs.editHubTitle.value = branding.hubTitle;
        DOM.inputs.editHubSubtitle.value = branding.hubSubtitle;
        DOM.inputs.enableGoogleLogin.checked = branding.enableGoogleLogin;
        DOM.inputs.googleClientId.value = branding.googleClientId;
        DOM.inputs.googleClientSecret.value = branding.googleClientSecret;
        DOM.inputs.enableMicrosoftLogin.checked = branding.enableMicrosoftLogin;
        DOM.inputs.microsoftClientId.value = branding.microsoftClientId;
        DOM.inputs.microsoftClientSecret.value = branding.microsoftClientSecret;
        DOM.inputs.enableCookieBanner.checked = branding.enableCookieBanner;
        DOM.inputs.privacyPolicyUrl.value = branding.privacyPolicyUrl;
        renderIntegrations(branding.integrations);
        updateBrandingPreview(branding);
    };

    const renderModelManagementList = () => {
        if (!DOM.containers.modelManagementList || !state.draftAvailableModels) return;
        DOM.containers.modelManagementList.innerHTML = '';
        state.draftAvailableModels.forEach((model, index) => {
            const el = document.createElement('div');
            el.className = 'managed-list-item';
            el.innerHTML = `
                <div class="model-management-item-icon">${model.icon}</div>
                <input type="text" class="form-input" value="${model.id}" data-index="${index}" data-field="id" placeholder="Model ID">
                <input type="text" class="form-input" value="${model.api}" data-index="${index}" data-field="api" placeholder="API Provider">
                <input type="text" class="form-input" value='${model.icon}' data-index="${index}" data-field="icon" placeholder="SVG Icon Code">
            `;
            const removeBtn = document.createElement('button');
            removeBtn.innerHTML = '&times;';
            removeBtn.onclick = () => {
                if (!state.draftAvailableModels) return;
                state.draftAvailableModels.splice(index, 1);
                renderModelManagementList();
                checkForGlobalSettingChanges();
            };
            el.appendChild(removeBtn);
            el.querySelectorAll<HTMLInputElement>('input').forEach(input => {
                input.addEventListener('input', () => {
                    if (!state.draftAvailableModels) return;
                    const field = input.dataset.field as keyof AIModel;
                    state.draftAvailableModels[index][field] = input.value;
                    if (field === 'icon') {
                        const iconContainer = input.parentElement?.querySelector('.model-management-item-icon');
                        if(iconContainer) iconContainer.innerHTML = input.value;
                    }
                    checkForGlobalSettingChanges();
                });
            });
            DOM.containers.modelManagementList.appendChild(el);
        });
    };

    const updateAppearancePreview = (theme: ChatTheme, element: HTMLElement | null = DOM.containers.appearancePreview, sidebarElement: HTMLElement | null = DOM.containers.sidebarPreview) => {
        if (element) {
            element.style.setProperty('--preview-user-bg', theme.userBg);
            element.style.setProperty('--preview-user-text', theme.userText);
            element.style.setProperty('--preview-bot-bg', theme.botBg);
            element.style.setProperty('--preview-bot-text', theme.botText);
            element.style.setProperty('--preview-bg-start', theme.bgGradientStart);
            element.style.setProperty('--preview-bg-end', theme.bgGradientEnd);
        }
        if (sidebarElement) {
            sidebarElement.style.setProperty('--preview-sidebar-bg', theme.sidebarBg);
            sidebarElement.style.setProperty('--preview-sidebar-text', theme.sidebarText);
            sidebarElement.style.setProperty('--preview-sidebar-highlight-bg', theme.sidebarHighlightBg);
        }
    };

    const updateBrandingPreview = (branding: Branding) => {
        if (!DOM.previews.brandingLogo || !DOM.textElements.brandingPreviewTitle || !DOM.textElements.brandingPreviewSubtitle) return;
        if (branding.appLogo) {
            DOM.previews.brandingLogo.innerHTML = `<img src="${branding.appLogo}" alt="App Logo Preview">`;
        } else {
            DOM.previews.brandingLogo.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" fill="none" stroke="currentColor" stroke-width="5"/><path d="M20 35 L50 50 L80 35 M50 50 L50 80" fill="none" stroke="currentColor" stroke-width="4"/></svg>`;
        }
        DOM.textElements.brandingPreviewTitle.textContent = branding.loginTitle;
        DOM.textElements.brandingPreviewSubtitle.textContent = branding.loginSubtitle;
    };

    const renderContainerSettings = (containerId: string) => {
        const container = state.containers.find(c => c.id === containerId);
        if (!container) return;
        state.draftSettingsContainer = JSON.parse(JSON.stringify(container));
        const draft = state.draftSettingsContainer!;
        state.currentSettingsContainerId = containerId;
        if (DOM.textElements.settingsDetailTitle) DOM.textElements.settingsDetailTitle.textContent = `Edit: ${draft.name}`;
        DOM.inputs.editContainerName.value = draft.name;
        DOM.inputs.editContainerDesc.value = draft.description;
        renderIconSelector(DOM.containers.editContainerIconSelector, (icon) => { draft.icon = icon; checkForSettingChanges(); }, draft.icon);
        DOM.previews.editCustomIcon.src = draft.icon.startsWith('data:image') ? draft.icon : '';
        DOM.previews.editCustomIcon.classList.toggle('hidden', !draft.icon.startsWith('data:image'));
        renderAppearanceSettings(draft);
        
        renderQuickQuestionsList();
        renderPersonasList();
        renderAccessControlList();
        
        DOM.inputs.isKnowledgePublic.checked = draft.isKnowledgeBasePublic;

        if (DOM.containers.availableModelsList) {
            DOM.containers.availableModelsList.innerHTML = '';
            state.availableModels.forEach(model => {
                const label = document.createElement('label');
                label.className = 'checkbox-label';
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = model.id;
                checkbox.checked = draft.availableModels.includes(model.id);
                if (model.id === 'gemini-2.5-flash') checkbox.disabled = true;
                label.append(checkbox, ` ${model.id}`);
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        draft.availableModels.push(model.id);
                    } else {
                        const index = draft.availableModels.indexOf(model.id);
                        if (index > -1) draft.availableModels.splice(index, 1);
                    }
                    if (!draft.availableModels.includes(draft.selectedModel)) {
                        draft.selectedModel = draft.availableModels[0] || 'gemini-2.5-flash';
                    }
                    checkForSettingChanges();
                });
                DOM.containers.availableModelsList.appendChild(label);
            });
        }
        
        renderFunctionsList(containerId);
        renderCardImageSettings(draft);
        renderContainerIntegrations(draft);
        
        const inputsToWatch = [
            DOM.inputs.editContainerName, DOM.inputs.editContainerDesc,
            DOM.inputs.userBgColor, DOM.inputs.userTextColor, DOM.inputs.botBgColor,
            DOM.inputs.botTextColor, DOM.inputs.bgGradientStartColor, DOM.inputs.bgGradientEndColor,
            DOM.inputs.sidebarBgColor, DOM.inputs.sidebarTextColor, DOM.inputs.sidebarHighlightBgColor,
            DOM.inputs.isKnowledgePublic
        ];
        inputsToWatch.forEach(input => {
            if (input) {
                input.oninput = null; // Clear previous listeners
                const eventType = input.type === 'checkbox' ? 'onchange' : 'oninput';
                input[eventType] = () => {
                    if (!state.draftSettingsContainer) return;
                    const theme = state.draftSettingsContainer.theme;
                    state.draftSettingsContainer.name = DOM.inputs.editContainerName.value;
                    state.draftSettingsContainer.description = DOM.inputs.editContainerDesc.value;
                    theme.userBg = DOM.inputs.userBgColor.value;
                    theme.userText = DOM.inputs.userTextColor.value;
                    theme.botBg = DOM.inputs.botBgColor.value;
                    theme.botText = DOM.inputs.botTextColor.value;
                    theme.bgGradientStart = DOM.inputs.bgGradientStartColor.value;
                    theme.bgGradientEnd = DOM.inputs.bgGradientEndColor.value;
                    theme.sidebarBg = DOM.inputs.sidebarBgColor.value;
                    theme.sidebarText = DOM.inputs.sidebarTextColor.value;
                    theme.sidebarHighlightBg = DOM.inputs.sidebarHighlightBgColor.value;
                    state.draftSettingsContainer.isKnowledgeBasePublic = DOM.inputs.isKnowledgePublic.checked;
                    updateAppearancePreview(theme);
                    checkForSettingChanges();
                };
            }
        });
        checkForSettingChanges(true);
    };

    const renderCardImageSettings = (draft: Container) => {
        if (!DOM.containers.cardImageOptionsList || !DOM.previews.editCardImage) return;

        DOM.containers.cardImageOptionsList.innerHTML = '';
        CARD_IMAGE_OPTIONS.forEach(option => {
            const optionEl = document.createElement('button');
            optionEl.type = 'button';
            optionEl.className = 'icon-option image-option';
            optionEl.innerHTML = `<img src="${option.url}" alt="${option.description}">`;
            optionEl.dataset.url = option.url;
             if (option.url === draft.cardImageUrl) optionEl.classList.add('selected');
            optionEl.addEventListener('click', () => {
                draft.cardImageUrl = option.url;
                DOM.containers.cardImageOptionsList?.querySelector('.selected')?.classList.remove('selected');
                optionEl.classList.add('selected');
                DOM.previews.editCardImage.src = option.url;
                DOM.previews.editCardImage.classList.remove('hidden');
                checkForSettingChanges();
            });
            DOM.containers.cardImageOptionsList.appendChild(optionEl);
        });

        DOM.previews.editCardImage.src = draft.cardImageUrl;
        DOM.previews.editCardImage.classList.toggle('hidden', !draft.cardImageUrl);
    };

     const renderContainerIntegrations = (draft: Container) => {
        if (!DOM.containers.containerIntegrationsList) return;
        DOM.containers.containerIntegrationsList.innerHTML = '';
        const globallyEnabled = Object.entries(state.branding.integrations)
            .filter(([, isEnabled]) => isEnabled)
            .map(([key]) => key);

        if (globallyEnabled.length === 0) {
             DOM.containers.containerIntegrationsList.innerHTML = '<p class="form-help-text">No integrations are currently enabled globally. An administrator can enable them in Global Settings.</p>';
             return;
        }

        globallyEnabled.forEach(key => {
            const typedKey = key as keyof Branding['integrations'];
            const details = getIntegrationDetails(typedKey);
            const label = document.createElement('label');
            label.className = 'checkbox-label';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = typedKey;
            checkbox.checked = draft.enabledIntegrations.includes(typedKey);
            label.append(checkbox, ` ${details.name}`);
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    draft.enabledIntegrations.push(typedKey);
                } else {
                    const index = draft.enabledIntegrations.indexOf(typedKey);
                    if (index > -1) draft.enabledIntegrations.splice(index, 1);
                }
                checkForSettingChanges();
            });
            DOM.containers.containerIntegrationsList.appendChild(label);
        });
    };

    const closeAllPopups = (except?: HTMLElement) => {
        document.querySelectorAll('.select-options:not(.hidden), .attachment-options:not(.hidden), .user-profile-dropdown:not(.hidden)').forEach(el => {
            if (!except || !except.contains(el)) {
                 el.classList.add('hidden');
            }
        });
        document.querySelectorAll('.select-trigger[aria-expanded="true"], .user-profile-trigger[aria-expanded="true"]').forEach(el => {
             if (!except || !except.contains(el)) {
                el.setAttribute('aria-expanded', 'false');
            }
        });
    };

    const renderCustomSelect = (containerEl: HTMLElement | null, items: string[], selectedValue: string, onSelect: (value: string) => void, icons: { [key: string]: string } = {}) => {
        if (!containerEl) return;
        if (containerEl === DOM.containers.modelSelect) {
            containerEl.classList.add('icon-only');
        } else {
            containerEl.classList.remove('icon-only');
        }
        const currentIcon = icons[selectedValue] || '';
        containerEl.innerHTML = `
            <button class="select-trigger" aria-haspopup="listbox" aria-expanded="false">
                ${currentIcon ? `<span class="select-icon">${currentIcon}</span>` : ''}
                <span>${selectedValue}</span>
            </button>
            <div class="select-options hidden" role="listbox"></div>
        `;
        const trigger = containerEl.querySelector('.select-trigger') as HTMLButtonElement;
        const optionsContainer = containerEl.querySelector('.select-options') as HTMLDivElement;
        items.forEach(item => {
            const option = document.createElement('div');
            option.className = 'select-option';
            option.setAttribute('role', 'option');
            option.dataset.value = item;
            if (item === selectedValue) option.classList.add('selected');
            const icon = icons[item] || '';
            option.innerHTML = `${icon ? `<span class="select-icon">${icon}</span>` : ''}<span>${item}</span>`;
            option.addEventListener('click', () => {
                onSelect(item);
                trigger.querySelector('span:last-child')!.textContent = item;
                if(currentIcon) trigger.querySelector('.select-icon')!.innerHTML = icon;
                optionsContainer.classList.add('hidden');
                trigger.setAttribute('aria-expanded', 'false');
                optionsContainer.querySelector('.selected')?.classList.remove('selected');
                option.classList.add('selected');
            });
            optionsContainer.appendChild(option);
        });

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            closeAllPopups(containerEl); // Close others before opening
            if (!isExpanded) {
                optionsContainer.classList.remove('hidden');
                trigger.setAttribute('aria-expanded', 'true');
                containerEl.classList.add('open');
            }
        });
    };

    const renderKnowledgeFiles = () => {
        if (!DOM.containers.knowledgeFileList || !state.currentContainerId) return;
        const container = state.containers.find(c => c.id === state.currentContainerId);
        if (!container) return;

        DOM.containers.knowledgeFileList.innerHTML = '';
        if (container.knowledgeBase.length === 0) {
            DOM.containers.knowledgeFileList.innerHTML = '<p class="form-help-text">No files have been uploaded yet.</p>';
            return;
        }

        container.knowledgeBase.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'knowledge-file-item';
            fileItem.innerHTML = `
                <div class="file-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                </div>
                <div class="file-details">
                    <span class="file-name">${file.name}</span>
                    <div class="file-meta">
                        <span>${formatBytes(file.size)}</span>
                        <span>Uploaded: ${formatDate(file.uploadDate)}</span>
                    </div>
                </div>
            `;
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-file-btn';
            deleteBtn.setAttribute('aria-label', `Delete ${file.name}`);
            deleteBtn.innerHTML = '&times;';
            deleteBtn.onclick = () => handleDeleteFileClick(file.name);
            fileItem.appendChild(deleteBtn);
            DOM.containers.knowledgeFileList.appendChild(fileItem);
        });
    };


    // --- [MODULE] src/api.ts ---
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const generateSuggestions = async (containerName: string, suggestionType: 'questions' | 'personas') => {
        const prompt = suggestionType === 'questions'
            ? `Based on a container named '${containerName}', generate 4 diverse and insightful 'quick questions' a user might ask an AI assistant in this context. Focus on actionable and common queries.`
            : `Based on a container named '${containerName}', generate 4 creative and distinct 'personas' for an AI assistant. Examples: 'Concise Expert', 'Friendly Guide', 'Data-driven Analyst', 'Creative Brainstormer'.`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', contents: prompt,
                config: { responseMimeType: "application/json", responseSchema: { type: Type.OBJECT, properties: { suggestions: { type: Type.ARRAY, items: { type: Type.STRING } } } }
            });
            return JSON.parse(response.text).suggestions || [];
        } catch (error) {
            console.error(`Error generating ${suggestionType}:`, error);
            alert(`Sorry, I couldn't generate suggestions. Please try again.`);
            return [];
        }
    };

    const generateFunction = async (userRequest: string): Promise<Omit<AppFunction, 'id' | 'enabled'> | null> => {
        const prompt = `Based on the user request for a function: "${userRequest}", generate a configuration for it. The function should run inside a chat application. 
         - Define a short, clear 'name'.
         - Write a concise one-sentence 'description'.
         - Select a suitable SVG 'icon' from the provided list.
         - Define 1 to 3 input 'parameters' the user needs to provide (name, type, description). Parameter 'type' must be one of: 'string', 'number', 'textarea'.
         - Create a detailed 'promptTemplate' to be sent to another AI model. The prompt template must use placeholders like {parameterName} for each parameter defined.
        Available icons:\n${FUNCTION_ICONS.join('\n')}`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash', contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING }, description: { type: Type.STRING }, icon: { type: Type.STRING },
                            parameters: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, type: { type: Type.STRING, enum: ['string', 'number', 'textarea'] }, description: { type: Type.STRING } }, required: ['name', 'type', 'description'] } },
                            promptTemplate: { type: Type.STRING }
                        },
                        required: ['name', 'description', 'icon', 'parameters', 'promptTemplate']
                    }
                }
            });
            return JSON.parse(response.text);
        } catch (error) {
            console.error(`Error generating function:`, error);
            alert(`Sorry, I couldn't generate the function. The model might have returned an invalid structure. Please try again with a different request.`);
            return null;
        }
    };

    const generateContainerDetails = async (containerName: string, containerType: string, websiteUrl?: string) => {
        if (!DOM.buttons.generateAi || !DOM.textElements.aiStatusText || !DOM.containers.aiSuggestions || !DOM.loaders.aiGenerate || !DOM.textElements.aiStatusSpinner) return;

        DOM.buttons.generateAi.disabled = true;
        DOM.buttons.generateAi.classList.add('loading');
        DOM.loaders.aiGenerate.classList.remove('hidden');
        DOM.containers.aiSuggestions.classList.add('hidden');
        DOM.textElements.aiStatusSpinner.classList.remove('hidden');
        state.draftNewContainer = null;

        const statusMessages = [
            "Connecting to AI...",
            "Analyzing requirements...",
            "Crafting personas...",
            "Building function templates...",
            "Designing a color theme..."
        ];

        if (containerType === 'product' && websiteUrl) {
            statusMessages.splice(1, 1, "Analyzing website content...");
        }
        
        let messageIndex = 0;
        DOM.textElements.aiStatusText.textContent = statusMessages[messageIndex];
        const statusInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % statusMessages.length;
            if (DOM.textElements.aiStatusText) DOM.textElements.aiStatusText.textContent = statusMessages[messageIndex];
        }, 2000);

        const iconDescriptions = JSON.stringify(AVAILABLE_ICONS_WITH_DESC);
        const imageDescriptions = JSON.stringify(CARD_IMAGE_OPTIONS);
        let contextPrompt = `A user wants to create a new container in an application. The container is named "${containerName}" and is of the type "${containerType}".`;
        if (containerType === 'product' && websiteUrl) {
            contextPrompt += ` The product's website is ${websiteUrl}. Please analyze the website content to inform your suggestions, especially for the description, quick questions, and functions, making them highly relevant to the product. For example, a support bot for a software product might need functions to check system status or explain features.`;
        } else if (containerType === 'department') {
            contextPrompt += ` The container is for a corporate department. Tailor suggestions to a professional, internal-use context. For example, an HR container might need functions for leave policies or benefits lookup.`;
        }

        const prompt = `${contextPrompt}
Based on this context, generate a complete configuration:
- **description**: A concise, one-sentence summary of the container's purpose.
- **icon**: Choose the most appropriate SVG icon from the provided list by returning its exact SVG string.
- **cardImageUrl**: Choose the most thematically appropriate image URL from the provided list for a background card, paying close attention to the container's name ('${containerName}') and its purpose.
- **theme**: Suggest a complete color theme with nine hex color codes: userBg, userText, botBg, botText, bgGradientStart, bgGradientEnd, sidebarBg, sidebarText, and sidebarHighlightBg. Choose colors that are aesthetically pleasing, accessible (good contrast), and reflect the container's purpose (e.g., professional tones for 'Finance', creative colors for 'Design').
- **quickQuestions**: Generate an array of 4 diverse and insightful string 'quick questions' a user might ask.
- **availablePersonas**: Generate an array of 4 creative and distinct string 'personas' for the AI assistant.
- **functions**: Generate an array of 2-3 relevant 'functions' a user might need. For each function, provide: name, description, an icon from the function icon list, 1-2 parameters (name, type, description), and a detailed promptTemplate using placeholders like {parameterName}.
- **initialKnowledgeFile**: If a website URL was provided, generate a text file summarizing the key information from the site. This object must have a 'name' (e.g., "Website_Summary.txt") and 'content' (a plain-text summary). If no URL, return null for this field.

Available container icons: ${iconDescriptions}
Available card images: ${imageDescriptions}
Available function icons: ${FUNCTION_ICONS.join('\n')}`;

        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            description: { type: Type.STRING },
                            icon: { type: Type.STRING },
                            cardImageUrl: { type: Type.STRING },
                            theme: {
                                type: Type.OBJECT,
                                properties: { userBg: { type: Type.STRING }, userText: { type: Type.STRING }, botBg: { type: Type.STRING }, botText: { type: Type.STRING }, bgGradientStart: { type: Type.STRING }, bgGradientEnd: { type: Type.STRING }, sidebarBg: { type: Type.STRING }, sidebarText: { type: Type.STRING }, sidebarHighlightBg: { type: Type.STRING } },
                                required: ['userBg', 'userText', 'botBg', 'botText', 'bgGradientStart', 'bgGradientEnd', 'sidebarBg', 'sidebarText', 'sidebarHighlightBg']
                            },
                            quickQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
                            availablePersonas: { type: Type.ARRAY, items: { type: Type.STRING } },
                            functions: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        name: { type: Type.STRING }, description: { type: Type.STRING }, icon: { type: Type.STRING },
                                        parameters: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, type: { type: Type.STRING, enum: ['string', 'number', 'textarea'] }, description: { type: Type.STRING } }, required: ['name', 'type', 'description'] } },
                                        promptTemplate: { type: Type.STRING }
                                    },
                                    required: ['name', 'description', 'icon', 'parameters', 'promptTemplate']
                                }
                            },
                            initialKnowledgeFile: { type: Type.OBJECT, nullable: true, properties: { name: { type: Type.STRING }, content: { type: Type.STRING } } }
                        },
                        required: ['description', 'icon', 'cardImageUrl', 'theme', 'quickQuestions', 'availablePersonas', 'functions']
                    }
                }
            });

            const result = JSON.parse(response.text);
            const knowledgeBase: KnowledgeFile[] = [];
            if (result.initialKnowledgeFile?.content) {
                const content = result.initialKnowledgeFile.content;
                const blob = new Blob([content], { type: 'text/plain' });
                knowledgeBase.push({
                    name: result.initialKnowledgeFile.name || 'Website Summary.txt',
                    type: 'text/plain',
                    base64Content: `data:text/plain;base64,${btoa(content)}`,
                    size: blob.size,
                    uploadDate: new Date().toISOString()
                });
            }

            state.draftNewContainer = { ...result, name: containerName, knowledgeBase };
            renderAddContainerSuggestions();
            DOM.textElements.aiStatusText.textContent = '✓ Suggestions generated! Review and create.';
            DOM.containers.aiSuggestions.classList.remove('hidden');

        } catch (error) {
            console.error("Error generating container details:", error);
            DOM.textElements.aiStatusText.textContent = 'Could not generate suggestions. Please fill in manually.';
        } finally {
            clearInterval(statusInterval);
            DOM.textElements.aiStatusSpinner.classList.add('hidden');
            DOM.buttons.generateAi.disabled = false;
            DOM.loaders.aiGenerate.classList.add('hidden');
            DOM.buttons.generateAi.classList.remove('loading');
        }
    };

    const generateChatName = async (history: ChatHistory): Promise<string> => {
        if (history.length < 2) return "New Conversation";
        const firstUserPart = history[0].parts.find(p => 'text' in p);
        const firstModelPart = history[1].parts.find(p => 'text' in p);
        if (!firstUserPart || !('text' in firstUserPart) || !firstModelPart || !('text' in firstModelPart)) return "New Conversation";

        const prompt = `Based on the following conversation, create a very short, concise title (max 5 words, and no quotes).\n\nConversation:\nUser: "${firstUserPart.text}"\nModel: "${firstModelPart.text}"`;
        try {
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            return response.text.trim().replace(/["']/g, ""); // Remove quotes from response
        } catch (error) {
            console.error("Error generating chat name:", error);
            return "New Conversation";
        }
    };
    
    // --- [MODULE] src/handlers.ts ---

    const handleLogin = () => {
        // In a real app, this would involve OAuth flow. Here we simulate it.
        showPage('hub');
    };

    const handleLogout = () => {
        // Clear session, etc.
        showPage('login');
    };
    
    const handleNewChat = () => {
        if (!state.currentContainerId) return;
        const container = state.containers.find(c => c.id === state.currentContainerId);
        if (!container) return;
        container.activeChatId = null;
        renderChatHistory(container.id);
        renderSidebar(container.id);
    };

    const handleHistoryClick = (containerId: string, chatId: string) => {
        const container = state.containers.find(c => c.id === containerId);
        if (!container) return;
        container.activeChatId = chatId;
        renderChatHistory(containerId);
        renderSidebar(containerId);
    };

    const handleDeleteChatClick = (containerId: string, chatId: string) => {
        state.itemToDelete = { type: 'chat', containerId, chatId, fileName: null };
        const container = state.containers.find(c => c.id === containerId);
        const chat = container?.chats.find(c => c.id === chatId);
        if (DOM.textElements.deleteItemName) {
            DOM.textElements.deleteItemName.textContent = chat?.name || 'this conversation';
        }
        if (DOM.textElements.deleteConfirmDescription) {
            DOM.textElements.deleteConfirmDescription.textContent = 'Are you sure you want to delete this conversation? This action cannot be undone.';
        }
        DOM.modals.deleteConfirm?.classList.remove('hidden');
    };

    const handleDeleteFileClick = (fileName: string) => {
        if (!state.currentContainerId) return;
        state.itemToDelete = { type: 'knowledgeFile', containerId: state.currentContainerId, chatId: null, fileName };
        if (DOM.textElements.deleteItemName) {
            DOM.textElements.deleteItemName.textContent = fileName;
        }
        if (DOM.textElements.deleteConfirmDescription) {
            DOM.textElements.deleteConfirmDescription.textContent = 'Are you sure you want to delete this file? It will be removed from the knowledge base.';
        }
        DOM.modals.deleteConfirm?.classList.remove('hidden');
    };

    const handleSendMessage = async () => {
        if (!state.currentContainerId) return;
        const container = state.containers.find(c => c.id === state.currentContainerId);
        if (!container) return;

        const userInput = DOM.inputs.chat.value.trim();
        if (!userInput && !state.attachedFile) return;

        const userParts: Part[] = [];
        if (userInput) userParts.push({ text: userInput });
        if (state.attachedFile) {
            userParts.push({
                inlineData: {
                    mimeType: state.attachedFile.type,
                    data: state.attachedFile.base64.split(',')[1]
                }
            });
        }
        
        addMessageToUI(userParts, 'user');
        DOM.inputs.chat.value = '';
        DOM.inputs.chat.style.height = 'auto';
        DOM.buttons.sendChat.disabled = true;
        if (state.attachedFile) {
            state.attachedFile = null;
            DOM.containers.attachmentPreview?.classList.add('hidden');
        }

        let activeChat = container.chats.find(c => c.id === container.activeChatId);

        if (!activeChat) {
            const newChatId = `chat-${Date.now()}`;
            activeChat = { id: newChatId, name: 'New Conversation', history: [] };
            container.chats.unshift(activeChat);
            container.activeChatId = newChatId;
        }

        activeChat.history.push({ role: 'user', parts: userParts });

        const thinkingIndicator = addMessageToUI([], 'bot', true);
        DOM.forms.chat?.classList.add('thinking');
        DOM.buttons.sendChat.classList.add('loading');
        DOM.loaders.sendChat?.classList.remove('hidden');
        
        try {
            const stream = await ai.models.generateContentStream({
                model: container.selectedModel,
                contents: {
                    parts: [
                        ...container.knowledgeBase.map(file => ({
                            inlineData: {
                                mimeType: file.type,
                                data: file.base64Content.split(',')[1]
                            }
                        })),
                        ...userParts
                    ]
                },
                config: {
                    systemInstruction: `You are an AI assistant. Your current persona is: ${container.selectedPersona}.`
                }
            });
            
            let fullResponse = "";
            let responseText = "";

            thinkingIndicator?.remove();
            const botMessageDiv = addMessageToUI([{ text: '' }], 'bot');

            for await (const chunk of stream) {
                responseText = chunk.text;
                fullResponse += responseText;
                if(botMessageDiv) botMessageDiv.innerHTML = markdownToHtml(fullResponse);
                DOM.containers.chatMessages!.scrollTop = DOM.containers.chatMessages!.scrollHeight;
            }

            activeChat.history.push({ role: 'model', parts: [{ text: fullResponse }] });

            if (activeChat.history.length === 2) {
                activeChat.name = await generateChatName(activeChat.history);
            }
            
            renderSidebar(container.id);
            saveState();

        } catch (error) {
            console.error("Error sending message:", error);
            thinkingIndicator?.remove();
            addMessageToUI([{ text: 'Sorry, I encountered an error. Please try again.' }], 'bot');
        } finally {
            DOM.forms.chat?.classList.remove('thinking');
            DOM.buttons.sendChat.classList.remove('loading');
            DOM.loaders.sendChat?.classList.add('hidden');
        }
    };

    const handleFileSelect = async (files: FileList) => {
        if (files.length === 0) return;
        const file = files[0];

        if (!file.type) {
            showToast(`Error: Cannot determine file type for "${file.name}". Please select a different file.`);
            if (DOM.inputs.fileUpload) DOM.inputs.fileUpload.value = ''; // Reset input
            return;
        }

        const base64 = await fileToBase64(file);
        state.attachedFile = { name: file.name, type: file.type, base64 };

        if (DOM.containers.attachmentPreview && DOM.textElements.attachmentFilename) {
            DOM.textElements.attachmentFilename.textContent = file.name;
            DOM.containers.attachmentPreview.classList.remove('hidden');
        }
        DOM.buttons.sendChat.disabled = false;
        closeAllPopups();
    };
    
    const handleTabClick = (tabs: HTMLElement, panels: NodeListOf<Element>, e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.matches('.tab-link')) return;

        tabs.querySelector('.active')?.classList.remove('active');
        target.classList.add('active');

        panels.forEach(panel => (panel as HTMLElement).classList.remove('active'));
        const panelId = `tab-panel-${target.dataset.tab}`;
        document.getElementById(panelId)?.classList.add('active');
    };

    const handleConfirmDelete = () => {
        if (!state.itemToDelete) return;
        const { type, containerId, chatId, fileName } = state.itemToDelete;

        if (type === 'container' && containerId) {
            const index = state.containers.findIndex(c => c.id === containerId);
            if (index > -1) {
                state.containers.splice(index, 1);
                showPage('containerManagement');
                renderAllContainers();
            }
        } else if (type === 'chat' && containerId && chatId) {
            const container = state.containers.find(c => c.id === containerId);
            if (container) {
                const chatIndex = container.chats.findIndex(c => c.id === chatId);
                if (chatIndex > -1) {
                    container.chats.splice(chatIndex, 1);
                    if (container.activeChatId === chatId) {
                        handleNewChat();
                    }
                    renderSidebar(containerId);
                }
            }
        } else if (type === 'knowledgeFile' && containerId && fileName) {
            const container = state.containers.find(c => c.id === containerId);
            if (container) {
                 const fileIndex = container.knowledgeBase.findIndex(f => f.name === fileName);
                 if (fileIndex > -1) {
                     container.knowledgeBase.splice(fileIndex, 1);
                     renderKnowledgeFiles();
                 }
            }
        }

        saveState();
        DOM.modals.deleteConfirm?.classList.add('hidden');
        state.itemToDelete = null;
    };
    
    // --- [MODULE] src/index.tsx (Entry Point) ---
    const bindEventListeners = () => {
        // Global Click Listener for Popups
        document.body.addEventListener('click', () => closeAllPopups());

        // Navigation
        DOM.buttons.googleLogin?.addEventListener('click', handleLogin);
        DOM.buttons.microsoftLogin?.addEventListener('click', handleLogin);
        DOM.buttons.settings?.addEventListener('click', () => showPage('settingsHub'));
        DOM.containers.containerManagementCard?.addEventListener('click', () => showPage('containerManagement'));
        DOM.containers.globalSettingsCard?.addEventListener('click', () => {
            state.draftBranding = JSON.parse(JSON.stringify(state.branding));
            state.draftAvailableModels = JSON.parse(JSON.stringify(state.availableModels));
            renderBrandingSettings(state.draftBranding);
            renderModelManagementList();
            checkForGlobalSettingChanges(true);
            showPage('globalSettings');
        });
        
        DOM.buttons.backToHub.forEach(btn => btn.addEventListener('click', () => showPage('hub')));
        DOM.buttons.backToSettingsHub1?.addEventListener('click', () => showPage('settingsHub'));
        DOM.buttons.backToSettingsHub2?.addEventListener('click', () => showPage('settingsHub'));
        DOM.buttons.backToContainerManagement?.addEventListener('click', () => showPage('containerManagement'));
        DOM.buttons.backToAssistant?.addEventListener('click', () => showPage('department', state.currentContainerId ? state.containers.find(c=>c.id === state.currentContainerId)!.name : 'Assistant'));

        DOM.containers.sidebarAssistantLink?.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('department', state.currentContainerId ? state.containers.find(c=>c.id === state.currentContainerId)!.name : 'Assistant');
        });

        DOM.containers.sidebarKnowledgeLink?.addEventListener('click', (e) => {
            e.preventDefault();
            const container = state.containers.find(c => c.id === state.currentContainerId);
            if (!container) return;
            if (DOM.textElements.knowledgeTitle) DOM.textElements.knowledgeTitle.textContent = `Knowledge for ${container.name}`;
            renderKnowledgeFiles();
            showPage('knowledge', `${container.name} Knowledge`);
        });

        // Hub Page
        DOM.containers.containerGrid?.addEventListener('click', e => {
            const card = (e.target as HTMLElement).closest('[data-container-id]');
            if (card) {
                const containerId = (card as HTMLElement).dataset.containerId;
                if (!containerId) return;
                state.currentContainerId = containerId;
                const container = state.containers.find(c => c.id === containerId);
                if (!container) return;
                
                if (DOM.textElements.containerPageTitle) DOM.textElements.containerPageTitle.textContent = container.name;
                if (DOM.textElements.sidebarContainerTitle) DOM.textElements.sidebarContainerTitle.textContent = container.name;
                
                // Set theme
                const root = document.documentElement;
                root.style.setProperty('--user-message-bg', container.theme.userBg);
                root.style.setProperty('--user-message-text', container.theme.userText);
                root.style.setProperty('--bot-message-bg', container.theme.botBg);
                root.style.setProperty('--bot-message-text', container.theme.botText);
                root.style.setProperty('--bg-gradient-start', container.theme.bgGradientStart);
                root.style.setProperty('--bg-gradient-end', container.theme.bgGradientEnd);
                root.style.setProperty('--sidebar-bg', container.theme.sidebarBg);
                root.style.setProperty('--sidebar-text', container.theme.sidebarText);
                root.style.setProperty('--sidebar-highlight-bg', container.theme.sidebarHighlightBg);

                handleNewChat(); // Start with a fresh chat
                renderSidebar(containerId);
                renderChatHistory(containerId);

                const modelIcons = state.availableModels.reduce((acc, model) => {
                    acc[model.id] = model.icon;
                    return acc;
                }, {} as {[key: string]: string});

                renderCustomSelect(DOM.containers.modelSelect, container.availableModels, container.selectedModel, (value) => container.selectedModel = value, modelIcons);
                renderCustomSelect(DOM.containers.personaSelect, container.availablePersonas, container.selectedPersona, (value) => container.selectedPersona = value);

                showPage('department', container.name);
            }
        });

        // Settings
        DOM.containers.containerManagementGrid?.addEventListener('click', e => {
            const card = (e.target as HTMLElement).closest('[data-container-id]');
            if (card) {
                const containerId = (card as HTMLElement).dataset.containerId;
                if(containerId) {
                    renderContainerSettings(containerId);
                    showPage('settingsDetail', `Edit Container`);
                }
            }
        });
        
        DOM.containers.settingsTabs?.addEventListener('click', (e) => handleTabClick(DOM.containers.settingsTabs!, DOM.containers.settingsPanels, e));
        DOM.containers.globalSettingsTabs?.addEventListener('click', (e) => handleTabClick(DOM.containers.globalSettingsTabs!, DOM.containers.globalSettingsPanels, e));
        
        // Chat
        DOM.buttons.newChat?.addEventListener('click', handleNewChat);
        DOM.forms.chat?.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSendMessage();
        });
        DOM.inputs.chat?.addEventListener('input', () => {
            if (!DOM.inputs.chat) return;
            DOM.buttons.sendChat.disabled = DOM.inputs.chat.value.trim().length === 0 && !state.attachedFile;
            DOM.inputs.chat.style.height = 'auto';
            DOM.inputs.chat.style.height = `${DOM.inputs.chat.scrollHeight}px`;
        });
        DOM.inputs.chat?.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (!DOM.buttons.sendChat.disabled) {
                    handleSendMessage();
                }
            }
        });
        DOM.containers.chatMessages?.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            const quickQuestionBtn = target.closest('.quick-question');
            if(quickQuestionBtn) {
                DOM.inputs.chat.value = quickQuestionBtn.textContent || '';
                handleSendMessage();
            }
        });
        DOM.containers.sidebarHistoryList?.addEventListener('click', e => {
            const link = (e.target as HTMLElement).closest('.sidebar-link[data-chat-id]');
            if (link && state.currentContainerId) {
                handleHistoryClick(state.currentContainerId, (link as HTMLElement).dataset.chatId!);
            }
        });
        
        // Attachments
        DOM.buttons.attachment?.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllPopups(DOM.containers.attachmentOptions);
            DOM.containers.attachmentOptions?.classList.toggle('hidden');
        });
        DOM.buttons.uploadComputer?.addEventListener('click', () => DOM.inputs.fileUpload?.click());
        DOM.inputs.fileUpload?.addEventListener('change', () => handleFileSelect(DOM.inputs.fileUpload.files!));
        DOM.buttons.removeAttachment?.addEventListener('click', () => {
            state.attachedFile = null;
            DOM.containers.attachmentPreview?.classList.add('hidden');
            if (DOM.inputs.fileUpload) DOM.inputs.fileUpload.value = '';
            DOM.buttons.sendChat.disabled = DOM.inputs.chat.value.trim().length === 0;
        });

        // User Profile Dropdown
        document.querySelectorAll('.user-profile-trigger').forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const dropdown = trigger.nextElementSibling;
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                closeAllPopups(trigger.parentElement!);
                if (!isExpanded) {
                    dropdown?.classList.remove('hidden');
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });
         document.querySelectorAll('.dropdown-link[data-action="logout"]').forEach(btn => btn.addEventListener('click', handleLogout));


        // Modals
        const closeModal = (modal: HTMLElement | null) => modal?.classList.add('hidden');
        DOM.buttons.addContainer?.addEventListener('click', () => {
            DOM.forms.addContainer?.reset();
            if (DOM.containers.containerIconSelector) DOM.containers.containerIconSelector.innerHTML = '';
            DOM.containers.aiSuggestions?.classList.add('hidden');
            if (DOM.buttons.generateAi) DOM.buttons.generateAi.disabled = true;
            if (DOM.buttons.createContainer) DOM.buttons.createContainer.disabled = true;
            renderIconSelector(DOM.containers.containerIconSelector, () => {}, '');
            if (DOM.textElements.aiStatusText) {
                DOM.textElements.aiStatusText.textContent = 'Enter a name to enable AI suggestions.';
            }
            DOM.modals.addContainer?.classList.remove('hidden');
        });
        DOM.buttons.closeModal?.addEventListener('click', () => closeModal(DOM.modals.addContainer));
        DOM.buttons.cancelContainer?.addEventListener('click', () => closeModal(DOM.modals.addContainer));
        DOM.buttons.closeFunctionRunner?.addEventListener('click', () => closeModal(DOM.modals.functionRunner));
        DOM.buttons.cancelFunctionRunner?.addEventListener('click', () => closeModal(DOM.modals.functionRunner));
        DOM.buttons.closeDeleteModal?.addEventListener('click', () => closeModal(DOM.modals.deleteConfirm));
        DOM.buttons.cancelDelete?.addEventListener('click', () => closeModal(DOM.modals.deleteConfirm));

        // Delete Confirmation
        DOM.buttons.confirmDelete?.addEventListener('click', handleConfirmDelete);
        DOM.buttons.deleteContainer?.addEventListener('click', () => {
             if (!state.currentSettingsContainerId) return;
             state.itemToDelete = { type: 'container', containerId: state.currentSettingsContainerId, chatId: null, fileName: null };
             const container = state.containers.find(c => c.id === state.currentSettingsContainerId);
             if (DOM.textElements.deleteItemName) DOM.textElements.deleteItemName.textContent = container?.name || 'this container';
             if (DOM.textElements.deleteConfirmDescription) DOM.textElements.deleteConfirmDescription.textContent = 'Are you sure? All associated chats and knowledge will be permanently deleted.';
             DOM.modals.deleteConfirm?.classList.remove('hidden');
        });

        // Add Container Modal Logic
        DOM.inputs.containerName?.addEventListener('input', () => {
            const hasName = DOM.inputs.containerName.value.trim().length > 0;
            if (DOM.buttons.generateAi) DOM.buttons.generateAi.disabled = !hasName;
            if (DOM.buttons.createContainer) DOM.buttons.createContainer.disabled = !hasName;
            if (DOM.textElements.aiStatusText) {
                if(!hasName) DOM.textElements.aiStatusText.textContent = 'Enter a name to enable AI suggestions.';
                else DOM.textElements.aiStatusText.textContent = 'Generate suggestions or fill in details manually.';
            }
        });
        DOM.inputs.containerType?.addEventListener('change', () => {
            DOM.containers.containerWebsiteGroup?.classList.toggle('hidden', DOM.inputs.containerType.value !== 'product');
        });
        DOM.buttons.generateAi?.addEventListener('click', () => {
            generateContainerDetails(DOM.inputs.containerName.value, DOM.inputs.containerType.value, DOM.inputs.containerWebsite.value);
        });
        DOM.forms.addContainer?.addEventListener('submit', (e) => {
            e.preventDefault();
            const newId = `cont-${Date.now()}`;
            const baseContainer: Omit<Container, 'id'> = {
                name: DOM.inputs.containerName.value,
                description: DOM.inputs.containerDesc.value,
                icon: DOM.containers.containerIconSelector?.querySelector('.selected')?.getAttribute('data-icon') || AVAILABLE_ICONS[0],
                cardImageUrl: CARD_IMAGE_OPTIONS[0].url,
                quickQuestions: [],
                availablePersonas: [],
                functions: [],
                knowledgeBase: [],
                theme: { ...DEFAULT_THEME },
                chats: [],
                activeChatId: null,
                availableModels: [state.availableModels[0].id],
                selectedModel: state.availableModels[0].id,
                selectedPersona: 'Helpful Assistant',
                accessControl: [],
                enabledIntegrations: [],
                isKnowledgeBasePublic: false,
            };

            const finalContainer: Container = {
                ...baseContainer,
                id: newId,
                name: DOM.inputs.containerName.value,
                description: DOM.inputs.containerDesc.value,
                icon: DOM.previews.addCustomIcon.src.startsWith('data:image') 
                    ? DOM.previews.addCustomIcon.src 
                    : DOM.containers.containerIconSelector?.querySelector<HTMLElement>('.selected')?.dataset.icon || AVAILABLE_ICONS[0],
                cardImageUrl: state.draftNewContainer?.cardImageUrl || CARD_IMAGE_OPTIONS[0].url,
                quickQuestions: state.draftNewContainer?.quickQuestions || ['What is this?', 'How do I start?'],
                availablePersonas: state.draftNewContainer?.availablePersonas || ['Helpful Assistant', 'Creative Collaborator'],
                functions: state.draftNewContainer?.functions.map(f => ({ ...f, id: `func-${Date.now()}-${Math.random()}`, enabled: true })) || [],
                theme: state.draftNewContainer?.theme || { ...DEFAULT_THEME },
                knowledgeBase: state.draftNewContainer?.knowledgeBase || [],
            };

            state.containers.unshift(finalContainer);
            saveState();
            renderAllContainers();
            closeModal(DOM.modals.addContainer);
        });
        
        // Sidebar Toggle
        DOM.buttons.sidebarToggle?.addEventListener('click', () => {
            DOM.pageViews.department?.classList.toggle('sidebar-open');
        });
        
        // Container Settings Handlers
        DOM.forms.addQuickQuestion?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!state.draftSettingsContainer) return;
            const list = state.draftSettingsContainer.quickQuestions;
            const input = DOM.inputs.newQuickQuestion;
            const value = input.value.trim();
            if (value && !list.includes(value)) {
                list.push(value);
                input.value = '';
                renderQuickQuestionsList();
                checkForSettingChanges();
            }
        });
        DOM.forms.addPersona?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!state.draftSettingsContainer) return;
            const list = state.draftSettingsContainer.availablePersonas;
            const input = DOM.inputs.newPersona;
            const value = input.value.trim();
            if (value && !list.includes(value)) {
                list.push(value);
                input.value = '';
                renderPersonasList();
                checkForSettingChanges();
            }
        });
        DOM.forms.addAccessor?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!state.draftSettingsContainer) return;
            const list = state.draftSettingsContainer.accessControl;
            const input = DOM.inputs.newAccessor;
            const value = input.value.trim();
            if (value && !list.includes(value)) {
                list.push(value);
                input.value = '';
                renderAccessControlList();
                checkForSettingChanges();
            }
        });
        DOM.buttons.saveSettings?.addEventListener('click', () => {
            if (!state.currentSettingsContainerId || !state.draftSettingsContainer) return;
            const index = state.containers.findIndex(c => c.id === state.currentSettingsContainerId);
            if (index > -1) {
                state.containers[index] = state.draftSettingsContainer;
                saveState();
                renderAllContainers();
                showToast('Settings saved successfully!');
                showPage('containerManagement');
            }
        });
        DOM.buttons.cancelSettings?.addEventListener('click', () => showPage('containerManagement'));

        // Global Settings Handlers
        DOM.forms.addModel?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!state.draftAvailableModels) return;
            const newModel: AIModel = { id: DOM.inputs.newModelId.value, api: DOM.inputs.newModelApi.value, icon: DOM.inputs.newModelIcon.value };
            state.draftAvailableModels.push(newModel);
            renderModelManagementList();
            DOM.forms.addModel.reset();
        });
        DOM.buttons.saveGlobalSettings?.addEventListener('click', () => {
            if (!state.draftBranding || !state.draftAvailableModels) return;
            state.branding = state.draftBranding;
            state.availableModels = state.draftAvailableModels;
            saveState();
            renderBranding();
            renderBrandingSettings(state.branding);
            showToast('Global settings saved!');
            checkForGlobalSettingChanges(true);
        });
        DOM.buttons.cancelGlobalSettings?.addEventListener('click', () => {
             state.draftBranding = JSON.parse(JSON.stringify(state.branding));
             state.draftAvailableModels = JSON.parse(JSON.stringify(state.availableModels));
             renderBrandingSettings(state.draftBranding);
             renderModelManagementList();
             checkForGlobalSettingChanges(true);
        });
        
        // Custom Image Uploads
        const setupImageUpload = (btn: HTMLElement | null, input: HTMLInputElement | null, preview: HTMLImageElement | null, onUpload: (base64: string) => void) => {
            if (!btn || !input || !preview) return;
            btn.addEventListener('click', () => input.click());
            input.addEventListener('change', async () => {
                if(input.files && input.files[0]) {
                    const base64 = await fileToBase64(input.files[0]);
                    preview.src = base64;
                    preview.classList.remove('hidden');
                    onUpload(base64);
                }
            });
        };
        setupImageUpload(DOM.buttons.addCustomIcon, DOM.inputs.addCustomIconUpload, DOM.previews.addCustomIcon, () => {});
        setupImageUpload(DOM.buttons.editCustomIcon, DOM.inputs.editCustomIconUpload, DOM.previews.editCustomIcon, (base64) => { if(state.draftSettingsContainer) { state.draftSettingsContainer.icon = base64; checkForSettingChanges(); } });
        setupImageUpload(DOM.buttons.editCardImage, DOM.inputs.editCardImageUpload, DOM.previews.editCardImage, (base64) => { if(state.draftSettingsContainer) { state.draftSettingsContainer.cardImageUrl = base64; checkForSettingChanges(); } });
        setupImageUpload(DOM.buttons.editGlobalLogo, DOM.inputs.editGlobalLogoUpload, DOM.previews.brandingLogo?.querySelector('img') || new Image(), (base64) => { if(state.draftBranding) { state.draftBranding.appLogo = base64; updateBrandingPreview(state.draftBranding); checkForGlobalSettingChanges(); } });


        // Knowledge Base
        DOM.buttons.manageKnowledge?.addEventListener('click', () => {
            if (!state.currentSettingsContainerId) return;
            // Set the currentContainerId so the knowledge page knows which container to show
            state.currentContainerId = state.currentSettingsContainerId;
            const container = state.containers.find(c => c.id === state.currentContainerId);
            if (!container) return;

            if (DOM.textElements.knowledgeTitle) DOM.textElements.knowledgeTitle.textContent = `Knowledge for ${container.name}`;
            renderKnowledgeFiles();
            showPage('knowledge', `${container.name} Knowledge`);
        });
        DOM.buttons.knowledgeUpload?.addEventListener('click', () => DOM.inputs.knowledgeFile?.click());
        DOM.inputs.knowledgeFile?.addEventListener('change', async () => {
            if (!DOM.inputs.knowledgeFile.files || !state.currentContainerId) return;
            const container = state.containers.find(c => c.id === state.currentContainerId);
            if (!container) return;
            
            for (const file of Array.from(DOM.inputs.knowledgeFile.files)) {
                if (!file.type) {
                    showToast(`Unsupported file type for "${file.name}". Skipped.`);
                    continue;
                }
                const base64Content = await fileToBase64(file);
                container.knowledgeBase.push({ name: file.name, type: file.type, size: file.size, base64Content, uploadDate: new Date().toISOString() });
            }
            saveState();
            renderKnowledgeFiles();
            DOM.inputs.knowledgeFile.value = '';
        });
        const dropzone = DOM.containers.fileDropzone;
        dropzone?.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
        dropzone?.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
        dropzone?.addEventListener('drop', async (e) => {
            e.preventDefault();
            dropzone.classList.remove('dragover');
            if (e.dataTransfer?.files && state.currentContainerId) {
                 const container = state.containers.find(c => c.id === state.currentContainerId);
                if (!container) return;
                for (const file of Array.from(e.dataTransfer.files)) {
                    if (!file.type) {
                        showToast(`Unsupported file type for "${file.name}". Skipped.`);
                        continue;
                    }
                    const base64Content = await fileToBase64(file);
                    container.knowledgeBase.push({ name: file.name, type: file.type, size: file.size, base64Content, uploadDate: new Date().toISOString() });
                }
                saveState();
                renderKnowledgeFiles();
            }
        });

        // Cookies
        DOM.buttons.acceptCookies?.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            DOM.containers.cookieBanner?.classList.add('hidden');
        });
    };

    const initializeApp = () => {
        loadState();
        renderBranding();
        renderAllContainers();
        bindEventListeners();
        showPage('login');
    };

    initializeApp();
});