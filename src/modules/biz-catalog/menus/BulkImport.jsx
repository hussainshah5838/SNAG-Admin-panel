import React, { useState } from "react";
import BulkUpload from "../../../shared/components/BulkUpload";
import { importOffersMerchant } from "../../offer-reports/api/offers.service";

export default function MerchantBulkImport() {
  const [result, setResult] = useState(null);

  const columns = [
    { key: "title", required: true },
    { key: "location" },
    { key: "category" },
    { key: "price", required: true, type: "number" },
    { key: "start_date", type: "date" },
    { key: "end_date", type: "date" },
    { key: "status" },
  ];

  async function handleImport(rows) {
    const res = await importOffersMerchant(rows);
    setResult(res);
  }

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Upload Offers (Merchant)</h1>
      </div>
      <div className="card p-6">
        <BulkUpload columns={columns} onImport={handleImport} />
        {result && (
          <div className="mt-4">
            <div className="font-medium">Import Summary</div>
            <div className="mt-2">Total: {result.total}</div>
            <div>Success: {result.success}</div>
            <div>Failures: {result.failures.length}</div>
          </div>
        )}
      </div>
    </div>
  );
}
