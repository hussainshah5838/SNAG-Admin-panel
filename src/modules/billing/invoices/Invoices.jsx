import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Invoices() {
  const rows = Array.from({ length: 8 }).map((_, i) => ({
    id: `inv_${1000 + i}`,
    period: `2025-${String(i + 1).padStart(2, "0")}`,
    amount: `$${(199 + i * 2).toFixed(2)}`,
    status: i === 7 ? "due" : "paid",
  }));
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Invoices</h3>
      <DataTable
        columns={[
          { key: "id", header: "Invoice" },
          { key: "period", header: "Period" },
          { key: "amount", header: "Amount" },
          { key: "status", header: "Status" },
          {
            key: "download",
            header: "",
            render: () => (
              <a
                className="btn-ghost"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                Download
              </a>
            ),
          },
        ]}
        rows={rows}
      />
    </div>
  );
}
