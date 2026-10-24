/**
 * Safe local storage wrappers with JSON serialization and graceful fallbacks.
 */

function isLocalStorageAvailable() {
  if (typeof window === "undefined" || !window.localStorage) {
    return false;
  }
  return typeof window.localStorage.getItem === "function" && typeof window.localStorage.setItem === "function";
}

/**
 * Safely retrieves and parses an item from localStorage.
 *
 * @param {string} key
 * @param {*} defaultValue
 * @returns {*}
 */
export function safeGet(key, defaultValue) {
  if (!isLocalStorageAvailable()) {
    return defaultValue;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) {
      return defaultValue;
    }
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

/**
 * Safely serializes and saves an item to localStorage.
 *
 * @param {string} key
 * @param {*} value
 * @returns {boolean} whether saving succeeded
 */
export function safeSet(key, value) {
  if (!isLocalStorageAvailable()) {
    return false;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely removes an item from localStorage.
 *
 * @param {string} key
 */
export function safeRemove(key) {
  if (!isLocalStorageAvailable()) {
    return;
  }
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Graceful fallback
  }
}
