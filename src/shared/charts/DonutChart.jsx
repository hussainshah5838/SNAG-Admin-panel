import React from "react";
import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

/**
 * Reusable donut chart component using CSS and SVG
 * @param {Object} props
 * @param {Array} props.data - Array of {label, value, color} objects
 * @param {number} props.size - Chart size in pixels
 * @param {number} props.strokeWidth - Donut thickness
 * @param {boolean} props.showLegend - Show legend
 * @param {boolean} props.showPercentages - Show percentages in legend
 * @param {boolean} props.loading - Loading state
 */
export default function DonutChart({
  data = [],
  size = 200,
  strokeWidth = 30,
  showLegend = true,
  showPercentages = true,
  loading = false,
  className = "",
}) {
  if (loading) {
    return (
      <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="animate-pulse">
          <div
            className="rounded-full bg-slate-200 dark:bg-slate-700"
            style={{ width: size, height: size }}
          ></div>
        </div>
        {showLegend && (
          <div className="space-y-2 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-2 animate-pulse">
                <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded flex-1"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativePercentage = 0;
  const segments = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const strokeDasharray = `${
      (percentage / 100) * circumference
    } ${circumference}`;
    const strokeDashoffset = -((cumulativePercentage / 100) * circumference);

    cumulativePercentage += percentage;

    return {
      ...item,
      percentage,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  return (
    <div className={`${className}`} style={{ width: "100%", height: size }}>
      <ResponsiveContainer>
        <RePieChart>
          <Pie
            data={segments}
            dataKey="value"
            innerRadius={size / 2 - strokeWidth}
            outerRadius={size / 2}
            paddingAngle={2}
            stroke="none"
            label={false}
          >
            {segments.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}`} />
          {showLegend && <Legend verticalAlign="bottom" />}
        </RePieChart>
      </ResponsiveContainer>

      {/* Custom legend below for percentages if desired */}
      {showLegend && (
        <div className="space-y-2 w-full mt-3">
          {segments.map((segment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: segment.color }}
                ></div>
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {segment.label}
                </span>
              </div>
              {showPercentages && (
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {total ? ((segment.value / total) * 100).toFixed(0) : 0}%
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
