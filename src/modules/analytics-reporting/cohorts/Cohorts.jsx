import React from "react";
import DataTable from "../../../shared/components/DataTable";

export default function Cohorts() {
  const rows = [
    { id: 1, cohort: "New Users (W32)", size: 2412, retention: "42%" },
    { id: 2, cohort: "Travelers (30d)", size: 1120, retention: "51%" },
    { id: 3, cohort: "Foodies (60d)", size: 3180, retention: "38%" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Cohort Performance</h3>
      <DataTable
        columns={[
          { key: "cohort", header: "Cohort" },
          { key: "size", header: "Size" },
          { key: "retention", header: "Retention" },
        ]}
        rows={rows}
      />
    </div>
  );
}
