import React from "react";

export default function TrendSpark({ series = [], loading }) {
  if (loading) {
    return <div className="h-48 animate-pulse bg-slate-100 rounded" />;
  }
  // simple, dependency-free spark area using SVG
  const W = 900,
    H = 180,
    P = 8;
  const max = Math.max(...series, 1),
    min = Math.min(...series, 0);
  const pts = series.map((v, i) => {
    const x = P + (i / Math.max(series.length - 1, 1)) * (W - P * 2);
    const y = P + (1 - (v - min) / Math.max(max - min || 1, 1)) * (H - P * 2);
    return `${x},${y}`;
  });

  return (
    <div className="overflow-x-auto">
      <svg
        width={W}
        height={H}
        className="rounded bg-linear-to-b from-slate-50 to-white dark:from-slate-900/40 dark:to-slate-900/20"
      >
        <polyline
          points={pts.join(" ")}
          fill="none"
          stroke="currentColor"
          className="text-indigo-500"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
