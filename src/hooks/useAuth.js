/*import { useMemo } from "react";

import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

const useAuth = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  const {
    user,
    loading,
    login,
    logout,
    register,
    refreshProfile,
    updateProfile,
    isAuthenticated,
  } = auth;

  const isAdmin = useMemo(() => {
    return (
      user?.role === "admin" ||
      user?.is_staff ||
      user?.is_superuser
    );
  }, [user]);

  const isUser = useMemo(() => {
    return !!user && !isAdmin;
  }, [user, isAdmin]);

  const hasRole = (role) => {
    if (!user) return false;

    return (
      user.role === role ||
      user.roles?.includes(role)
    );
  };

  const hasPermission = (permission) => {
    if (!user) return false;

    return (
      user.permissions?.includes(permission)
    );
  };

  const signIn = async (credentials) => {
    const response = await login(credentials);
    return response;
  };

  const signUp = async (payload) => {
    const response = await register(payload);
    return response;
  };

  const signOut = async () => {
    await logout();
    navigate("/login", {
      replace: true,
    });
  };

  return {
    user,
    loading,

    isAuthenticated,
    isAdmin,
    isUser,

    login: signIn,
    register: signUp,
    logout: signOut,

    refreshProfile,
    updateProfile,

    hasRole,
    hasPermission,
  };
};

export default useAuth;*/

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth as useAuthContext } from "@/context/AuthContext";

const useAuth = () => {
  const navigate = useNavigate();
  const auth = useAuthContext();

  const {
    user,
    loading,
    login,
    logout,
    register,
    refreshProfile,
    updateProfile,
    isAuthenticated,
  } = auth;

  const isAdmin = useMemo(
    () =>
      user?.role === "admin" ||
      user?.is_staff ||
      user?.is_superuser,
    [user]
  );

  const isUser = useMemo(
    () => !!user && !isAdmin,
    [user, isAdmin]
  );

  const hasRole = (role) =>
    !!user &&
    (user.role === role || user.roles?.includes(role));

  const hasPermission = (permission) =>
    !!user && user.permissions?.includes(permission);

  return {
    user,
    loading,
    isAuthenticated,
    isAdmin,
    isUser,
    login,
    logout: async () => {
      await logout();
      navigate("/login", { replace: true });
    },
    register,
    refreshProfile,
    updateProfile,
    hasRole,
    hasPermission,
  };
};

export default useAuth;