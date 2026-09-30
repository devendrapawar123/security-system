import { useEffect, useState } from "react";
import {
  Bell,
  RefreshCw,
  Search,
  Filter,
  CheckCheck,
  Trash2,
} from "lucide-react";

import notificationApi from "@/api/notificationApi";
import { connectNotifications } from "@/api/websocket";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";
import EmptyState from "@/components/common/EmptyState";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadNotifications();

    const socket = connectNotifications((message) => {
      setNotifications((prev) => [
        message,
        ...prev,
      ]);
    });

    return () => {
      socket?.close?.();
    };
  }, []);

  const loadNotifications = async () => {
    try {

      setLoading(true);

      setError("");

      const response =
        await notificationApi.getNotifications({
          search,
          filter,
        });

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

  useEffect(() => {
    const timer = setTimeout(() => {
      loadNotifications();
    }, 400);

    return () => clearTimeout(timer);

  }, [search, filter]);

  const markAsRead = async (id) => {
    try {

      await notificationApi.markAsRead(id);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                is_read: true,
              }
            : item
        )
      );

    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id) => {
    try {

      await notificationApi.deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {
      console.error(err);
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

  if (loading) {
    return (
      <Loading
        text="Loading notifications..."
        height="h-[600px]"
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
        message="No notifications available."
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

            <Bell className="text-cyan-400"/>

            Notifications

          </h1>

          <p className="mt-2 text-slate-400">
            Manage all security notifications.
          </p>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={loadNotifications}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
          >
            <RefreshCw size={18}/>
            Refresh
          </button>

          <button
            onClick={markAllRead}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-500"
          >
            <CheckCheck size={18}/>
            Mark All Read
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-2">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <input
            type="text"
            placeholder="Search notification..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
          />

        </div>

        <div className="relative">

          <Filter
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />

          <select
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>

        </div>

      </div>

      {/* Notification List */}

      <div className="space-y-4">        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-xl border p-5 transition ${
              notification.is_read
                ? "border-slate-700 bg-[#111827]"
                : "border-cyan-500/40 bg-cyan-500/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <h3 className="text-lg font-semibold text-white">
                    {notification.title}
                  </h3>

                  {!notification.is_read && (
                    <span className="rounded-full bg-cyan-500 px-2 py-1 text-xs font-semibold text-white">
                      NEW
                    </span>
                  )}

                </div>

                <p className="mt-2 text-slate-400">
                  {notification.message}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">

                  <span>
                    {notification.type || "General"}
                  </span>

                  <span>
                    {notification.created_at || "-"}
                  </span>

                </div>

              </div>

              <div className="flex flex-col gap-2">

                {!notification.is_read && (
                  <button
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm text-white transition hover:bg-green-500"
                  >
                    <CheckCheck size={16} />
                    Read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    deleteNotification(notification.id)
                  }
                  className="flex items-center gap-2 rounded-lg bg-red-600 px-3 py-2 text-sm text-white transition hover:bg-red-500"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Pagination */}

      <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-slate-700 bg-[#111827] p-4 md:flex-row">

        <p className="text-sm text-slate-400">
          Showing {notifications.length} notification
          {notifications.length !== 1 ? "s" : ""}
        </p>

        <div className="flex gap-2">

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800">
            Previous
          </button>

          <button className="rounded-lg bg-cyan-600 px-4 py-2 text-sm text-white">
            1
          </button>

          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800">
            Next
          </button>

        </div>

      </div>

    </div>
  );
};

export default Notifications;