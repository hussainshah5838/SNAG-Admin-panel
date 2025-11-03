import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Logs() {
  const rows = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    channel: ["push", "email", "sms"][i % 3],
    status: ["sent", "delivered", "failed"][i % 3],
    ts: Date.now() - i * 120000,
    details: "OK",
  }));
  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Notification Logs</h3>
      <DataTable
        columns={[
          { key: "channel", header: "Channel" },
          { key: "status", header: "Status" },
          {
            key: "ts",
            header: "Time",
            render: (r) => new Date(r.ts).toLocaleTimeString(),
          },
          { key: "details", header: "Details" },
        ]}
        rows={rows}
      />
    </div>
  );
}
