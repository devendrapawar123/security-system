import { useEffect, useState } from "react";
import { ShieldCheck, Clock, CalendarDays } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

const WelcomeBanner = () => {
  const { user, refreshProfile } = useAuth();

  const [currentTime, setCurrentTime] = useState(
    new Date()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    refreshProfile().catch(() => {});
  }, [refreshProfile]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);

  const formatTime = (date) =>
    new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);

  return (
    <section className="rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#0B1120] p-6 shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <p className="text-cyan-400 font-medium">
            Welcome Back 👋
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            {user?.full_name || user?.name || "User"}
          </h1>

          <p className="mt-2 text-slate-400">
            Smart Security System Dashboard
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm text-cyan-300">
              {user?.role || "User"}
            </span>

            <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-300 flex items-center gap-2">
              <ShieldCheck size={16} />
              System Protected
            </span>

          </div>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-slate-700 bg-[#111827]/70 p-4">

            <div className="mb-2 flex items-center gap-2">
              <CalendarDays
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Today
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white">
              {formatDate(currentTime)}
            </h3>

          </div>

          <div className="rounded-xl border border-slate-700 bg-[#111827]/70 p-4">

            <div className="mb-2 flex items-center gap-2">
              <Clock
                size={18}
                className="text-cyan-400"
              />

              <span className="text-sm text-slate-400">
                Current Time
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white">
              {formatTime(currentTime)}
            </h3>

          </div>

          <div className="rounded-xl border border-slate-700 bg-[#111827]/70 p-4">

            <p className="text-sm text-slate-400">
              Last Login
            </p>

            <h3 className="mt-2 text-lg font-semibold text-white">
              {user?.last_login
                ? new Date(user.last_login).toLocaleString(
                    "en-IN"
                  )
                : "First Login"}
            </h3>

          </div>

          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">

            <p className="text-sm text-emerald-300">
              Security Status
            </p>

            <div className="mt-2 flex items-center gap-2">

              <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse"></div>

              <span className="font-semibold text-white">
                Protected
              </span>

            </div>

            <p className="mt-2 text-sm text-slate-300">
              All security services are running normally.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
};

export default WelcomeBanner;