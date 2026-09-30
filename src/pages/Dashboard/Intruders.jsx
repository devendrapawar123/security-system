import { useEffect, useState } from "react";
import {
  ShieldAlert,
  RefreshCw,
  Search,
  Eye,
} from "lucide-react";

import intruderApi from "@/api/intruderApi";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

const Intruders = () => {
  const [intruders, setIntruders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadIntruders();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadIntruders();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const loadIntruders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await intruderApi.getIntruders({
        search,
      });

      const data =
        response.data?.results ||
        response.data ||
        response.results ||
        response ||
        [];

      setIntruders(data);

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load intruder records."
      );

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <Loading
        text="Loading intruder records..."
        height="h-[500px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadIntruders}
      />
    );
  }

  if (!intruders.length) {
    return (
      <EmptyState
        title="No Intruders Found"
        message="No intruder detection records available."
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

            <ShieldAlert className="text-red-400" />

            Intruder Detection

          </h1>

          <p className="mt-2 text-slate-400">
            AI detected unauthorized persons.
          </p>

        </div>

        <button
          onClick={loadIntruders}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
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
          placeholder="Search intruder..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-red-500"
        />

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">        {intruders.map((intruder) => (
          <div
            key={intruder.id}
            className="overflow-hidden rounded-2xl border border-slate-700 bg-[#111827] transition-all duration-300 hover:-translate-y-1 hover:border-red-500"
          >
            {/* Image */}
            <div className="relative h-60 overflow-hidden bg-slate-900">
              <img
                src={
                  intruder.image ||
                  intruder.snapshot ||
                  "/images/intruder-placeholder.png"
                }
                alt="Intruder"
                className="h-full w-full object-cover"
              />

              <div className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">
                INTRUDER
              </div>

              <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
                {intruder.confidence || 0}% Match
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-5">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  {intruder.camera_name ||
                    intruder.camera ||
                    "Unknown Camera"}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {intruder.location || "Unknown Location"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-slate-500">
                    Detection Time
                  </p>

                  <p className="mt-1 font-medium text-white">
                    {intruder.detected_at ||
                      intruder.created_at ||
                      "-"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-500">
                    Confidence
                  </p>

                  <p className="mt-1 font-medium text-green-400">
                    {intruder.confidence || 0}%
                  </p>
                </div>
              </div>

              {intruder.description && (
                <div>
                  <p className="text-sm text-slate-400">
                    {intruder.description}
                  </p>
                </div>
              )}

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-500"
              >
                <Eye size={18} />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Intruders;