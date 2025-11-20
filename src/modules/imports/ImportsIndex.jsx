import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../routes/paths";

export default function ImportsIndex() {
  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Import Tools</h1>
        <p className="muted">
          Upload CSVs to bulk import offers. Use admin import to set merchant
          per-row.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to={PATHS.OFFERS_ADMIN_IMPORT} className="card p-4 hover:shadow">
          <h3 className="text-lg font-semibold">Admin: Offers Import</h3>
          <p className="muted mt-2">
            Import offers on behalf of merchants (merchant column required).
          </p>
        </Link>

        <Link
          to={PATHS.OFFERS_MERCHANT_IMPORT}
          className="card p-4 hover:shadow"
        >
          <h3 className="text-lg font-semibold">Merchant: Offers Import</h3>
          <p className="muted mt-2">Merchant-facing uploader for offer CSVs.</p>
        </Link>
      </div>

      <div className="mt-6">
        <a href="/samples/offers-sample.csv" className="text-sm text-blue-600">
          Download sample CSV
        </a>
      </div>
    </div>
  );
}
