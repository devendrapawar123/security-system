import { useEffect, useState } from "react";
import {
  BarChart3,
  RefreshCw,
  Calendar,
  Download,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import dashboardApi from "@/api/dashboardApi";
import reportApi from "@/api/reportApi";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

const COLORS = [
  "#06B6D4",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
];

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [range, setRange] = useState("7");

  useEffect(() => {
    loadAnalytics();
  }, [range]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await dashboardApi.getAnalytics({
          days: range,
        });

      setAnalytics(
        response.data ||
        response
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load analytics."
      );

    } finally {

      setLoading(false);

    }
  };

  const exportReport = async (type) => {
    try {

      await reportApi.exportReport({
        type,
        range,
      });

    } catch (err) {

      console.error(err);

    }
  };

  if (loading) {
    return (
      <Loading
        text="Loading analytics..."
        height="h-[600px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadAnalytics}
      />
    );
  }

  if (!analytics) {
    return (
      <EmptyState
        title="No Analytics"
        message="Analytics data not available."
      />
    );
  }

  const lineData =
    analytics.line_chart || [];

  const barData =
    analytics.bar_chart || [];

  const pieData =
    analytics.pie_chart || [];

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

            <BarChart3 className="text-cyan-400"/>

            Analytics Dashboard

          </h1>

          <p className="mt-2 text-slate-400">
            Security insights and statistics.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <select
            value={range}
            onChange={(e)=>
              setRange(e.target.value)
            }
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option value="7">
              Last 7 Days
            </option>

            <option value="30">
              Last 30 Days
            </option>

            <option value="90">
              Last 90 Days
            </option>

          </select>

          <button
            onClick={loadAnalytics}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
          >
            <RefreshCw size={18}/>
            Refresh
          </button>

          <button
            onClick={() =>
              exportReport("pdf")
            }
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          >
            <Download size={18}/>
            PDF
          </button>

          <button
            onClick={() =>
              exportReport("csv")
            }
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-500"
          >
            <Calendar size={18}/>
            CSV
          </button>

        </div>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">        {/* Line Chart */}

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

          <h2 className="mb-5 text-lg font-semibold text-white">
            Activity Trend
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#06B6D4"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* Bar Chart */}

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

          <h2 className="mb-5 text-lg font-semibold text-white">
            Detection Summary
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Legend />

              <Bar
                dataKey="value"
                fill="#22C55E"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Pie Chart */}

      <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

        <h2 className="mb-5 text-lg font-semibold text-white">
          Security Distribution
        </h2>

        <ResponsiveContainer width="100%" height={380}>

          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={130}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Analytics;