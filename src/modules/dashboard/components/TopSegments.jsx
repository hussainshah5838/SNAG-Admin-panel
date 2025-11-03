import React from "react";

export default function TopSegments({ items = [], loading }) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 bg-slate-100 rounded animate-pulse" />
        ))}
      </div>
    );
  }
  return (
    <ul className="space-y-2">
      {items.map((s) => (
        <li key={s.id} className="flex items-center gap-3">
          <div className="w-24 text-sm text-slate-500">{s.label}</div>
          <div className="flex-1 h-2 rounded bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-indigo-500"
              style={{ width: `${s.percent}%` }}
            />
          </div>
          <div className="w-10 text-right text-sm">{s.percent}%</div>
        </li>
      ))}
    </ul>
  );
}
