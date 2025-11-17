import React from "react";

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

  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className={`${className}`} style={{ height }}>
      <div className="flex items-end justify-between h-full gap-2">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 80; // 80% of container height

          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="flex-1 flex flex-col justify-end relative group">
                {showValues && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {item.value.toLocaleString()}
                  </div>
                )}
                <div
                  className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                  style={{
                    backgroundColor: color,
                    height: `${barHeight}%`,
                    minHeight: item.value > 0 ? "4px" : "0",
                  }}
                ></div>
              </div>

              <div className="mt-2 text-xs text-center text-slate-600 dark:text-slate-400">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
