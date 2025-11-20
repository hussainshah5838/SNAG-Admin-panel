import React, { useState } from "react";
import BulkUpload from "../../shared/components/BulkUpload";
import { importOffersAdmin } from "./api/offers.service";

export default function AdminBulkImport() {
  const [result, setResult] = useState(null);

  const columns = [
    { key: "title", required: true },
    { key: "merchant", required: true },
    { key: "location" },
    { key: "category" },
    { key: "price", required: true, type: "number" },
    { key: "start_date", type: "date" },
    { key: "end_date", type: "date" },
    { key: "status" },
    { key: "max_redemptions", type: "number" },
  ];

  async function handleImport(rows) {
    const res = await importOffersAdmin(rows);
    setResult(res);
  }

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Admin: Bulk Import Offers</h1>
      </div>
      <div className="card p-6">
        <BulkUpload columns={columns} onImport={handleImport} />
        {result && (
          <div className="mt-4">
            <div className="font-medium">Import Summary</div>
            <div className="mt-2">Total: {result.total}</div>
            <div>Success: {result.success}</div>
            <div>Failures: {result.failures.length}</div>
            {result.failures.length > 0 && (
              <div className="mt-2">
                <ul className="list-disc pl-5">
                  {result.failures.map((f) => (
                    <li key={f.row}>
                      Row {f.row}: {f.errors.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
