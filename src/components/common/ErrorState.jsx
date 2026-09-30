import { AlertTriangle, RefreshCw } from "lucide-react";

const ErrorState = ({
  title = "Something went wrong",
  message = "Unable to load data.",
  onRetry,
}) => {
  return (
    <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-red-800 bg-red-950/20 p-8">

      <AlertTriangle
        size={50}
        className="text-red-500"
      />

      <h2 className="mt-4 text-xl font-bold text-white">
        {title}
      </h2>

      <p className="mt-2 text-center text-slate-400">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-500"
        >
          <RefreshCw size={18} />
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorState;