import { STORAGE_KEYS } from "./constants";

// ============================================
// Generic Storage Helpers
// ============================================

export const setStorage = (key, value) => {
  try {
    const data =
      typeof value === "string"
        ? value
        : JSON.stringify(value);

    localStorage.setItem(key, data);

    return true;
  } catch (error) {
    console.error("Storage Error:", error);
    return false;
  }
};

export const getStorage = (key, defaultValue = null) => {
  try {
    const value = localStorage.getItem(key);

    if (value === null) return defaultValue;

    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  } catch (error) {
    console.error("Storage Error:", error);
    return defaultValue;
  }
};

export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const clearStorage = () => {
  try {
    localStorage.clear();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// ============================================
// Token Helpers
// ============================================

export const setAccessToken = (token) =>
  setStorage(STORAGE_KEYS.ACCESS_TOKEN, token);

export const getAccessToken = () =>
  getStorage(STORAGE_KEYS.ACCESS_TOKEN);

export const removeAccessToken = () =>
  removeStorage(STORAGE_KEYS.ACCESS_TOKEN);

export const setRefreshToken = (token) =>
  setStorage(STORAGE_KEYS.REFRESH_TOKEN, token);

export const getRefreshToken = () =>
  getStorage(STORAGE_KEYS.REFRESH_TOKEN);

export const removeRefreshToken = () =>
  removeStorage(STORAGE_KEYS.REFRESH_TOKEN);

// ============================================
// User Helpers
// ============================================

export const setUser = (user) =>
  setStorage(STORAGE_KEYS.USER, user);

export const getUser = () =>
  getStorage(STORAGE_KEYS.USER);

export const removeUser = () =>
  removeStorage(STORAGE_KEYS.USER);

// ============================================
// Theme Helpers
// ============================================

export const setTheme = (theme) =>
  setStorage(STORAGE_KEYS.THEME, theme);

export const getTheme = () =>
  getStorage(STORAGE_KEYS.THEME, "dark");

// ============================================
// Language Helpers
// ============================================

export const setLanguage = (language) =>
  setStorage(STORAGE_KEYS.LANGUAGE, language);

export const getLanguage = () =>
  getStorage(STORAGE_KEYS.LANGUAGE, "en");

// ============================================
// Settings Helpers
// ============================================

export const setSettings = (settings) =>
  setStorage(STORAGE_KEYS.SETTINGS, settings);

export const getSettings = () =>
  getStorage(STORAGE_KEYS.SETTINGS, {});

export const removeSettings = () =>
  removeStorage(STORAGE_KEYS.SETTINGS);

// ============================================
// Authentication Helpers
// ============================================

export const saveAuthData = ({
  access,
  refresh,
  user,
}) => {
  if (access) {
    setAccessToken(access);
  }

  if (refresh) {
    setRefreshToken(refresh);
  }

  if (user) {
    setUser(user);
  }
};

export const clearAuthData = () => {
  removeAccessToken();
  removeRefreshToken();
  removeUser();
};

// Backward Compatibility

export const clearAuth = clearAuthData;

export const isLoggedIn = () =>
  !!getAccessToken();

// ============================================
// Export
// ============================================

const storage = {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,

  setAccessToken,
  getAccessToken,
  removeAccessToken,

  setRefreshToken,
  getRefreshToken,
  removeRefreshToken,

  setUser,
  getUser,
  removeUser,

  setTheme,
  getTheme,

  setLanguage,
  getLanguage,

  setSettings,
  getSettings,
  removeSettings,

  saveAuthData,
  clearAuthData,
  clearAuth,

  isLoggedIn,
};

export default storage;