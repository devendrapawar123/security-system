import { useEffect, useState } from "react";
import {
  FileText,
  RefreshCw,
  Download,
  Calendar,
  FileSpreadsheet,
  FileType,
} from "lucide-react";

import reportApi from "@/api/reportApi";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

const Reports = () => {
  const [reports, setReports] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [range, setRange] = useState("7");

  useEffect(() => {
    loadReports();
  }, [range]);

  const loadReports = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await reportApi.getReports({
        days: range,
      });

      const data =
        response.data?.results ||
        response.data ||
        response.results ||
        response ||
        [];

      setReports(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load reports."
      );

    } finally {

      setLoading(false);

    }
  };

  const generateReport = async (type) => {
    try {

      await reportApi.generateReport({
        type,
        days: range,
      });

      loadReports();

    } catch (err) {
      console.error(err);
    }
  };

  const downloadReport = async (id) => {
    try {

      await reportApi.downloadReport(id);

    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Loading
        text="Loading reports..."
        height="h-[600px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadReports}
      />
    );
  }

  if (!reports.length) {
    return (
      <EmptyState
        title="No Reports"
        message="No reports generated yet."
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

            <FileText className="text-cyan-400"/>

            Reports

          </h1>

          <p className="mt-2 text-slate-400">
            Generate and download security reports.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <select
            value={range}
            onChange={(e)=>setRange(e.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white"
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>

          <button
            onClick={loadReports}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
          >
            <RefreshCw size={18}/>
            Refresh
          </button>

          <button
            onClick={() => generateReport("pdf")}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
          >
            <FileType size={18}/>
            Generate PDF
          </button>

          <button
            onClick={() => generateReport("csv")}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          >
            <FileSpreadsheet size={18}/>
            Generate CSV
          </button>

        </div>

      </div>

      {/* Reports Table */}

      <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111827]">

        <div className="overflow-x-auto">

          <table className="min-w-full">            <thead className="border-b border-slate-700 bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Report Name
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Created At
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {reports.map((report) => (

                <tr
                  key={report.id}
                  className="border-b border-slate-800 hover:bg-slate-900/50"
                >

                  <td className="px-6 py-4">

                    <div>

                      <p className="font-medium text-white">
                        {report.name || report.title}
                      </p>

                      <p className="text-sm text-slate-400">
                        Report ID: {report.id}
                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        report.type === "pdf"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {(report.type || "PDF").toUpperCase()}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        report.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : report.status === "processing"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {report.status || "Completed"}
                    </span>

                  </td>

                  <td className="px-6 py-4 text-slate-300">
                    {report.created_at || "-"}
                  </td>

                  <td className="px-6 py-4 text-center">

                    <button
                      type="button"
                      onClick={() => downloadReport(report.id)}
                      className="inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-500"
                    >
                      <Download size={16} />
                      Download
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* Pagination */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-700 bg-slate-900 px-6 py-4 md:flex-row">

          <p className="text-sm text-slate-400">
            Showing {reports.length} report
            {reports.length !== 1 ? "s" : ""}
          </p>

          <div className="flex gap-2">

            <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
              Previous
            </button>

            <button className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white">
              1
            </button>

            <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
              Next
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Reports;