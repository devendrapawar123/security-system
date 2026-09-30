import { useEffect, useState } from "react";
import {
  Camera,
  RefreshCw,
  Maximize2,
  Camera as CameraIcon,
  Wifi,
  WifiOff,
} from "lucide-react";

const CAMERA_BASE_URL =
  import.meta.env.VITE_CAMERA_URL ||
  "http://127.0.0.1:8000/api/camera";

const LiveCameraFeed = () => {
  const [camera, setCamera] = useState({
    id: 1,
    name: "Main Entrance",
    status: "online",
    stream: `${CAMERA_BASE_URL}/stream/1/`,
  });

  const [loading, setLoading] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const refreshStream = () => {
    setCamera((prev) => ({
      ...prev,
      stream: `${CAMERA_BASE_URL}/stream/${prev.id}/?t=${Date.now()}`,
    }));
  };

  const takeSnapshot = () => {
    window.open(
      `${CAMERA_BASE_URL}/snapshot/${camera.id}/`,
      "_blank"
    );
  };

  const toggleFullscreen = () => {
    setFullscreen((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="h-[450px] animate-pulse rounded-2xl bg-[#111827]" />
    );
  }

  return (
    <div
      className={`rounded-2xl border border-slate-700 bg-[#111827] p-6 ${
        fullscreen ? "fixed inset-4 z-50" : ""
      }`}
    >
      <div className="mb-5 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Live Camera Feed
          </h2>

          <p className="text-sm text-slate-400">
            Real-time surveillance monitoring
          </p>

        </div>

        <div className="flex items-center gap-2">

          <span
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-sm ${
              camera.status === "online"
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {camera.status === "online" ? (
              <Wifi size={16} />
            ) : (
              <WifiOff size={16} />
            )}

            {camera.status}
          </span>

        </div>

      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-black">        <div className="relative">

          <img
            src={camera.stream}
            alt={camera.name}
            className="h-[420px] w-full object-cover"
            onError={() =>
              setCamera((prev) => ({
                ...prev,
                status: "offline",
              }))
            }
          />

          {/* Overlay */}
          <div className="absolute left-4 top-4 rounded-lg bg-black/60 px-4 py-2 backdrop-blur">
            <div className="flex items-center gap-2 text-white">
              <Camera size={18} />
              <span className="font-medium">{camera.name}</span>
            </div>
          </div>

          {/* LIVE Badge */}
          <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-sm font-semibold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            LIVE
          </div>

        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-700 bg-[#0F172A] p-4">

          {/* Camera Selector */}
          <select
            value={camera.id}
            onChange={(e) =>
              setCamera({
                id: Number(e.target.value),
                name: `Camera ${e.target.value}`,
                status: "online",
                stream: `${CAMERA_BASE_URL}/stream/${e.target.value}/`,
              })
            }
            className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-2 text-white outline-none focus:border-cyan-500"
          >
            <option value={1}>Main Entrance</option>
            <option value={2}>Reception</option>
            <option value={3}>Parking Area</option>
            <option value={4}>Office Floor</option>
          </select>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={refreshStream}
              className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white transition hover:bg-slate-700"
            >
              <RefreshCw size={18} />
              Refresh
            </button>

            <button
              onClick={takeSnapshot}
              className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-500"
            >
              <CameraIcon size={18} />
              Snapshot
            </button>

            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white transition hover:bg-indigo-500"
            >
              <Maximize2 size={18} />
              {fullscreen ? "Exit Fullscreen" : "Fullscreen"}
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

export default LiveCameraFeed;