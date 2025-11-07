import React from "react";

export default function RolesPage() {
  // Roles have been removed from the UI per request.
  // We render a minimal card indicating the list is empty.
  return (
    <div className="card p-4">
      <h3 className="font-semibold mb-3">Roles & Permissions</h3>
      <div className="muted text-sm p-6">No roles available.</div>
    </div>
  );
}
