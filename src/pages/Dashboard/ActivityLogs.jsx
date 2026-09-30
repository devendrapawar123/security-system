import {
  FaClipboardList,
  FaSearch,
  FaFilter,
  FaDownload,
} from "react-icons/fa";

function ActivityLogs() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Activity Logs
          </h1>

          <p className="text-slate-500">
            Monitor all security and user activities in real time.
          </p>

        </div>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 shadow hover:bg-slate-100">

            <FaDownload />

            Export

          </button>

        </div>

      </div>

      {/* Search & Filter */}

      <div className="rounded-2xl bg-white p-5 shadow">

        <div className="grid gap-4 md:grid-cols-3">

          <div className="relative">

            <FaSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search activity..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-blue-500"
            />

          </div>

          <select className="rounded-xl border border-slate-300 p-3">

            <option>All Activities</option>
            <option>Login</option>
            <option>Logout</option>
            <option>Intruder</option>
            <option>Screen Lock</option>

          </select>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white hover:bg-blue-700">

            <FaFilter />

            Apply Filter

          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow">

        <div className="flex items-center gap-3 border-b p-5">

          <FaClipboardList className="text-blue-600" />

          <h2 className="text-xl font-semibold">
            Recent Activities
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left">User</th>

                <th className="px-6 py-4 text-left">Event</th>

                <th className="px-6 py-4 text-left">Description</th>

                <th className="px-6 py-4 text-left">IP Address</th>

                <th className="px-6 py-4 text-left">Time</th>

                <th className="px-6 py-4 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t hover:bg-slate-50">

                <td className="px-6 py-4">Devendra</td>

                <td className="px-6 py-4">Login</td>

                <td className="px-6 py-4">User logged into system</td>

                <td className="px-6 py-4">192.168.1.5</td>

                <td className="px-6 py-4">10:15 AM</td>

                <td className="px-6 py-4">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Success
                  </span>

                </td>

              </tr>

              <tr className="border-t hover:bg-slate-50">

                <td className="px-6 py-4">Admin</td>

                <td className="px-6 py-4">Intruder</td>

                <td className="px-6 py-4">Unknown face detected</td>

                <td className="px-6 py-4">192.168.1.8</td>

                <td className="px-6 py-4">10:22 AM</td>

                <td className="px-6 py-4">

                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                    Alert
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default ActivityLogs;