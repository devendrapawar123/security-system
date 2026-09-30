import { useEffect, useState } from "react";
import {
  Monitor,
  Smartphone,
  Globe,
  MapPin,
  ShieldCheck,
  RefreshCw,
  LogOut,
} from "lucide-react";

import sessionApi from "@/api/sessionApi";

const ActiveSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await sessionApi.getSessions();

      const data = response?.data?.data || response?.data || [];

      setSessions(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load active sessions.");
    } finally {
      setLoading(false);
    }
  };

  const logoutSession = async (sessionId) => {
    try {
      await sessionApi.logoutSession(sessionId);

      loadSessions();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="h-[450px] animate-pulse rounded-2xl bg-[#111827]" />
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Active Sessions
          </h2>

          <p className="text-sm text-slate-400">
            Devices currently signed in
          </p>

        </div>

        <button
          onClick={loadSessions}
          className="rounded-xl border border-slate-700 bg-slate-900 p-2 hover:border-cyan-500"
        >
          <RefreshCw
            size={18}
            className="text-cyan-400"
          />
        </button>

      </div>

      <div className="space-y-4">        {sessions.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
            <p className="text-slate-400">
              No active sessions found.
            </p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id || session.session_id}
              className="rounded-xl border border-slate-700 bg-slate-900/50 p-5 transition hover:border-cyan-500"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-start gap-4">

                  <div className="rounded-xl bg-cyan-500/10 p-3">
                    {session.device?.toLowerCase().includes("mobile") ? (
                      <Smartphone
                        size={24}
                        className="text-cyan-400"
                      />
                    ) : (
                      <Monitor
                        size={24}
                        className="text-cyan-400"
                      />
                    )}
                  </div>

                  <div>

                    <h3 className="font-semibold text-white">
                      {session.device || "Unknown Device"}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-400">

                      <span className="flex items-center gap-2">
                        <Globe size={16} />
                        {session.browser || "Unknown Browser"}
                      </span>

                      <span className="flex items-center gap-2">
                        <Monitor size={16} />
                        {session.os || "Unknown OS"}
                      </span>

                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        {session.location || "Unknown"}
                      </span>

                    </div>

                    <p className="mt-3 text-xs text-slate-500">
                      Last Active:{" "}
                      {session.last_activity
                        ? new Date(
                            session.last_activity
                          ).toLocaleString("en-IN")
                        : "-"}
                    </p>

                  </div>

                </div>

                <div className="flex flex-col items-end gap-3">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      session.is_current
                        ? "bg-green-500/20 text-green-400"
                        : "bg-slate-700 text-slate-300"
                    }`}
                  >
                    {session.is_current
                      ? "Current Session"
                      : "Active"}
                  </span>

                  <div className="flex items-center gap-2">

                    <ShieldCheck
                      size={18}
                      className="text-green-400"
                    />

                    <span className="text-sm text-slate-300">
                      {session.status || "Secure"}
                    </span>

                  </div>

                  {!session.is_current && (
                    <button
                      onClick={() =>
                        logoutSession(
                          session.id || session.session_id
                        )
                      }
                      className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  )}

                </div>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default ActiveSessions;