import React, { useState } from "react";
import DataTable from "../../../shared/components/DataTable";
import CaseDrawer from "../components/CaseDrawer";

export default function Cases() {
  const [rows, setRows] = useState(
    Array.from({ length: 16 }).map((_, i) => ({
      id: `cs_${i + 1}`,
      subject: `Suspicious redemptions #${i + 1}`,
      status: ["open", "investigating", "closed"][i % 3],
      assignee: ["Alice", "Bob", "Carol"][i % 3],
      created: Date.now() - i * 8640000,
    }))
  );
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Cases</h3>
      <DataTable
        columns={[
          { key: "subject", header: "Subject" },
          { key: "assignee", header: "Assignee" },
          { key: "status", header: "Status" },
          {
            key: "created",
            header: "Created",
            render: (r) => new Date(r.created).toLocaleDateString(),
          },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <button className="btn-ghost" onClick={() => setOpen(r)}>
                Open
              </button>
            ),
          },
        ]}
        rows={rows}
      />
      <CaseDrawer
        open={!!open}
        caseItem={open}
        onClose={() => setOpen(null)}
        onSave={(payload) => {
          setRows((list) =>
            list.map((x) => (x.id === payload.id ? payload : x))
          );
          setOpen(null);
        }}
      />
    </div>
  );
}
  // Module removed: Cases (Trust & Safety)
  // This file has been cleared because the `trust/cases` module was removed from the app.

  export default function Cases() {
    return null;
  }
