import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import analyticsApi from "@/api/analyticsApi";

const AnalyticsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await analyticsApi.getAnalytics();

      const data = response?.data?.data || response?.data || [];

      setChartData(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load analytics.");
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

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Security Analytics
          </h2>

          <p className="text-sm text-slate-400">
            Weekly security activity overview
          </p>

        </div>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart data={chartData}>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="day"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="logins"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />

            <Line
              type="monotone"
              dataKey="intruders"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
                        <Line
              type="monotone"
              dataKey="security_events"
              stroke="#22C55E"
              strokeWidth={3}
              dot={{ r: 4 }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Analytics Summary */}

      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
          <p className="text-sm text-slate-400">
            Total Logins
          </p>

          <h3 className="mt-2 text-2xl font-bold text-cyan-400">
            {chartData.reduce(
              (sum, item) => sum + (item.logins || 0),
              0
            )}
          </h3>
        </div>

        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
          <p className="text-sm text-slate-400">
            Intruder Detections
          </p>

          <h3 className="mt-2 text-2xl font-bold text-red-400">
            {chartData.reduce(
              (sum, item) => sum + (item.intruders || 0),
              0
            )}
          </h3>
        </div>

        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
          <p className="text-sm text-slate-400">
            Security Events
          </p>

          <h3 className="mt-2 text-2xl font-bold text-green-400">
            {chartData.reduce(
              (sum, item) => sum + (item.security_events || 0),
              0
            )}
          </h3>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsChart;