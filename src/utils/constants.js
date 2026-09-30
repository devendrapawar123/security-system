// ============================================
// App
// ============================================

export const APP_NAME = "Smart Security System";

export const APP_VERSION = "1.0.0";

export const DEFAULT_LANGUAGE = "en";

export const DEFAULT_THEME = "dark";

// ============================================
// API
// ============================================

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api";

export const WS_BASE_URL =
  import.meta.env.VITE_WS_BASE_URL ||
  "ws://127.0.0.1:8000/ws";

export const REQUEST_TIMEOUT = 15000;

// ============================================
// Authentication
// ============================================

export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login/",
  REGISTER: "/auth/register/",
  LOGOUT: "/auth/logout/",
  PROFILE: "/auth/profile/",
  CHANGE_PASSWORD: "/auth/change-password/",
  REFRESH: "/auth/token/refresh/",
};

// ============================================
// Dashboard
// ============================================

export const DASHBOARD_ENDPOINTS = {
  SUMMARY: "/dashboard/summary/",
  ANALYTICS: "/dashboard/analytics/",
  SECURITY_STATUS: "/dashboard/security-status/",
};

// ============================================
// Activity
// ============================================

export const ACTIVITY_ENDPOINTS = {
  LIST: "/activity/",
  EXPORT: "/activity/export/",
};

// ============================================
// Sessions
// ============================================

export const SESSION_ENDPOINTS = {
  LIST: "/activity/sessions/",
  TERMINATE: "/activity/sessions/",
};

// ============================================
// Intruders
// ============================================

export const INTRUDER_ENDPOINTS = {
  LIST: "/intruders/",
  DETAILS: "/intruders/",
};

// ============================================
// Notifications
// ============================================

export const NOTIFICATION_ENDPOINTS = {
  LIST: "/notifications/",
  MARK_READ: "/notifications/read/",
  MARK_ALL_READ: "/notifications/read-all/",
  DELETE: "/notifications/",
};

// ============================================
// Reports
// ============================================

export const REPORT_ENDPOINTS = {
  LIST: "/reports/",
  GENERATE: "/reports/generate/",
  DOWNLOAD: "/reports/download/",
};

// ============================================
// Settings
// ============================================

export const SETTINGS_ENDPOINTS = {
  GET: "/settings/",
  UPDATE: "/settings/",
};

// ============================================
// WebSocket
// ============================================

export const WEBSOCKET_ENDPOINTS = {
  NOTIFICATIONS: "/notifications/",
  SECURITY: "/security/",
};

// ============================================
// Local Storage
// ============================================

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "access_token",
  REFRESH_TOKEN: "refresh_token",
  USER: "user",
  SETTINGS: "settings",
  THEME: "theme",
  LANGUAGE: "language",
};

// ============================================
// Roles
// ============================================

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
};

// ============================================
// Status
// ============================================

export const STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  ONLINE: "online",
  OFFLINE: "offline",
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

// ============================================
// Pagination
// ============================================

export const DEFAULT_PAGE_SIZE = 10;

export const PAGE_SIZE_OPTIONS = [
  10,
  25,
  50,
  100,
];

// ============================================
// Languages
// ============================================

export const LANGUAGES = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Hindi",
    value: "hi",
  },
];

// ============================================
// Themes
// ============================================

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

// ============================================
// Date Formats
// ============================================

export const DATE_FORMAT = "DD/MM/YYYY";

export const DATETIME_FORMAT =
  "DD/MM/YYYY HH:mm:ss";

// ============================================
// Default Export
// ============================================

export default {
  APP_NAME,
  APP_VERSION,

  DEFAULT_LANGUAGE,
  DEFAULT_THEME,

  API_BASE_URL,
  WS_BASE_URL,
  REQUEST_TIMEOUT,

  AUTH_ENDPOINTS,
  DASHBOARD_ENDPOINTS,
  ACTIVITY_ENDPOINTS,
  SESSION_ENDPOINTS,
  INTRUDER_ENDPOINTS,
  NOTIFICATION_ENDPOINTS,
  REPORT_ENDPOINTS,
  SETTINGS_ENDPOINTS,
  WEBSOCKET_ENDPOINTS,

  STORAGE_KEYS,
  USER_ROLES,
  STATUS,

  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,

  LANGUAGES,
  THEMES,

  DATE_FORMAT,
  DATETIME_FORMAT,
};