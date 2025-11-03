import React from "react";

export default function RolesPage() {
  const roles = [
    { name: "Admin", permissions: "Full access" },
    { name: "Moderator", permissions: "Manage deals, approvals, violations" },
    { name: "Retailer", permissions: "Create & manage own deals" },
    { name: "Viewer", permissions: "Read-only analytics" },
  ];
  return (
    <div className="card p-4">
      <h3 className="font-semibold mb-3">Roles & Permissions</h3>
      <ul className="space-y-2">
        {roles.map((r) => (
          <li
            key={r.name}
            className="flex items-center justify-between border rounded p-3"
          >
            <div className="font-medium">{r.name}</div>
            <div className="text-sm text-slate-500">{r.permissions}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
