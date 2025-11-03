import React from "react";
import StatCard from "../../shared/components/StatCard";
import SparkTiny from "./components/SparkTiny";
import DateRange from "./components/DateRange";

export default function Overview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Analytics Overview</h3>
        <DateRange />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Impressions"
          value="2.1M"
          delta={9}
          data={[3, 4, 5, 6, 7, 9, 8, 10]}
        />
        <StatCard
          title="Views"
          value="988k"
          delta={6}
          data={[2, 3, 3, 4, 5, 6, 7, 7]}
        />
        <StatCard
          title="Redemptions"
          value="134k"
          delta={12}
          data={[1, 2, 3, 4, 6, 7, 8, 9]}
        />
        <StatCard
          title="ARPU"
          value="$1.72"
          delta={3}
          data={[2, 2, 3, 3, 3, 4, 4, 5]}
        />
      </div>

      <div className="card p-4">
        <div className="font-medium">7-day Trend</div>
        <div className="mt-2">
          <SparkTiny data={[12, 14, 15, 13, 16, 18, 17]} />
        </div>
      </div>
    </div>
  );
}
