import React from "react";
import {
  ResponsiveContainer,
  LineChart as ReLineChart,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

/**
 * Reusable line chart component using SVG
 * @param {Object} props
 * @param {Array} props.data - Array of {label, value} objects
 * @param {string} props.color - Line color
 * @param {string} props.fillColor - Fill area color (optional)
 * @param {number} props.height - Chart height
 * @param {boolean} props.showDots - Show data points
 * @param {boolean} props.showArea - Fill area under line
 * @param {boolean} props.loading - Loading state
 */
export default function LineChart({
  data = [],
  color = "#3b82f6",
  fillColor = "rgba(59, 130, 246, 0.1)",
  height = 300,
  showDots = true,
  showArea = true,
  loading = false,
  className = "",
}) {
  if (loading) {
    return (
      <div className={`animate-pulse ${className}`} style={{ height }}>
        <div className="bg-slate-200 dark:bg-slate-700 rounded w-full h-full"></div>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div
        className={`flex items-center justify-center text-slate-500 ${className}`}
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  // Responsive container handles sizing; no fixed width required here.

  return (
    <div className={`${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReLineChart
          data={data}
          margin={{ top: 10, right: 16, left: 0, bottom: 20 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            className="dark:stroke-slate-700"
          />
          <XAxis dataKey="label" tick={{ fill: "#64748b" }} />
          <YAxis tick={{ fill: "#64748b" }} />
          <Tooltip
            formatter={(value) => value.toLocaleString()}
            contentStyle={{
              backgroundColor: "var(--card)",
              border: "1px solid var(--line)",
              color: "var(--text)",
              boxShadow: "0 6px 18px rgba(2,6,23,0.35)",
              borderRadius: 8,
            }}
            itemStyle={{ color: "var(--text)" }}
            labelStyle={{ color: "var(--muted)" }}
            wrapperStyle={{ zIndex: 1000 }}
          />
          {showArea && (
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={fillColor}
              fillOpacity={0.25}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            dot={showDots}
            strokeWidth={2}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}
