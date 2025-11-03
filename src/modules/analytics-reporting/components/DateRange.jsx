import React, { useState } from "react";

export default function DateRange() {
  const today = new Date().toISOString().slice(0, 10);
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState(today);

  return (
    <div className="flex items-center gap-2">
      <input
        type="date"
        className="input h-9"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <span className="muted text-sm">to</span>
      <input
        type="date"
        className="input h-9"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
    </div>
  );
}
