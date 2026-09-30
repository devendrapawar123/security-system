import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Save,
  RefreshCw,
  Bell,
  Globe,
  Moon,
  Shield,
} from "lucide-react";

import settingsApi from "@/api/settingsApi";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";

const Settings = () => {
  const [settings, setSettings] = useState({
    language: "en",
    theme: "dark",
    email_notifications: true,
    browser_notifications: true,
    security_alerts: true,
    alert_before_days: 7,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await settingsApi.getSettings();

      setSettings(
        response.data ||
        response
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load settings."
      );

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setSettings((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setSaving(true);

      await settingsApi.updateSettings(
        settings
      );

    } catch (err) {

      console.error(err);

    } finally {

      setSaving(false);

    }
  };

  if (loading) {
    return (
      <Loading
        text="Loading settings..."
        height="h-[600px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadSettings}
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

            <SettingsIcon className="text-cyan-400"/>

            Settings

          </h1>

          <p className="mt-2 text-slate-400">
            Configure your Smart Security System.
          </p>

        </div>

        <button
          onClick={loadSettings}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
        >
          <RefreshCw size={18}/>
          Refresh
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Language */}

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-white">

            <Globe className="text-cyan-400"/>

            Language

          </h2>

          <select
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>

        </div>

        {/* Theme */}

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-white">

            <Moon className="text-cyan-400"/>

            Theme

          </h2>

          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          >
            <option value="dark">
              Dark
            </option>

            <option value="light">
              Light
            </option>

          </select>

        </div>

        {/* Notifications */}

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-white">

            <Bell className="text-cyan-400"/>

            Notifications

          </h2>          <div className="space-y-5">

            <label className="flex items-center justify-between">

              <div>

                <p className="font-medium text-white">
                  Email Notifications
                </p>

                <p className="text-sm text-slate-400">
                  Receive security alerts by email.
                </p>

              </div>

              <input
                type="checkbox"
                name="email_notifications"
                checked={settings.email_notifications}
                onChange={handleChange}
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

            <label className="flex items-center justify-between">

              <div>

                <p className="font-medium text-white">
                  Browser Notifications
                </p>

                <p className="text-sm text-slate-400">
                  Show real-time browser alerts.
                </p>

              </div>

              <input
                type="checkbox"
                name="browser_notifications"
                checked={settings.browser_notifications}
                onChange={handleChange}
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

          </div>

        </div>

        {/* Security */}

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

          <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-white">

            <Shield className="text-cyan-400" />

            Security

          </h2>

          <div className="space-y-5">

            <label className="flex items-center justify-between">

              <div>

                <p className="font-medium text-white">
                  Security Alerts
                </p>

                <p className="text-sm text-slate-400">
                  Notify when suspicious activity is detected.
                </p>

              </div>

              <input
                type="checkbox"
                name="security_alerts"
                checked={settings.security_alerts}
                onChange={handleChange}
                className="h-5 w-5 accent-cyan-500"
              />

            </label>

            <div>

              <label className="mb-2 block text-sm font-medium text-white">
                Alert Before (Days)
              </label>

              <input
                type="number"
                min="1"
                max="90"
                name="alert_before_days"
                value={settings.alert_before_days}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
              />

            </div>

          </div>

        </div>

        {/* Save */}

        <div className="flex justify-end">

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Settings"}

          </button>

        </div>

      </form>

    </div>
  );
};

export default Settings;