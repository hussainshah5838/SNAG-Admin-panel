import React from "react";

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

  const width = 400; // Fixed width, can be made responsive
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = Math.max(...data.map((item) => item.value));
  const minValue = Math.min(...data.map((item) => item.value));
  const valueRange = maxValue - minValue || 1;

  // Calculate points
  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * chartWidth;
    const y =
      padding +
      chartHeight -
      ((item.value - minValue) / valueRange) * chartHeight;
    return { x, y, ...item };
  });

  // Create path string for line
  const pathData = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  // Create area path (for fill)
  const areaPathData = showArea
    ? `${pathData} L ${points[points.length - 1].x} ${
        padding + chartHeight
      } L ${padding} ${padding + chartHeight} Z`
    : "";

  return (
    <div className={`${className}`}>
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid lines */}
        <defs>
          <pattern
            id="grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
              className="dark:stroke-slate-700"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />

        {/* Area fill */}
        {showArea && <path d={areaPathData} fill={fillColor} opacity="0.3" />}

        {/* Line */}
        <path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {showDots &&
          points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
              stroke="white"
              strokeWidth="2"
              className="hover:r-6 transition-all duration-200"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          ))}

        {/* X-axis labels */}
        {points.map((point, index) => (
          <text
            key={index}
            x={point.x}
            y={height - 10}
            textAnchor="middle"
            className="text-xs fill-slate-500 dark:fill-slate-400"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}
