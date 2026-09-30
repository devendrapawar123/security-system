// ============================================
// String Helpers
// ============================================

export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() +
  text.slice(1).toLowerCase();

export const capitalizeWords = (text = "") =>
  text
    .split(" ")
    .map(capitalize)
    .join(" ");

export const truncate = (
  text = "",
  length = 50
) => {
  if (text.length <= length) return text;

  return `${text.substring(0, length)}...`;
};

export const getInitials = (
  firstName = "",
  lastName = ""
) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`
    .toUpperCase();
};

// ============================================
// Number Helpers
// ============================================

export const formatNumber = (number = 0) =>
  new Intl.NumberFormat().format(number);

export const formatPercentage = (
  value = 0,
  digits = 2
) => `${Number(value).toFixed(digits)}%`;

// ============================================
// File Helpers
// ============================================

export const formatFileSize = (bytes = 0) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;

  const sizes = [
    "Bytes",
    "KB",
    "MB",
    "GB",
    "TB",
  ];

  const i = Math.floor(
    Math.log(bytes) / Math.log(k)
  );

  return `${parseFloat(
    (bytes / Math.pow(k, i)).toFixed(2)
  )} ${sizes[i]}`;
};

// ============================================
// Array Helpers
// ============================================

export const uniqueArray = (array = []) =>
  [...new Set(array)];

export const sortByKey = (
  array = [],
  key
) => {
  return [...array].sort((a, b) =>
    a[key] > b[key] ? 1 : -1
  );
};

// ============================================
// Object Helpers
// ============================================

export const isEmptyObject = (
  object = {}
) =>
  Object.keys(object).length === 0;

export const removeNullValues = (
  object = {}
) =>
  Object.fromEntries(
    Object.entries(object).filter(
      ([, value]) =>
        value !== null &&
        value !== undefined
    )
  );

// ============================================
// Clipboard
// ============================================

export const copyToClipboard = async (
  text
) => {
  try {
    await navigator.clipboard.writeText(
      text
    );
    return true;
  } catch {
    return false;
  }
};

// ============================================
// Download
// ============================================

export const downloadFile = (
  url,
  filename
) => {
  const link =
    document.createElement("a");

  link.href = url;

  link.download = filename;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
};

// ============================================
// Random ID
// ============================================

export const randomId = (
  length = 12
) => {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
};

// ============================================
// Debounce
// ============================================

export const debounce = (
  callback,
  delay = 300
) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

// ============================================
// Throttle
// ============================================

export const throttle = (
  callback,
  delay = 300
) => {
  let waiting = false;

  return (...args) => {
    if (waiting) return;

    callback(...args);

    waiting = true;

    setTimeout(() => {
      waiting = false;
    }, delay);
  };
};

// ============================================
// Sleep
// ============================================

export const sleep = (
  milliseconds = 500
) =>
  new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );

// ============================================
// Export
// ============================================

export default {
  capitalize,
  capitalizeWords,
  truncate,
  getInitials,

  formatNumber,
  formatPercentage,

  formatFileSize,

  uniqueArray,
  sortByKey,

  isEmptyObject,
  removeNullValues,

  copyToClipboard,
  downloadFile,

  randomId,

  debounce,
  throttle,

  sleep,
};