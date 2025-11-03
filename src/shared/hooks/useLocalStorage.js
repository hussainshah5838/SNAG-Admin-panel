import { useEffect, useState } from "react";

/**
 * Persisted state with JSON serialization. Safe for SSR/No-Storage environments.
 * @param {string} key
 * @param {any} initial
 */
export default function useLocalStorage(key, initial) {
  const read = () => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  };

  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    return read();
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore write errors (e.g., storage full or disabled), but log in non-production for debugging.
      if (
        typeof globalThis !== "undefined" &&
        globalThis.process &&
        globalThis.process.env &&
        globalThis.process.env.NODE_ENV !== "production"
      ) {
        console.error("Failed to write to localStorage:", error);
      }
    }
  }, [key, value]);

  return [value, setValue];
}
