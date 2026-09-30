import { Loader2 } from "lucide-react";

const Loading = ({
  text = "Loading...",
  height = "h-64",
  fullScreen = false,
}) => {
  return (
    <div
      className={`
        flex items-center justify-center
        ${fullScreen ? "fixed inset-0 z-50 bg-[#030712]" : ""}
        ${height}
      `}
    >
      <div className="flex flex-col items-center gap-4">

        <Loader2
          className="animate-spin text-cyan-500"
          size={42}
        />

        <p className="text-slate-400">
          {text}
        </p>

      </div>
    </div>
  );
};

export default Loading;