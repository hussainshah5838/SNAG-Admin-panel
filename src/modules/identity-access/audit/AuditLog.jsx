import React from "react";

export default function AuditLog() {
  const rows = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    time: new Date(Date.now() - i * 36e5).toLocaleString(),
    actor: ["Alice", "Bob", "Carol", "Dave"][i % 4],
    action: [
      "created user",
      "updated deal",
      "deleted retailer",
      "exported report",
    ][i % 4],
  }));
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-slate-500">
            <th className="px-4 py-3">Time</th>
            <th className="px-4 py-3">Actor</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-200/60">
              <td className="px-4 py-3">{r.time}</td>
              <td className="px-4 py-3">{r.actor}</td>
              <td className="px-4 py-3">{r.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
