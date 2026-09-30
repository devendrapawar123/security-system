import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const Topbar = ({ user, onLogout }) => {
  const [search, setSearch] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "Intruder detected",
      message: "Unknown face detected on Camera 01.",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "Session Locked",
      message: "System locked because of inactivity.",
      time: "15 min ago",
    },
    {
      id: 3,
      title: "Login Success",
      message: "New login detected.",
      time: "1 hour ago",
    },
  ];

  return (
    <div className="flex w-full items-center justify-between gap-4">

      {/* Search */}

      <div className="relative hidden w-full max-w-lg md:block">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search dashboard..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-[#111827] py-3 pl-11 pr-4 text-white outline-none transition focus:border-cyan-500"
        />

      </div>

      <div className="flex items-center gap-4">

        {/* Live Status */}

        <div className="hidden items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 lg:flex">

          <ShieldCheck
            size={18}
            className="text-emerald-400"
          />

          <span className="text-sm font-medium text-emerald-400">
            System Secure
          </span>

        </div>

        {/* Notifications */}

        <div className="relative">

          <button
            onClick={() =>
              setShowNotifications(!showNotifications)
            }
            className="relative rounded-xl border border-slate-700 bg-[#111827] p-3 text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
          </button>

          {showNotifications && (

            <div className="absolute right-0 mt-3 w-80 rounded-xl border border-slate-700 bg-[#111827] shadow-2xl z-50">

              <div className="border-b border-slate-700 p-4">

                <h3 className="font-semibold text-white">
                  Notifications
                </h3>

              </div>

              <div className="max-h-80 overflow-y-auto">                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-slate-400">
                    No notifications found.
                  </p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-slate-700 p-4 transition hover:bg-slate-800"
                    >
                      <h4 className="font-medium text-white">
                        {item.title}
                      </h4>

                      <p className="mt-1 text-sm text-slate-400">
                        {item.message}
                      </p>

                      <span className="mt-2 block text-xs text-cyan-400">
                        {item.time}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <div className="border-t border-slate-700 p-3 text-center">
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifications(false)}
                  className="text-sm font-medium text-cyan-400 hover:text-cyan-300"
                >
                  View All Notifications
                </Link>
              </div>

            </div>
          )}

        </div>

        {/* User Menu */}

        <div className="relative">

          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#111827] px-3 py-2 transition hover:border-cyan-500"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-semibold text-black">
              {user?.full_name?.charAt(0)?.toUpperCase() ||
                user?.name?.charAt(0)?.toUpperCase() ||
                "U"}
            </div>

            <div className="hidden text-left md:block">
              <p className="font-medium text-white">
                {user?.full_name || user?.name || "User"}
              </p>

              <p className="text-xs text-slate-400">
                {user?.email}
              </p>
            </div>

            <ChevronDown
              size={18}
              className="text-slate-400"
            />
          </button>

          {showUserMenu && (

            <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-700 bg-[#111827] shadow-2xl z-50">

              <Link
                to="/profile"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
              >
                <User size={18} />
                Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setShowUserMenu(false)}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 transition hover:bg-slate-800 hover:text-cyan-400"
              >
                <Settings size={18} />
                Settings
              </Link>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  onLogout();
                }}
                className="flex w-full items-center gap-3 px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default Topbar;