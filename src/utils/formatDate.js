// ============================================
// Date Formatter
// ============================================

export const formatDate = (
  value,
  locale = "en-IN"
) => {
  if (!value) return "-";

  return new Date(value).toLocaleDateString(
    locale,
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }
  );
};

// ============================================
// Date & Time Formatter
// ============================================

export const formatDateTime = (
  value,
  locale = "en-IN"
) => {
  if (!value) return "-";

  return new Date(value).toLocaleString(
    locale,
    {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
};

// ============================================
// Time Only
// ============================================

export const formatTime = (
  value,
  locale = "en-IN"
) => {
  if (!value) return "-";

  return new Date(value).toLocaleTimeString(
    locale,
    {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );
};

// ============================================
// ISO Date
// ============================================

export const toISODate = (value) => {
  if (!value) return "";

  return new Date(value)
    .toISOString()
    .split("T")[0];
};

// ============================================
// Relative Time
// ============================================

export const timeAgo = (value) => {
  if (!value) return "-";

  const now = new Date();
  const date = new Date(value);

  const seconds = Math.floor(
    (now - date) / 1000
  );

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(
      seconds / interval.seconds
    );

    if (count >= 1) {
      return `${count} ${interval.label}${
        count > 1 ? "s" : ""
      } ago`;
    }
  }

  return "Just now";
};

// ============================================
// Today Check
// ============================================

export const isToday = (value) => {
  if (!value) return false;

  const today = new Date();
  const date = new Date(value);

  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};

// ============================================
// Yesterday Check
// ============================================

export const isYesterday = (value) => {
  if (!value) return false;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const date = new Date(value);

  return (
    yesterday.getDate() === date.getDate() &&
    yesterday.getMonth() === date.getMonth() &&
    yesterday.getFullYear() === date.getFullYear()
  );
};

// ============================================
// Date Difference
// ============================================

export const differenceInDays = (
  start,
  end
) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return Math.floor(
    (endDate - startDate) /
      (1000 * 60 * 60 * 24)
  );
};

// ============================================
// Export
// ============================================

export default {
  formatDate,
  formatDateTime,
  formatTime,
  toISODate,
  timeAgo,
  isToday,
  isYesterday,
  differenceInDays,
};