import React from "react";
import SkeletonRow from "../../../../shared/components/SkeletonRow";

export default function UsersTable({ rows = [], loading, onEdit, onDelete }) {
  return (
    <div className="card overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left text-sm text-slate-500">
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 w-40">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <SkeletonRow key={i} cols={5} />
            ))}
          {!loading &&
            rows.map((r) => (
              <tr key={r.id} className="border-t border-slate-200/60">
                <td className="px-4 py-3">{r.name}</td>
                <td className="px-4 py-3">{r.email}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-xs bg-slate-100">
                    {r.role}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      r.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="btn-ghost" onClick={() => onEdit(r)}>
                      Edit
                    </button>
                    <button
                      className="btn-ghost text-rose-600"
                      onClick={() => onDelete(r)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
