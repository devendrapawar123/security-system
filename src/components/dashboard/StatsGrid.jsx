import {
  Users,
  Monitor,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Total Users",
    value: 0,
    icon: Users,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  {
    id: 2,
    title: "Active Sessions",
    value: 0,
    icon: Monitor,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  {
    id: 3,
    title: "Today's Alerts",
    value: 0,
    icon: ShieldAlert,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  {
    id: 4,
    title: "Intruders",
    value: 0,
    icon: ShieldCheck,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
];

const StatsGrid = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className={`rounded-2xl border ${item.border} bg-[#111827] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-400">
                  {item.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {item.value}
                </h2>

              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.bg}`}
              >
                <Icon
                  className={item.color}
                  size={28}
                />
              </div>

            </div>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-500"
                style={{ width: "65%" }}
              />
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Live dashboard statistics </p>
                      </div>
        );
      })}

    </section>
  );
};

export default StatsGrid;