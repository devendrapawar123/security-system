import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";

import authApi from "@/api/authApi";

import {
  saveAuthData,
  clearAuthData,
  getAccessToken,
  getRefreshToken,
  getUser,
  setUser,
} from "@/utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setCurrentUser] = useState(getUser());
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!getAccessToken()
  );

  const loadProfile = useCallback(async () => {
    try {
      const response = await authApi.getProfile();

      const profile =
        response.data || response.user || response;

      setCurrentUser(profile);
      setUser(profile);

      setIsAuthenticated(true);
    } catch (error) {
      clearAuthData();
      setCurrentUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (!access || !refresh) {
      setLoading(false);
      return;
    }

    loadProfile();
  }, [loadProfile]);

  const login = useCallback(async (credentials) => {
    const response = await authApi.login(credentials);

    const payload = response.data || response;

    saveAuthData({
      access: payload.access,
      refresh: payload.refresh,
      user: payload.user,
    });

    setCurrentUser(payload.user);
    setIsAuthenticated(true);

    return response;
  }, []);

  const register = useCallback(async (data) => {
    return await authApi.register(data);
  }, []);

  const logout = useCallback(async () => {
    try {
      const refresh = getRefreshToken();

      if (refresh) {
        await authApi.logout(refresh);
      }
    } catch (e) {
      console.error(e);
    } finally {
      clearAuthData();
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }, []);
  const refreshProfile = useCallback(async () => {
    try {
      const response = await authApi.getProfile();

      const profile =
        response.data || response.user || response;

      setCurrentUser(profile);
      setUser(profile);

      return profile;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const response = await authApi.updateProfile(payload);

    const profile =
      response.data || response.user || response;

    setCurrentUser(profile);
    setUser(profile);

    return response;
  }, []);

  const changePassword = useCallback(async (payload) => {
    return await authApi.changePassword(payload);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,

      login,
      register,
      logout,

      refreshProfile,
      updateProfile,
      changePassword,

      setUser: setCurrentUser,
    }),
    [
      user,
      loading,
      isAuthenticated,
      login,
      register,
      logout,
      refreshProfile,
      updateProfile,
      changePassword,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};

export default AuthContext;