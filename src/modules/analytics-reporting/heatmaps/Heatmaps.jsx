import React from "react";
import Heatmap from "../../dashboard/components/Heatmap";
import DateRange from "../components/DateRange";

export default function Heatmaps() {
  const data = Array.from({ length: 7 }).map(() =>
    Array.from({ length: 24 }).map(() => Math.random())
  );
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Engagement Heatmaps</h3>
        <DateRange />
      </div>
      <div className="card p-4">
        <Heatmap data={data} />
      </div>
    </div>
  );
}
