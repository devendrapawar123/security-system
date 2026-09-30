import api from "./axios";

import { AUTH_ENDPOINTS } from "@/utils/constants";

// ===========================================
// Register
// ===========================================

export const register = async (payload) => {
  const response = await api.post(
    AUTH_ENDPOINTS.REGISTER,
    payload
  );

  return response.data;
};

// ===========================================
// Login
// ===========================================

export const login = async (payload) => {
  const response = await api.post(
    AUTH_ENDPOINTS.LOGIN,
    payload
  );

  return response.data;
};

// ===========================================
// Logout
// ===========================================

export const logout = async (refreshToken) => {
  const response = await api.post(
    AUTH_ENDPOINTS.LOGOUT,
    {
      refresh: refreshToken,
    }
  );

  return response.data;
};

// ===========================================
// Get Logged-in User Profile
// ===========================================

export const getProfile = async () => {
  const response = await api.get(
    AUTH_ENDPOINTS.PROFILE
  );

  return response.data;
};

// ===========================================
// Update Profile
// ===========================================

export const updateProfile = async (payload) => {
  const response = await api.put(
    AUTH_ENDPOINTS.PROFILE,
    payload
  );

  return response.data;
};

// ===========================================
// Change Password
// ===========================================

export const changePassword = async (payload) => {
  const response = await api.post(
    AUTH_ENDPOINTS.CHANGE_PASSWORD,
    payload
  );

  return response.data;
};

// ===========================================
// Export
// ===========================================

const authApi = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  changePassword,
};

export default authApi;