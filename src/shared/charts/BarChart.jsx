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
  return (
    <div className={`${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="dark:stroke-slate-700" />
          <XAxis dataKey="label" tick={{ fill: '#64748b' }} />
          <YAxis tick={{ fill: '#64748b' }} />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Bar dataKey="value" fill={color} radius={[6,6,0,0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} />
            ))}
            {showValues && <LabelList dataKey="value" position="top" formatter={(v)=>v.toLocaleString()} />}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
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
