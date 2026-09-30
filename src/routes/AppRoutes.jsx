import { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "@/layouts/DashboardLayout";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

import Loading from "@/components/common/Loading";

/* ===========================
   Auth Pages
=========================== */

const Login = lazy(() => import("@/pages/auth/Login"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ChangePassword = lazy(() =>
  import("@/pages/auth/ChangePassword")
);
const AuthProfile = lazy(() =>
  import("@/pages/auth/Profile")
);

/* ===========================
   Dashboard Pages
=========================== */

const Dashboard = lazy(() =>
  import("@/pages/dashboard/Dashboard")
);

const ActivityLogs = lazy(() =>
  import("@/pages/dashboard/ActivityLogs")
);

const Intruders = lazy(() =>
  import("@/pages/dashboard/Intruders")
);

const Sessions = lazy(() =>
  import("@/pages/dashboard/Sessions")
);

const Analytics = lazy(() =>
  import("@/pages/dashboard/Analytics")
);

const Notifications = lazy(() =>
  import("@/pages/dashboard/Notifications")
);

const Reports = lazy(() =>
  import("@/pages/dashboard/Reports")
);

const Settings = lazy(() =>
  import("@/pages/dashboard/Settings")
);

const Profile = lazy(() =>
  import("@/pages/dashboard/Profile")
);

/* ===========================
   Not Found
=========================== */

const NotFound = lazy(() =>
  import("@/pages/NotFound")
);

const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <Loading
          text="Loading..."
          height="h-screen"
        />
      }
    >
      <Routes>
        {/* Guest Routes */}

        <Route element={<GuestRoute />}>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />
        </Route>

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route
              index
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/activity"
              element={<ActivityLogs />}
            />

            <Route
              path="/intruders"
              element={<Intruders />}
            />

            <Route
              path="/sessions"
              element={<Sessions />}
            />

            <Route
              path="/analytics"
              element={<Analytics />}
            />

            <Route
              path="/notifications"
              element={<Notifications />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/settings"
              element={<Settings />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />

            <Route
              path="/auth/profile"
              element={<AuthProfile />}
            />

            <Route
              path="/change-password"
              element={<ChangePassword />}
            />
          </Route>
        </Route>

        {/* 404 */}

        <Route
          path="/404"
          element={<NotFound />}
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/404"
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;