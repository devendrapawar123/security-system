import { useEffect, useState } from "react";
import {
  Bell,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Info,
  RefreshCw,
  CheckCheck,
} from "lucide-react";

import notificationApi from "@/api/notificationApi";
import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await notificationApi.getNotifications();

      const data =
        response.data?.results ||
        response.data ||
        response.results ||
        response ||
        [];

      setNotifications(data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  };

  const markAllRead = async () => {
    try {
      await notificationApi.markAllAsRead();

      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          is_read: true,
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "intruder":
        return (
          <ShieldAlert
            size={20}
            className="text-red-400"
          />
        );

      case "warning":
        return (
          <AlertTriangle
            size={20}
            className="text-yellow-400"
          />
        );

      case "success":
        return (
          <CheckCircle2
            size={20}
            className="text-green-400"
          />
        );

      default:
        return (
          <Info
            size={20}
            className="text-cyan-400"
          />
        );
    }
  };

  if (loading) {
    return (
      <Loading
        text="Loading notifications..."
        height="h-[450px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadNotifications}
      />
    );
  }

  if (!notifications.length) {
    return (
      <EmptyState
        title="No Notifications"
        message="You're all caught up."
      />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="flex items-center gap-2 text-xl font-bold text-white">
            <Bell className="text-cyan-400" />
            Notifications
          </h2>

          <p className="text-sm text-slate-400">
            Recent security alerts
          </p>

        </div>

        <div className="flex gap-2">

          <button
            onClick={loadNotifications}
            className="rounded-lg bg-slate-800 p-2 transition hover:bg-slate-700"
          >
            <RefreshCw
              size={18}
              className="text-white"
            />
          </button>

          <button
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white transition hover:bg-cyan-500"
          >
            <CheckCheck size={18} />
            Mark All Read
          </button>

        </div>

      </div>

      <div className="space-y-4">

        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-xl border p-4 transition ${
              notification.is_read
                ? "border-slate-700 bg-slate-900"
                : "border-cyan-500/40 bg-cyan-500/10"
            }`}
          >
            <div className="flex items-start gap-4">

              <div className="mt-1">
                {getIcon(notification.type)}
              </div>

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h3 className="font-semibold text-white">
                    {notification.title}
                  </h3>

                  <span className="text-xs text-slate-400">
                    {notification.created_at}
                  </span>

                </div>

                <p className="mt-2 text-sm text-slate-400">
                  {notification.message}
                </p>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
};

export default NotificationPanel;