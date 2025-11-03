import React, { useEffect, useState } from "react";
import { getKpis, getTrends, getTopSegments } from "./api/dashboard.service";
import KpiCard from "./components/KpiCard";
import TrendSpark from "./components/TrendSpark";
import Heatmap from "./components/Heatmap";
import TopSegments from "./components/TopSegments";

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [trends, setTrends] = useState([]);
  const [segments, setSegments] = useState([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setBusy(true);
      const [k, t, s] = await Promise.all([
        getKpis(),
        getTrends(),
        getTopSegments(),
      ]);
      if (!mounted) return;
      setKpis(k);
      setTrends(t);
      setSegments(s);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, []);

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {(busy
          ? Array.from({ length: 4 })
          : [kpis?.usage, kpis?.redemptions, kpis?.retailers, kpis?.growth]
        ).map((card, i) => (
          <KpiCard key={i} loading={busy} {...(card || {})} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Engagement Trend</h3>
            <span className="text-sm text-slate-500">Last 30 days</span>
          </div>
          <TrendSpark loading={busy} series={trends} />
        </div>

        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold">Top Segments</h3>
            <span className="text-sm text-slate-500">Live</span>
          </div>
          <TopSegments loading={busy} items={segments} />
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Geo Heatmap (redemptions)</h3>
          <span className="text-sm text-slate-500">Today</span>
        </div>
        <Heatmap loading={busy} />
      </div>
    </div>
  );
}
