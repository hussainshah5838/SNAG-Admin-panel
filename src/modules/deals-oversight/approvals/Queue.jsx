import React, { useEffect, useState } from "react";
import DataTable from "../../../shared/components/DataTable";
import { deals } from "../api/deals.service";

export default function Queue() {
  const [rows, setRows] = useState([]);
  const load = () => setRows(deals.list({ status: "needs-approval" }));
  useEffect(() => {
    load();
  }, []);

  const approve = (r) => {
    deals.update(r.id, { status: "live" });
    load();
  };
  const reject = (r) => {
    deals.remove(r.id);
    load();
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Approval Queue</h3>
      <DataTable
        columns={[
          { key: "title", header: "Title" },
          { key: "brand", header: "Brand" },
          { key: "radius", header: "Radius" },
          {
            key: "expiresAt",
            header: "Expires",
            render: (r) => new Date(r.expiresAt).toLocaleDateString(),
          },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <div className="flex gap-2">
                <button className="btn-ghost" onClick={() => approve(r)}>
                  Approve
                </button>
                <button
                  className="btn-ghost text-rose-600"
                  onClick={() => reject(r)}
                >
                  Reject
                </button>
              </div>
            ),
          },
        ]}
        rows={rows}
      />
    </div>
  );
}
