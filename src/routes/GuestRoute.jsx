import { Navigate, Outlet } from "react-router-dom";

import useAuth from "@/hooks/useAuth";

import Loading from "@/components/common/Loading";

const GuestRoute = () => {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  // Show loader while auth state is being checked
  if (loading) {
    return (
      <Loading
        text="Checking authentication..."
        height="h-screen"
      />
    );
  }

  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // Allow guest pages (Login / Register)
  return <Outlet />;
};

export default GuestRoute;