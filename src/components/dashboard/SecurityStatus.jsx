import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Camera,
  Cpu,
  HardDrive,
  Wifi,
  MonitorSmartphone,
} from "lucide-react";

import securityApi from "@/api/securityApi";

const SecurityStatus = () => {
  const [status, setStatus] = useState({
    system_status: "Unknown",
    camera_status: "Offline",
    desktop_agent: "Offline",
    face_recognition: "Inactive",
    cpu_usage: 0,
    memory_usage: 0,
    storage_usage: 0,
    network_status: "Offline",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSecurityStatus();
  }, []);

  const loadSecurityStatus = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await securityApi.getStatus();

      const data = response?.data?.data || response?.data || {};

      setStatus({
        system_status: data.system_status ?? "Protected",
        camera_status: data.camera_status ?? "Online",
        desktop_agent: data.desktop_agent ?? "Running",
        face_recognition: data.face_recognition ?? "Active",
        cpu_usage: data.cpu_usage ?? 0,
        memory_usage: data.memory_usage ?? 0,
        storage_usage: data.storage_usage ?? 0,
        network_status: data.network_status ?? "Connected",
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load security status.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-[#111827] p-6 animate-pulse h-[420px]" />
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

      <h2 className="mb-6 text-xl font-bold text-white">
        Security Status
      </h2>

      <div className="space-y-5">

        <StatusRow
          icon={<ShieldCheck size={18} className="text-green-400" />}
          label="System"
          value={status.system_status}
        />

        <StatusRow
          icon={<Camera size={18} className="text-cyan-400" />}
          label="Camera"
          value={status.camera_status}
        />

        <StatusRow
          icon={<MonitorSmartphone size={18} className="text-blue-400" />}
          label="Desktop Agent"
          value={status.desktop_agent}
        />

        <StatusRow
          icon={<ShieldCheck size={18} className="text-purple-400" />}
          label="Face Recognition"
          value={status.face_recognition}
        />

        <ProgressRow
          icon={<Cpu size={18} className="text-yellow-400" />}
          label="CPU Usage"
          value={status.cpu_usage}
        />

        {/* Memory Usage */}

        <ProgressRow
          icon={<MonitorSmartphone size={18} className="text-blue-400" />}
          label="Memory Usage"
          value={status.memory_usage}
        />

        {/* Storage Usage */}

        <ProgressRow
          icon={<HardDrive size={18} className="text-orange-400" />}
          label="Storage Usage"
          value={status.storage_usage}
        />

        {/* Network */}

        <StatusRow
          icon={<Wifi size={18} className="text-emerald-400" />}
          label="Network"
          value={status.network_status}
        />

      </div>

    </div>
  );
};

const StatusRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-900/50 p-3">
    <div className="flex items-center gap-3">
      {icon}

      <span className="text-slate-300">
        {label}
      </span>
    </div>

    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        value === "Online" ||
        value === "Running" ||
        value === "Connected" ||
        value === "Protected" ||
        value === "Active"
          ? "bg-emerald-500/20 text-emerald-400"
          : "bg-red-500/20 text-red-400"
      }`}
    >
      {value}
    </span>
  </div>
);

const ProgressRow = ({ icon, label, value }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {icon}

        <span className="text-slate-300">
          {label}
        </span>
      </div>

      <span className="text-sm font-medium text-white">
        {value}%
      </span>
    </div>

    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          value >= 80
            ? "bg-red-500"
            : value >= 60
            ? "bg-yellow-500"
            : "bg-emerald-500"
        }`}
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  </div>
);

export default SecurityStatus;