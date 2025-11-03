import React from "react";
import ChartArea from "./ChartArea";

/**
 * KPI card with mini trend.
 */
export default function StatCard({ title, value, delta, data = [] }) {
  const deltaColor =
    delta > 0
      ? "text-emerald-600 dark:text-emerald-300"
      : delta < 0
      ? "text-rose-600 dark:text-rose-300"
      : "muted";

  return (
    <div className="card p-4">
      <div className="muted text-xs">{title}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      <div className={`mt-1 text-sm ${deltaColor}`}>
        {delta > 0 ? "▲" : delta < 0 ? "▼" : "•"} {Math.abs(delta)}%
      </div>
      {data.length > 1 && (
        <div className="mt-3 -mb-2">
          <ChartArea data={data} height={80} />
        </div>
      )}
    </div>
  );
}
