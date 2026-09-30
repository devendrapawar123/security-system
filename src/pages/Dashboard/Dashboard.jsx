import { useEffect, useState } from "react";
import {
  Activity,
  RefreshCw,
  Search,
  Filter,
} from "lucide-react";

import activityApi from "@/api/activityApi";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

const ActivityLogs = () => {
  const [activities, setActivities] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await activityApi.getActivities({
          search,
          status,
        });

      const data =
        response.data?.results ||
        response.data ||
        response.results ||
        response ||
        [];

      setActivities(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load activity logs."
      );

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadActivities();
    }, 400);

    return () => clearTimeout(timer);

  }, [search, status]);

  if (loading) {
    return (
      <Loading
        text="Loading activity logs..."
        height="h-[500px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadActivities}
      />
    );
  }

  if (!activities.length) {
    return (
      <EmptyState
        title="No Activity Logs"
        message="No activity found."
      />
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

            <Activity className="text-cyan-400"/>

            Activity Logs

          </h1>

          <p className="mt-2 text-slate-400">
            Monitor user and system activities.
          </p>

        </div>

        <button
          onClick={loadActivities}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
        >
          <RefreshCw size={18}/>
          Refresh
        </button>

      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-3">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        <div className="relative">

          <Filter
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="">All Activities</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="intruder">Intruder</option>
            <option value="lock">Screen Lock</option>
            <option value="warning">Warning</option>
          </select>

        </div>

      </div>

      {/* Activity Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111827]">

        <div className="overflow-x-auto">

          <table className="min-w-full">            <thead className="border-b border-slate-700 bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  User
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Activity
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  IP Address
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Date & Time
                </th>
              </tr>
            </thead>

            <tbody>

              {activities.map((activity) => (

                <tr
                  key={activity.id}
                  className="border-b border-slate-800 transition hover:bg-slate-900/60"
                >

                  <td className="px-6 py-4">
                    <div>

                      <p className="font-medium text-white">
                        {activity.user_name ||
                          activity.user?.username ||
                          "Unknown"}
                      </p>

                      <p className="text-sm text-slate-400">
                        {activity.user?.email}
                      </p>

                    </div>
                  </td>

                  <td className="px-6 py-4">

                    <span className="text-slate-300">
                      {activity.activity ||
                        activity.action ||
                        activity.event}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        activity.status === "success"
                          ? "bg-green-500/20 text-green-400"
                          : activity.status === "warning"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : activity.status === "failed"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-cyan-500/20 text-cyan-400"
                      }`}
                    >
                      {activity.status || "Info"}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {activity.ip_address || "-"}
                  </td>

                  <td className="px-6 py-4 text-slate-400">
                    {activity.created_at ||
                      activity.timestamp ||
                      "-"}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Footer */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-700 bg-slate-900 px-6 py-4 md:flex-row">

          <p className="text-sm text-slate-400">
            Showing {activities.length} activity record
            {activities.length !== 1 ? "s" : ""}
          </p>

          <div className="flex gap-2">

            <button
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Previous
            </button>

            <button
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white transition hover:bg-cyan-500"
            >
              1
            </button>

            <button
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800"
            >
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ActivityLogs;