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
  const [period, setPeriod] = useState("month");
  const [weekday, setWeekday] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    let mounted = true;
    async function run() {
      setBusy(true);
      const [k, s] = await Promise.all([getKpis(), getSentimentDistribution()]);
      if (!mounted) return;
      setKpis(k);
      setSentimentData(s);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, []);

  // fetch offers redeemed + monthly revenue whenever timeframe changes
  useEffect(() => {
    let mounted = true;
    async function fetchOffersRevenue() {
      setBusy(true);
      try {
        const option =
          period === "week"
            ? weekday || null
            : period === "date"
            ? selectedDate || null
            : null;
        const [o, r] = await Promise.all([
          getOffersRedeemed(period, option),
          getMonthlyRevenue(period, option),
        ]);
        if (!mounted) return;
        setOffersData(o);
        setRevenueData(r);
      } catch {
        // ignore
      } finally {
        if (mounted) setBusy(false);
      }
    }
    fetchOffersRevenue();
    return () => (mounted = false);
  }, [period, weekday, selectedDate]);

  // fetch revenue split whenever period, weekday or selectedDate changes
  useEffect(() => {
    let mounted = true;
    async function fetchSplit() {
      setBusy(true);
      try {
        const option =
          period === "week"
            ? weekday || null
            : period === "date"
            ? selectedDate || null
            : null;
        const rs = await getRevenueSplit(period, option);
        if (!mounted) return;
        setRevenueSplitData(rs);
      } catch {
        // ignore
      } finally {
        if (mounted) setBusy(false);
      }
    }
    fetchSplit();
    return () => (mounted = false);
  }, [period, weekday, selectedDate]);

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
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
            <h3 className="font-semibold text-black dark:text-white">
              Sentiment Distribution
            </h3>
            <div className="flex items-center gap-2">
              <label className="muted text-sm">Show:</label>
              <select
                className="input text-sm w-auto"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  if (e.target.value !== "week") setWeekday("");
                  if (e.target.value !== "date") setSelectedDate("");
                }}
              >
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
                <option value="date">This Date</option>
              </select>
              {period === "week" && (
                <select
                  className="input text-sm w-auto"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                >
                  <option value="">All days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              )}
              {period === "date" && (
                <input
                  type="date"
                  className="input text-sm w-auto"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="w-full h-44 sm:h-48 md:h-56">
            <DonutChart
              data={sentimentData}
              loading={busy}
              className="h-full"
            />
          </div>
        </div>

        {/* Offers Redeemed */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black dark:text-white">
              Offers Redeemed
            </h3>
            <div className="flex items-center gap-2">
              <label className="muted text-sm">Show:</label>
              <select
                className="input text-sm w-auto"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  if (e.target.value !== "week") setWeekday("");
                  if (e.target.value !== "date") setSelectedDate("");
                }}
              >
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
                <option value="date">This Date</option>
              </select>
              {period === "week" && (
                <select
                  className="input text-sm w-auto"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                >
                  <option value="">All days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              )}
              {period === "date" && (
                <input
                  type="date"
                  className="input text-sm w-auto"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              )}
            </div>
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
            <h3 className="font-semibold text-black dark:text-white">
              Monthly Revenue
            </h3>
            <div className="flex items-center gap-2">
              <label className="muted text-sm">Show:</label>
              <select
                className="input text-sm w-auto"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  if (e.target.value !== "week") setWeekday("");
                  if (e.target.value !== "date") setSelectedDate("");
                }}
              >
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
                <option value="date">This Date</option>
              </select>
              {period === "week" && (
                <select
                  className="input text-sm w-auto"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                >
                  <option value="">All days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              )}
              {period === "date" && (
                <input
                  type="date"
                  className="input text-sm w-auto"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              )}
            </div>
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
            <h3 className="font-semibold text-black dark:text-white">
              Revenue Split by Offer Category
            </h3>
            <div className="flex items-center gap-2">
              <label className="muted text-sm">Show:</label>
              <select
                className="input text-sm w-auto"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  if (e.target.value !== "week") setWeekday("");
                  if (e.target.value !== "date") setSelectedDate("");
                }}
              >
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
                <option value="date">This Date</option>
              </select>
              {period === "week" && (
                <select
                  className="input text-sm w-auto"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                >
                  <option value="">All days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              )}
              {period === "date" && (
                <input
                  type="date"
                  className="input text-sm w-auto"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="w-full h-44 sm:h-48 md:h-56">
            <DonutChart
              data={revenueSplitData}
              loading={busy}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
