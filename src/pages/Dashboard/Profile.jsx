import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Shield,
  Camera,
  Save,
  RefreshCw,
} from "lucide-react";

import authApi from "@/api/authApi";

import Loading from "@/components/common/Loading";
import ErrorState from "@/components/common/ErrorState";

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await authApi.getProfile();

      setProfile(
        response.data ||
        response
      );

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Unable to load profile."
      );

    } finally {

      setLoading(false);

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      setSaving(true);

      await authApi.updateProfile(profile);

    } catch (err) {

      console.error(err);

    } finally {

      setSaving(false);

    }
  };

  if (loading) {
    return (
      <Loading
        text="Loading profile..."
        height="h-[600px]"
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error}
        onRetry={loadProfile}
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold text-white">

            <User className="text-cyan-400" />

            My Profile

          </h1>

          <p className="mt-2 text-slate-400">
            Manage your account information.
          </p>

        </div>

        <button
          onClick={loadProfile}
          className="flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 lg:grid-cols-3"
      >

        {/* Avatar */}

        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

          <div className="flex flex-col items-center">

            <img
              src={
                profile.avatar ||
                "/images/avatar.png"
              }
              alt="Profile"
              className="h-32 w-32 rounded-full border-4 border-cyan-500 object-cover"
            />

            <button
              type="button"
              className="mt-4 flex items-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-500"
            >
              <Camera size={18} />
              Change Photo
            </button>

            <div className="mt-6 text-center">

              <h3 className="text-xl font-semibold text-white">
                {profile.first_name} {profile.last_name}
              </h3>

              <p className="mt-2 text-slate-400">
                {profile.role || "User"}
              </p>

            </div>

          </div>

        </div>

        {/* Profile Form */}

        <div className="space-y-6 lg:col-span-2">

          <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

            <h2 className="mb-6 text-xl font-semibold text-white">
              Personal Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">              {/* First Name */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                  <User size={16} />
                  First Name
                </label>

                <input
                  type="text"
                  name="first_name"
                  value={profile.first_name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />

              </div>

              {/* Last Name */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                  <User size={16} />
                  Last Name
                </label>

                <input
                  type="text"
                  name="last_name"
                  value={profile.last_name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                  <Mail size={16} />
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />

              </div>

              {/* Phone */}

              <div>

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                  <Phone size={16} />
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-cyan-500"
                />

              </div>

              {/* Role */}

              <div className="md:col-span-2">

                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                  <Shield size={16} />
                  Role
                </label>

                <input
                  type="text"
                  value={profile.role || "User"}
                  readOnly
                  className="w-full cursor-not-allowed rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-slate-400"
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
                : "Save Changes"}

            </button>

          </div>

        </div>

      </form>

    </div>
  );
};

export default Profile;