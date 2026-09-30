import {
  LayoutDashboard,
  Activity,
  ShieldAlert,
  BarChart3,
  Users,
  FileText,
  Bell,
  Settings,
  User,
  LogOut,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Activity Logs",
    path: "/activity",
    icon: Activity,
  },
  {
    name: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Intruders",
    path: "/intruders",
    icon: ShieldAlert,
  },
  {
    name: "Sessions",
    path: "/sessions",
    icon: Users,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    name: "Notifications",
    path: "/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

const Sidebar = ({
  user,
  onLogout,
  closeSidebar,
}) => {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-[#0F172A]">

      {/* Logo */}

      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">

        <div>

          <h1 className="text-xl font-bold text-cyan-400">
            Smart Security
          </h1>

          <p className="text-xs text-slate-400">
            Monitoring System
          </p>

        </div>

        {closeSidebar && (
          <button
            onClick={closeSidebar}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 lg:hidden"
          >
            <X size={20} />
          </button>
        )}

      </div>

      {/* User */}

      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg font-bold text-black">
            {user?.full_name?.charAt(0)?.toUpperCase() ||
              user?.name?.charAt(0)?.toUpperCase() ||
              "U"}
          </div>

          <div>

            <h2 className="font-semibold text-white">
              {user?.full_name ||
                user?.name ||
                "User"}
            </h2>

            <p className="text-sm text-slate-400">
              {user?.email}
            </p>

            <span className="mt-1 inline-block rounded bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
              {user?.role || "User"}
            </span>

          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => closeSidebar?.()}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={20}
                    className={
                      isActive
                        ? "text-black"
                        : "text-slate-400 group-hover:text-cyan-400"
                    }
                  />

                  <span className="font-medium">
                    {item.name}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-4">

        <button
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-medium text-white transition hover:bg-red-600"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;