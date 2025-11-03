import React from "react";
import StatCard from "../../../shared/components/StatCard";

export default function SignalsDashboard() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Flagged Accounts"
        value="142"
        delta={-3}
        data={[3, 4, 3, 5, 4, 4, 3, 2]}
      />
      <StatCard
        title="Suspicious Redemptions"
        value="321"
        delta={5}
        data={[5, 7, 9, 8, 10, 12, 11, 13]}
      />
      <StatCard
        title="False Positives"
        value="2.1%"
        delta={-12}
        data={[6, 5, 5, 4, 4, 3, 3, 2]}
      />
      <StatCard
        title="Open Cases"
        value="27"
        delta={1}
        data={[1, 1, 2, 3, 2, 2, 3, 4]}
      />
    </div>
  );
}
