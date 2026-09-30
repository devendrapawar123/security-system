import { useState } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Save,
} from "lucide-react";

import authApi from "@/api/authApi";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.current_password) {
      return setError("Current password is required.");
    }

    if (!formData.new_password) {
      return setError("New password is required.");
    }

    if (formData.new_password.length < 8) {
      return setError(
        "Password must be at least 8 characters."
      );
    }

    if (
      formData.new_password !==
      formData.confirm_password
    ) {
      return setError(
        "Confirm password does not match."
      );
    }

    try {
      setLoading(true);

      await authApi.changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
        confirm_password: formData.confirm_password,
      });

      setSuccess(
        "Password changed successfully."
      );

      setFormData({
        current_password: "",
        new_password: "",
        confirm_password: "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-slate-700 bg-[#111827] p-8">

      <h1 className="mb-2 text-3xl font-bold text-white">
        Change Password
      </h1>

      <p className="mb-8 text-slate-400">
        Update your account password securely.
      </p>

      {success && (
        <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-green-400">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >        {/* Current Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Current Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type={showPassword.current ? "text" : "password"}
              name="current_password"
              value={formData.current_password}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() => togglePassword("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword.current ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            New Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type={showPassword.new ? "text" : "password"}
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() => togglePassword("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword.new ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Confirm New Password
          </label>

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <input
              type={showPassword.confirm ? "text" : "password"}
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-12 text-white outline-none focus:border-cyan-500"
            />

            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword.confirm ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Updating...
              </>
            ) : (
              <>
                <Save size={18} />
                Change Password
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ChangePassword;