import React from "react";
import {
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts";

/**
 * Reusable bar chart component
 * @param {Object} props
 * @param {Array} props.data - Array of {label, value} objects
 * @param {string} props.color - Bar color
 * @param {number} props.height - Chart height
 * @param {boolean} props.showValues - Show values on bars
 * @param {boolean} props.loading - Loading state
 */
export default function BarChart({
  data = [],
  color = "#3b82f6",
  height = 300,
  showValues = false,
  loading = false,
  className = "",
}) {
  if (loading) {
    return (
      <div className={`animate-pulse ${className}`} style={{ height }}>
        <div className="flex items-end justify-between h-full gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex-1 flex flex-col">
              <div
                className="bg-slate-200 dark:bg-slate-700 rounded-t w-full"
                style={{ height: `${20 + Math.random() * 60}%` }}
              ></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || !data.length) {
    return (
      <div
        className={`flex items-center justify-center text-slate-500 ${className}`}
        style={{ height }}
      >
        No data available
      </div>
    );
  }

  return (
    <div className={`${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart
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
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
            {showValues && (
              <LabelList
                dataKey="value"
                position="top"
                formatter={(v) => v.toLocaleString()}
              />
            )}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
}
