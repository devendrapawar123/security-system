import axios from "axios";

import {
  API_BASE_URL,
  AUTH_ENDPOINTS,
  REQUEST_TIMEOUT,
} from "@/utils/constants";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAuthData,
} from "@/utils/storage";

// ===========================================
// Axios Instance
// ===========================================

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// ===========================================
// Refresh State
// ===========================================

let isRefreshing = false;
let failedQueue = [];

// ===========================================
// Process Queue
// ===========================================

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// ===========================================
// Logout
// ===========================================

const logout = () => {
  clearAuthData();

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
};

// ===========================================
// Request Interceptor
// ===========================================

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===========================================
// Response Interceptor
// ===========================================

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Network Error

    if (!error.response) {
      return Promise.reject({
        message: "Network Error",
      });
    }

    // Unauthorized

    if (
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = getRefreshToken();

      if (!refresh) {
        logout();
        return Promise.reject(error);
      }

      // Already Refreshing

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
          });
        })
          .then((token) => {
            originalRequest.headers.Authorization =
              `Bearer ${token}`;

            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await axios.post(
          `${API_BASE_URL}${AUTH_ENDPOINTS.REFRESH}`,
          {
            refresh,
          },
          {
            timeout: REQUEST_TIMEOUT,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const newAccess = response.data.access;
        const newRefresh =
          response.data.refresh || refresh;

        setAccessToken(newAccess);
        setRefreshToken(newRefresh);

        api.defaults.headers.common.Authorization =
          `Bearer ${newAccess}`;

        processQueue(null, newAccess);

        originalRequest.headers.Authorization =
          `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        logout();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // ===========================================
    // Format Error
    // ===========================================

    const response = error.response;

    return Promise.reject({
      status: response.status,
      message:
        response.data?.message ||
        response.data?.detail ||
        "Something went wrong.",
      errors: response.data?.errors || null,
      data: response.data || null,
    });
  }
);

export default api;