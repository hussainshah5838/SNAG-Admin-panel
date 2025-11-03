import React from "react";
import StatCard from "../../../shared/components/StatCard";

export default function Usage() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="API Calls"
        value="1.2M"
        delta={7}
        data={[10, 11, 12, 13, 14, 15, 16, 17]}
      />
      <StatCard
        title="Storage"
        value="48 GB"
        delta={3}
        data={[3, 4, 4, 5, 5, 6, 6, 7]}
      />
      <StatCard
        title="Emails"
        value="92k"
        delta={-2}
        data={[5, 5, 5, 4, 4, 4, 3, 3]}
      />
      <StatCard
        title="Pushes"
        value="240k"
        delta={11}
        data={[6, 7, 8, 9, 10, 11, 12, 13]}
      />
    </div>
  );
}
