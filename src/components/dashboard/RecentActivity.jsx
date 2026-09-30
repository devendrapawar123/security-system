import { useEffect, useState } from "react";
import { Search, RefreshCw } from "lucide-react";

import activityApi from "@/api/activityApi";

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadActivities();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFilteredActivities(
      activities.filter((item) => {
        return (
          item.user?.toLowerCase().includes(keyword) ||
          item.action?.toLowerCase().includes(keyword) ||
          item.ip_address?.toLowerCase().includes(keyword) ||
          item.device?.toLowerCase().includes(keyword)
        );
      })
    );
  }, [search, activities]);

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await activityApi.getActivities();

      const data = response?.data?.data || response?.data || [];

      setActivities(data);
      setFilteredActivities(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load recent activities.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-[420px] animate-pulse rounded-2xl bg-[#111827]" />
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

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h2 className="text-xl font-bold text-white">
            Recent Activity
          </h2>

          <p className="text-sm text-slate-400">
            Latest user activity logs
          </p>
        </div>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-xl border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
            />

          </div>

          <button
            onClick={loadActivities}
            className="rounded-xl border border-slate-700 bg-slate-900 p-2 hover:border-cyan-500"
          >
            <RefreshCw
              size={20}
              className="text-cyan-400"
            />
          </button>

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-slate-700 text-left text-sm text-slate-400">

              <th className="pb-3">User</th>
              <th className="pb-3">Action</th>
              <th className="pb-3">Device</th>
              <th className="pb-3">IP Address</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Time</th>

            </tr>

          </thead>

          <tbody>          {filteredActivities.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-slate-400"
              >
                No activity found.
              </td>
            </tr>
          ) : (
            filteredActivities.map((activity) => (
              <tr
                key={activity.id}
                className="border-b border-slate-800 transition hover:bg-slate-900/40"
              >
                <td className="py-4">
                  <div>
                    <p className="font-medium text-white">
                      {activity.user || "Unknown"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {activity.email || ""}
                    </p>
                  </div>
                </td>

                <td className="py-4 text-slate-300">
                  {activity.action || "-"}
                </td>

                <td className="py-4 text-slate-300">
                  {activity.device || "-"}
                </td>

                <td className="py-4 text-slate-300">
                  {activity.ip_address || "-"}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      activity.status === "Success"
                        ? "bg-green-500/20 text-green-400"
                        : activity.status === "Failed"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {activity.status || "Unknown"}
                  </span>
                </td>

                <td className="py-4 text-slate-400">
                  {activity.created_at
                    ? new Date(activity.created_at).toLocaleString("en-IN")
                    : "-"}
                </td>
              </tr>
            ))
          )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-700 pt-4">
        <p className="text-sm text-slate-400">
          Total Records: {filteredActivities.length}
        </p>

        <button
          onClick={loadActivities}
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-black transition hover:bg-cyan-400"
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;