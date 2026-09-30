import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ShieldAlert,
  Wifi,
  WifiOff,
  RefreshCw,
} from "lucide-react";

const WS_URL =
  import.meta.env.VITE_WS_URL ||
  "ws://127.0.0.1:8000/ws/alerts/";

const LiveAlerts = () => {
  const socket = useRef(null);

  const [alerts, setAlerts] = useState([]);
  const [connected, setConnected] = useState(false);
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    connect();

    return () => {
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  const connect = () => {
    socket.current = new WebSocket(WS_URL);

    socket.current.onopen = () => {
      setConnected(true);
      setReconnecting(false);
    };

    socket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        setAlerts((prev) => [data, ...prev].slice(0, 20));
      } catch (error) {
        console.error(error);
      }
    };

    socket.current.onclose = () => {
      setConnected(false);
      setReconnecting(true);

      setTimeout(connect, 5000);
    };

    socket.current.onerror = () => {
      socket.current.close();
    };
  };

  const badgeColor = (type) => {
    switch (type) {
      case "intruder":
        return "bg-red-500/20 text-red-400";

      case "multiple_person":
        return "bg-orange-500/20 text-orange-400";

      case "camera_offline":
        return "bg-yellow-500/20 text-yellow-400";

      case "idle_lock":
        return "bg-cyan-500/20 text-cyan-400";

      default:
        return "bg-slate-700 text-slate-300";
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Live Alerts
          </h2>

          <p className="text-sm text-slate-400">
            Real-time security notifications
          </p>

        </div>

        <div className="flex items-center gap-3">

          {connected ? (
            <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-green-400">

              <Wifi size={16} />

              Connected

            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-red-400">

              <WifiOff size={16} />

              Disconnected

            </div>
          )}

          {reconnecting && (
            <RefreshCw
              className="animate-spin text-cyan-400"
              size={18}
            />
          )}

        </div>

      </div>

      <div className="space-y-4">
                {alerts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center">

            <Bell
              size={45}
              className="mx-auto mb-3 text-slate-500"
            />

            <h3 className="text-lg font-semibold text-white">
              No Live Alerts
            </h3>

            <p className="mt-2 text-slate-400">
              Waiting for security events...
            </p>

          </div>
        ) : (
          alerts.map((alert, index) => (
            <div
              key={alert.id || index}
              className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 transition-all duration-300 hover:border-cyan-500"
            >
              <div className="flex items-start justify-between">

                <div className="flex items-start gap-3">

                  <div className="rounded-lg bg-red-500/10 p-3">

                    <ShieldAlert
                      size={22}
                      className="text-red-400"
                    />

                  </div>

                  <div>

                    <h4 className="font-semibold text-white">
                      {alert.title || "Security Alert"}
                    </h4>

                    <p className="mt-1 text-sm text-slate-400">
                      {alert.message || "No description available."}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${badgeColor(
                          alert.type
                        )}`}
                      >
                        {alert.type || "system"}
                      </span>

                      {alert.camera && (
                        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                          📷 {alert.camera}
                        </span>
                      )}

                      {alert.confidence && (
                        <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
                          🎯 {alert.confidence}%
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                <div className="text-right">

                  <p className="text-xs text-slate-500">
                    {alert.created_at
                      ? new Date(alert.created_at).toLocaleString("en-IN")
                      : "Just now"}
                  </p>

                </div>

              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default LiveAlerts;
      