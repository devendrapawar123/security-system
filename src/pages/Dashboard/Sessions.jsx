import { useEffect, useState } from "react";
import {
  Monitor,
  RefreshCw,
  Search,
  Smartphone,
  Laptop,
  Globe,
} from "lucide-react";

import sessionApi from "@/api/sessionApi";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadSessions();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const loadSessions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await sessionApi.getSessions({
        search,
      });

      const data =
        response.data?.results ||
        response.data ||
        response.results ||
        response ||
        [];

      setSessions(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
          "Unable to load sessions."
      );

    } finally {

      setLoading(false);

    }
  };

  const terminateSession = async (id) => {
    try {

      await sessionApi.terminateSession(id);

      setSessions((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {
      console.error(err);
    }
  };

  const getDeviceIcon = (device) => {
    const value = (device || "").toLowerCase();

    if (value.includes("mobile"))
      return <Smartphone size={20} />;

    if (value.includes("phone"))
      return <Smartphone size={20} />;

    return <Laptop size={20} />;
  };

  if (loading) {
    return (
      <Loading
        text="Loading active sessions..."
        height="h-[500px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadSessions}
      />
    );
  }

  if (!sessions.length) {
    return (
      <EmptyState
        title="No Active Sessions"
        message="No session data found."
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
            <Monitor className="text-cyan-400" />
            Active Sessions
          </h1>

          <p className="mt-2 text-slate-400">
            Monitor and manage logged-in devices.
          </p>

        </div>

        <button
          onClick={loadSessions}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* Search */}

      <div className="relative max-w-md">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
        />

        <input
          type="text"
          placeholder="Search session..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
        />

      </div>

      {/* Session Cards */}

      <div className="grid gap-6 lg:grid-cols-2">        {sessions.map((session) => (
          <div
            key={session.id}
            className="rounded-2xl border border-slate-700 bg-[#111827] p-6 transition-all duration-300 hover:border-cyan-500"
          >
            <div className="flex items-start justify-between">

              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                  {getDeviceIcon(session.device)}
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-white">
                    {session.device || "Unknown Device"}
                  </h3>

                  <p className="mt-1 flex items-center gap-2 text-sm text-slate-400">
                    <Globe size={16} />
                    {session.browser || "Unknown Browser"}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    IP Address:{" "}
                    <span className="text-white">
                      {session.ip_address || "-"}
                    </span>
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Login Time:{" "}
                    <span className="text-white">
                      {session.login_time ||
                        session.created_at ||
                        "-"}
                    </span>
                  </p>

                </div>

              </div>

              {session.is_current && (
                <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-semibold text-green-400">
                  Current Session
                </span>
              )}

            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-4">

              <div>
                <p className="text-sm text-slate-500">
                  Last Activity
                </p>

                <p className="text-sm text-white">
                  {session.last_activity || "-"}
                </p>
              </div>

              {!session.is_current && (
                <button
                  type="button"
                  onClick={() => terminateSession(session.id)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
                >
                  Terminate Session
                </button>
              )}

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Sessions;