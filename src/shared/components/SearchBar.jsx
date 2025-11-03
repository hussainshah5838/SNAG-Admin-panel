import React, { useEffect, useState } from "react";

export default function SearchBar({ placeholder = "Search…", onSearch }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => onSearch?.(q.trim()), 300);
    return () => clearTimeout(t);
  }, [q, onSearch]);

  return (
    <div className="flex items-center w-full max-w-lg card px-3 py-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />
      {q && (
        <button className="muted text-sm" onClick={() => setQ("")}>
          clear
        </button>
      )}
    </div>
  );
}
