import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Building2,
  Target,
  DollarSign,
} from "lucide-react";

const ICONS = {
  users: Users,
  merchants: Building2,
  offers: Target,
  redemptions: Target,
  revenue: DollarSign,
};

/**
 * Reusable stats card component for dashboard metrics
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main value to display
 * @param {number} props.trend - Trend percentage (positive = up, negative = down)
 * @param {string} props.period - Time period label
 * @param {string} props.icon - Icon type (users, merchants, offers, redemptions, revenue)
 * @param {string} props.trendColor - Custom trend color
 * @param {boolean} props.loading - Loading state
 */
export default function StatsCard({
  title,
  value,
  trend,
  period = "vs Last Month",
  icon = "users",
  trendColor,
  loading = false,
  className = "",
}) {
  if (loading) {
    return (
      <div className={`card p-4 animate-pulse ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
          <div>
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-20 mb-2"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
          </div>
        </div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
        <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
      </div>
    );
  }

  const IconComponent = ICONS[icon] || ICONS.users;
  const isPositive = trend > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  const getTrendColor = () => {
    if (trendColor) return trendColor;
    return isPositive ? "text-emerald-600" : "text-rose-600";
  };

  const getIconBg = () => {
    switch (icon) {
      case "users":
        return "bg-blue-100 dark:bg-blue-900/20";
      case "merchants":
        return "bg-purple-100 dark:bg-purple-900/20";
      case "offers":
        return "bg-amber-100 dark:bg-amber-900/20";
      case "redemptions":
        return "bg-emerald-100 dark:bg-emerald-900/20";
      case "revenue":
        return "bg-green-100 dark:bg-green-900/20";
      default:
        return "bg-slate-100 dark:bg-slate-700";
    }
  };

  const getIconColor = () => {
    switch (icon) {
      case "users":
        return "text-blue-600 dark:text-blue-400";
      case "merchants":
        return "text-purple-600 dark:text-purple-400";
      case "offers":
        return "text-amber-600 dark:text-amber-400";
      case "redemptions":
        return "text-emerald-600 dark:text-emerald-400";
      case "revenue":
        return "text-green-600 dark:text-green-400";
      default:
        return "text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <div className={`card p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconBg()}`}
        >
          <IconComponent className={`w-5 h-5 ${getIconColor()}`} />
        </div>
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-sm">
        <TrendIcon className={`w-4 h-4 ${getTrendColor()}`} />
        <span className={getTrendColor()}>{Math.abs(trend)}%</span>
        <span className="text-slate-500 dark:text-slate-400">{period}</span>
      </div>
    </div>
  );
}
