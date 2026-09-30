import { useEffect, useState } from "react";
import {
  Camera,
  ShieldAlert,
  Eye,
  RefreshCw,
  Clock,
} from "lucide-react";

import intruderApi from "@/api/intruderApi";

const IntruderFeed = () => {
  const [intruders, setIntruders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadIntruders();
  }, []);

  const loadIntruders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await intruderApi.getIntruders();

      const data = response?.data?.data || response?.data || [];

      setIntruders(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load intruder feed.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-130 animate-pulse rounded-2xl bg-[#111827]" />
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
            Intruder Detection Feed
          </h2>

          <p className="text-sm text-slate-400">
            Latest AI detected intruders
          </p>

        </div>

        <button
          onClick={loadIntruders}
          className="rounded-xl border border-slate-700 bg-slate-900 p-2 hover:border-cyan-500"
        >
          <RefreshCw
            size={18}
            className="text-cyan-400"
          />
        </button>

      </div>

      <div className="space-y-5">
                {intruders.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-8 text-center">
            <ShieldAlert
              className="mx-auto mb-3 text-slate-500"
              size={40}
            />
            <p className="text-slate-400">
              No intruder detected.
            </p>
          </div>
        ) : (
          intruders.map((intruder) => (
            <div
              key={intruder.id}
              className="overflow-hidden rounded-xl border border-slate-700 bg-slate-900/40 transition hover:border-cyan-500"
            >
              <div className="grid gap-4 p-4 lg:grid-cols-[180px_1fr]">

                {/* Image */}

                <div className="overflow-hidden rounded-lg bg-slate-800">

                  {intruder.image ? (
                    <img
                      src={intruder.image}
                      alt="Intruder"
                      className="h-44 w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-44 items-center justify-center">
                      <Camera
                        size={50}
                        className="text-slate-500"
                      />
                    </div>
                  )}

                </div>

                {/* Details */}

                <div className="flex flex-col justify-between">

                  <div>

                    <div className="flex items-center justify-between">

                      <h3 className="text-lg font-semibold text-white">
                        {intruder.person_name || "Unknown Person"}
                      </h3>

                      <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
                        {intruder.status || "ALERT"}
                      </span>

                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Camera
                        </p>

                        <p className="mt-1 text-slate-300">
                          {intruder.camera_name || "Main Camera"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Confidence
                        </p>

                        <p className="mt-1 font-semibold text-cyan-400">
                          {intruder.confidence ?? 0}%
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Detection Time
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-slate-300">
                          <Clock size={15} />
                          {intruder.detected_at
                            ? new Date(
                                intruder.detected_at
                              ).toLocaleString("en-IN")
                            : "-"}
                        </p>
                      </div>

                    </div>

                  </div>

                  <div className="mt-5 flex justify-end">

                    <button
                      className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-900 transition hover:bg-cyan-400"
                    >
                      <Eye size={18} />
                      View Details
                    </button>

                  </div>

                </div>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default IntruderFeed;
  