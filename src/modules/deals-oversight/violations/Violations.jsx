import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Violations() {
  const rows = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    deal: `Deal #${100 + i}`,
    type: ["Radius Abuse", "Duplicate", "Misleading", "Expired"][i % 4],
    reporter: ["system", "user", "moderator"][i % 3],
    ts: Date.now() - i * 7200000,
  }));

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Policy Violations</h3>
      <DataTable
        columns={[
          { key: "deal", header: "Deal" },
          { key: "type", header: "Type" },
          { key: "reporter", header: "Reported By" },
          {
            key: "ts",
            header: "Time",
            render: (r) => new Date(r.ts).toLocaleString(),
          },
        ]}
        rows={rows}
      />
    </div>
  );
}
