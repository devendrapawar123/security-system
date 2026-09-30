import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No Data",
  message = "Nothing found.",
}) => {
  return (
    <div className="flex h-72 flex-col items-center justify-center rounded-xl border border-slate-700 bg-[#111827]">

      <Inbox
        size={54}
        className="text-slate-500"
      />

      <h2 className="mt-4 text-xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-2 text-slate-400">
        {message}
      </p>

    </div>
  );
};

export default EmptyState;