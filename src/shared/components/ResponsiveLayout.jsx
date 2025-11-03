import React from "react";

// Responsive container for module pages
export function ResponsiveContainer({ children, className = "" }) {
  return (
    <div className={`w-full max-w-none overflow-x-auto ${className}`}>
      {children}
    </div>
  );
}

// Responsive grid for cards/items
export function ResponsiveGrid({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

// Responsive table wrapper
export function ResponsiveTable({ children, className = "" }) {
  return (
    <div
      className={`table-container overflow-x-auto -mx-3 sm:mx-0 ${className}`}
    >
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
}

// Responsive form layout
export function ResponsiveForm({ children, className = "" }) {
  return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>{children}</div>
  );
}

// Responsive form grid
export function ResponsiveFormGrid({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

// Responsive button group
export function ResponsiveButtonGroup({ children, className = "" }) {
  return (
    <div className={`flex flex-col sm:flex-row gap-2 sm:gap-3 ${className}`}>
      {children}
    </div>
  );
}

// Responsive stats grid
export function ResponsiveStats({ children, className = "" }) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

// Mobile-friendly page header
export function ResponsivePageHeader({ title, subtitle, actions, children }) {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export default {
  ResponsiveContainer,
  ResponsiveGrid,
  ResponsiveTable,
  ResponsiveForm,
  ResponsiveFormGrid,
  ResponsiveButtonGroup,
  ResponsiveStats,
  ResponsivePageHeader,
};
