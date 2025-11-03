import React, { useMemo, useState } from "react";

/**
 * Generic data table with client-side sort and basic empty/skeleton states.
 * props:
 *  - columns: [{ key, header, render?, className? }]
 *  - rows: array
 *  - rowKey?: string | (row)=>string
 *  - onRowClick?: (row)=>void
 *  - empty?: ReactNode
 */
export default function DataTable({
  columns = [],
  rows = [],
  rowKey = "id",
  onRowClick,
  className = "",
  empty = <div className="muted text-sm">No data.</div>,
}) {
  const [sort, setSort] = useState({ key: null, dir: "asc" });

  const sortRows = useMemo(() => {
    if (!sort.key) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av === bv) return 0;
      if (av > bv) return sort.dir === "asc" ? 1 : -1;
      return sort.dir === "asc" ? -1 : 1;
    });
    return copy;
  }, [rows, sort]);

  const getKey = (r, i) =>
    typeof rowKey === "function" ? rowKey(r) : r?.[rowKey] ?? i;

  const toggleSort = (key) => {
    setSort((s) => {
      if (s.key !== key) return { key, dir: "asc" };
      return { key, dir: s.dir === "asc" ? "desc" : "asc" };
    });
  };

  return (
    <div className={`card overflow-hidden ${className}`}>
      {/* Mobile view - stacked cards */}
      <div className="block md:hidden">
        {sortRows.length === 0 ? (
          <div className="px-4 py-6 text-center">{empty}</div>
        ) : (
          <div className="divide-y" style={{ borderColor: "var(--line)" }}>
            {sortRows.map((r, i) => (
              <div
                key={getKey(r, i)}
                className="p-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/40 cursor-pointer"
                onClick={onRowClick ? () => onRowClick(r) : undefined}
              >
                {columns.map((c) => (
                  <div
                    key={c.key}
                    className="flex justify-between items-center py-1"
                  >
                    <span className="font-medium text-sm muted">
                      {c.header}:
                    </span>
                    <span className="text-sm">
                      {c.render ? c.render(r) : String(r[c.key] ?? "")}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop view - table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900/40">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className={`text-left font-semibold px-4 py-3 whitespace-nowrap ${
                    c.className || ""
                  }`}
                >
                  <button
                    type="button"
                    className="inline-flex items-center gap-1"
                    onClick={() => toggleSort(c.key)}
                    title="Sort"
                  >
                    <span>{c.header}</span>
                    {sort.key === c.key && (
                      <span className="muted">
                        {sort.dir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-6 text-center">
                  {empty}
                </td>
              </tr>
            ) : (
              sortRows.map((r, i) => (
                <tr
                  key={getKey(r, i)}
                  className={`border-t hover:bg-slate-50/70 dark:hover:bg-slate-800/40 ${
                    onRowClick ? "cursor-pointer" : ""
                  }`}
                  style={{ borderColor: "var(--line)" }}
                  onClick={onRowClick ? () => onRowClick(r) : undefined}
                >
                  {columns.map((c) => (
                    <td
                      key={c.key}
                      className={`px-4 py-3 ${c.className || ""}`}
                    >
                      {c.render ? c.render(r) : String(r[c.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
