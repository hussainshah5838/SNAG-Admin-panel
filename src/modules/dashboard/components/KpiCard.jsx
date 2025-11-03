import React from "react";

export default function KpiCard({
  title = "—",
  value = "—",
  delta = 0,
  loading,
}) {
  return (
    <div className="card p-4">
      {loading ? (
        <div className="animate-pulse">
          <div className="h-3 w-24 bg-slate-200/50 rounded mb-3"></div>
          <div className="h-8 w-32 bg-slate-200/70 rounded"></div>
        </div>
      ) : (
        <>
          <div className="text-sm text-slate-500">{title}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
          <div
            className={`mt-1 text-xs ${
              delta >= 0 ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {delta >= 0 ? "▲" : "▼"} {Math.abs(delta)}%
          </div>
        </>
      )}
    </div>
  );
}
