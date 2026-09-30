import { useNavigate } from "react-router-dom";
import {
  Camera,
  Shield,
  FileText,
  Settings,
  Bell,
  Users,
  Activity,
  Lock,
} from "lucide-react";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Live Camera",
      description: "Monitor live security cameras",
      icon: Camera,
      color: "bg-blue-500/10 text-blue-400",
      route: "/camera",
    },
    {
      title: "Intruder Detection",
      description: "View detected intruders",
      icon: Shield,
      color: "bg-red-500/10 text-red-400",
      route: "/intruders",
    },
    {
      title: "Activity Logs",
      description: "System activity history",
      icon: Activity,
      color: "bg-green-500/10 text-green-400",
      route: "/activity",
    },
    {
      title: "Reports",
      description: "Generate PDF & CSV reports",
      icon: FileText,
      color: "bg-purple-500/10 text-purple-400",
      route: "/reports",
    },
    {
      title: "Notifications",
      description: "Security notifications",
      icon: Bell,
      color: "bg-yellow-500/10 text-yellow-400",
      route: "/notifications",
    },
    {
      title: "Users",
      description: "Manage system users",
      icon: Users,
      color: "bg-cyan-500/10 text-cyan-400",
      route: "/users",
    },
    {
      title: "Sessions",
      description: "Manage active sessions",
      icon: Lock,
      color: "bg-orange-500/10 text-orange-400",
      route: "/sessions",
    },
    {
      title: "Settings",
      description: "Application settings",
      icon: Settings,
      color: "bg-pink-500/10 text-pink-400",
      route: "/settings",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-700 bg-[#111827] p-6">

      <div className="mb-6">

        <h2 className="text-xl font-bold text-white">
          Quick Actions
        </h2>

        <p className="text-sm text-slate-400">
          Frequently used system actions
        </p>

      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.route)}
              className="group rounded-xl border border-slate-700 bg-slate-900/40 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500 hover:bg-slate-800"
            >
              <div
                className={`mb-4 inline-flex rounded-xl p-3 ${action.color}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="text-lg font-semibold text-white transition group-hover:text-cyan-400">
                {action.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {action.description}
              </p>

              <div className="mt-5 flex items-center text-sm font-medium text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                Open
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;