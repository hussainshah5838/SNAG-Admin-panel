import React from "react";
import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

/**

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
    <div className={`${className}`} style={{ width: "100%", height: "100%" }}>
      <div className="flex flex-col md:flex-row items-stretch gap-4 h-full">
        {/* Chart area: centered and responsive */}
        <div
          className="flex items-center justify-center w-full md:w-1/2"
          style={{ minHeight: 0 }}
        >
          <div
            style={{
              width: size,
              height: size,
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={segments}
                  dataKey="value"
                  nameKey="label"
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={2}
                  stroke="none"
                  label={false}
                >
                  {segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value}`}
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
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend area: stacked and scrollable on small heights */}
        {showLegend && (
          <div className="w-full md:w-1/2 overflow-auto">
            <div className="space-y-2">
              {segments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: segment.color }}
                    ></div>
                    <span className="text-sm" style={{ color: "var(--text)" }}>
                      {segment.label}
                    </span>
                  </div>
                  {showPercentages && (
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--text)" }}
                    >
                      {total ? ((segment.value / total) * 100).toFixed(0) : 0}%
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
