import React from "react";

export default function SkeletonRow({ lines = 1 }) {
  return (
    <div className="animate-pulse space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="h-3 rounded bg-slate-200 dark:bg-slate-800" />
      ))}
    </div>
  );
}
