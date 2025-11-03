import React from "react";

/**
 * Super-light SVG area/line chart (no deps).
 * props: data=[numbers], height=140, stroke="currentColor"
 */
export default function ChartArea({
  data = [],
  height = 140,
  stroke = "currentColor",
  className = "",
}) {
  const H = height;
  const W = 420;
  const max = Math.max(1, ...data);
  const step = data.length > 1 ? W / (data.length - 1) : W;

  const points = data.map((v, i) => {
    const x = i * step;
    const y = H - (v / max) * (H - 8) - 4;
    return `${x},${y}`;
  });

  const path = points.join(" ");
  const fillPath = `0,${H} ${path} ${W},${H}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={`w-full ${className}`}>
      <polyline points={fillPath} fill="currentColor" opacity="0.08" />
      <polyline
        points={path}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
