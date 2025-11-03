import React from "react";

export default function Heatmap({ loading }) {
  if (loading)
    return <div className="h-64 animate-pulse bg-slate-100 rounded" />;

  // lightweight grid heatmap (no libs)
  const grid = Array.from({ length: 7 }, () =>
    Array.from({ length: 24 }, () => Math.random())
  );

  return (
    <div className="overflow-x-auto">
      <div className="grid grid-cols-24 gap-1">
        {grid.flat().map((v, idx) => (
          <div
            key={idx}
            className="h-6 rounded"
            style={{
              background: `rgba(99,102,241,${0.15 + v * 0.65})`,
            }}
            title={`${(v * 100).toFixed(0)} score`}
          />
        ))}
      </div>
    </div>
  );
}
