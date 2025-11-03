import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Explorer() {
  const rows = Array.from({ length: 30 }).map((_, i) => ({
    id: i + 1,
    user: `u_${100 + i}`,
    deal: `d_${200 + i}`,
    device: ["iOS", "Android"][i % 2],
    geo: ["Mall", "Airport", "High Street"][i % 3],
    ts: Date.now() - i * 3600000,
  }));

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Redemptions Explorer</h3>
      <DataTable
        columns={[
          { key: "user", header: "User" },
          { key: "deal", header: "Deal" },
          { key: "device", header: "Device" },
          { key: "geo", header: "Venue" },
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
