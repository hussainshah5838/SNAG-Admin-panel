import React from "react";

/**
 * Small status pill. Variants map to semantic CSS vars.
 * usage: <Badge variant="success">Active</Badge>
 */
export default function Badge({ variant = "gray", children, className = "" }) {
  const map = {
    gray: {
      bg: "bg-slate-100 dark:bg-slate-800",
      ink: "text-slate-700 dark:text-slate-200",
    },
    brand: {
      bg: "bg-[color:var(--primary)/0.12]",
      ink: "text-[color:var(--primary)]",
    },
    success: {
      bg: "bg-emerald-100 dark:bg-emerald-900/40",
      ink: "text-emerald-600 dark:text-emerald-300",
    },
    warn: {
      bg: "bg-amber-100 dark:bg-amber-900/40",
      ink: "text-amber-700 dark:text-amber-300",
    },
    danger: {
      bg: "bg-rose-100 dark:bg-rose-900/40",
      ink: "text-rose-600 dark:text-rose-300",
    },
  };
  const s = map[variant] || map.gray;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 h-6 rounded-full text-xs font-medium ${s.bg} ${s.ink} ${className}`}
    >
      {children}
    </span>
  );
}
