import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Disputes() {
  const rows = Array.from({ length: 6 }).map((_, i) => ({
    id: `dp_${i + 1}`,
    invoice: `inv_${100 + i}`,
    reason: ["Refund", "Chargeback", "Duplicate"][i % 3],
    status: ["open", "investigating", "closed"][i % 3],
  }));
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Disputes</h3>
      <DataTable
        columns={[
          { key: "invoice", header: "Invoice" },
          { key: "reason", header: "Reason" },
          { key: "status", header: "Status" },
        ]}
        rows={rows}
      />
    </div>
  );
}
