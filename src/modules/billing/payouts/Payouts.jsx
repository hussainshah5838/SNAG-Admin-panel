import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Payouts() {
  const rows = Array.from({ length: 10 }).map((_, i) => ({
    id: `po_${i + 1}`,
    partner: ["Apple Pay", "Stripe", "Visa"][i % 3],
    amount: `$${(5000 + i * 311).toFixed(2)}`,
    status: ["pending", "paid"][i % 2],
    ts: Date.now() - i * 86400000,
  }));
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Payouts</h3>
      <DataTable
        columns={[
          { key: "partner", header: "Processor" },
          { key: "amount", header: "Amount" },
          { key: "status", header: "Status" },
          {
            key: "ts",
            header: "Date",
            render: (r) => new Date(r.ts).toLocaleDateString(),
          },
        ]}
        rows={rows}
      />
    </div>
  );
}
