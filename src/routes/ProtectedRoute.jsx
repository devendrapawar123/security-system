import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

import Loading from "@/components/common/Loading";

const ProtectedRoute = ({
  roles = [],
  permissions = [],
}) => {
  const location = useLocation();

  const {
    loading,
    isAuthenticated,
    hasRole,
    hasPermission,
  } = useAuth();

  // Loading State
  if (loading) {
    return (
      <Loading
        text="Authenticating..."
        height="h-screen"
      />
    );
  }

  // User Not Logged In
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  // Role Based Protection
  if (
    roles.length > 0 &&
    !roles.some((role) => hasRole(role))
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // Permission Based Protection
  if (
    permissions.length > 0 &&
    !permissions.every((permission) =>
      hasPermission(permission)
    )
  ) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;