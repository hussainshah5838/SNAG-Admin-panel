import React, { useEffect, useState } from "react";
import {
  getKpis,
  getSentimentDistribution,
  getOffersRedeemed,
  getMonthlyRevenue,
  getRevenueSplit,
} from "./api/dashboard.service";
import {
  StatsCard,
  DonutChart,
  BarChart,
  LineChart,
} from "../../shared/charts";

export default function Dashboard() {
  const [kpis, setKpis] = useState(null);
  const [sentimentData, setSentimentData] = useState([]);
  const [offersData, setOffersData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [revenueSplitData, setRevenueSplitData] = useState([]);
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setBusy(true);
      const [k, s, o, r, rs] = await Promise.all([
        getKpis(),
        getSentimentDistribution(),
        getOffersRedeemed(),
        getMonthlyRevenue(),
        getRevenueSplit(),
      ]);
      if (!mounted) return;
      setKpis(k);
      setSentimentData(s);
      setOffersData(o);
      setRevenueData(r);
      setRevenueSplitData(rs);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, []);

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Dashboard
        </h1>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {busy
          ? Array.from({ length: 4 }).map((_, i) => (
              <StatsCard key={i} loading={true} />
            ))
          : Object.values(kpis || {}).map((card, i) => (
              <StatsCard
                key={i}
                title={card.title}
                value={card.value}
                trend={card.trend}
                icon={card.icon}
              />
            ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Sentiment Distribution */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Sentiment Distribution
            </h3>
            <select className="input text-sm w-auto">
              <option>This Month</option>
            </select>
          </div>
          <DonutChart data={sentimentData} loading={busy} size={180} />
        </div>

        {/* Offers Redeemed */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Offers Redeemed
            </h3>
            <select className="input text-sm w-auto">
              <option>This Month</option>
            </select>
          </div>
          <BarChart
            data={offersData}
            loading={busy}
            height={200}
            color="#60a5fa"
            showValues={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Monthly Revenue
            </h3>
            <select className="input text-sm w-auto">
              <option>This Month</option>
            </select>
          </div>
          <LineChart
            data={revenueData}
            loading={busy}
            height={200}
            color="#10b981"
            showArea={true}
          />
        </div>

        {/* Revenue Split by Offer Category */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Revenue Split by Offer Category
            </h3>
            <select className="input text-sm w-auto">
              <option>This Month</option>
            </select>
          </div>
          <DonutChart data={revenueSplitData} loading={busy} size={180} />
        </div>
      </div>
    </div>
  );
}
