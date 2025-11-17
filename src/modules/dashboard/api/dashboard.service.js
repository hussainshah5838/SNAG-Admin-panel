import axios from "axios";

const API = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API;

const http = axios.create({ baseURL: API || "/api" });

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getKpis() {
  if (USE_MOCK) {
    await delay();
    return {
      users: {
        title: "Total Users",
        value: "12,450",
        trend: 10,
        icon: "users",
      },
      merchants: {
        title: "Total Merchants",
        value: "4,540",
        trend: 10,
        icon: "merchants",
      },
      offers: {
        title: "Active Offers",
        value: "7,650",
        trend: 32,
        icon: "offers",
      },
      redemptions: {
        title: "Total Redemptions",
        value: "32,560",
        trend: 20,
        icon: "redemptions",
      },
    };
  }
  const { data } = await http.get("/admin/dashboard/kpis");
  return data;
}

export async function getSentimentDistribution() {
  if (USE_MOCK) {
    await delay();
    return [
      { label: "iOS", value: 45, color: "#3b82f6" },
      { label: "Android", value: 50, color: "#10b981" },
      { label: "Web", value: 5, color: "#f59e0b" },
    ];
  }
  const { data } = await http.get("/admin/dashboard/sentiment");
  return data;
}

export async function getOffersRedeemed() {
  if (USE_MOCK) {
    await delay();
    return [
      { label: "Week 1", value: 5000 },
      { label: "Week 2", value: 4000 },
      { label: "Week 3", value: 4500 },
      { label: "Week 4", value: 5500 },
    ];
  }
  const { data } = await http.get("/admin/dashboard/offers-redeemed");
  return data;
}

export async function getMonthlyRevenue() {
  if (USE_MOCK) {
    await delay();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.map((month) => ({
      label: month,
      value: 200 + Math.random() * 400, // Random revenue between 200-600k
    }));
  }
  const { data } = await http.get("/admin/dashboard/monthly-revenue");
  return data;
}

export async function getRevenueSplit() {
  if (USE_MOCK) {
    await delay();
    return [
      { label: "Food & Beverages", value: 40, color: "#3b82f6" },
      { label: "Beauty & Wellness", value: 30, color: "#10b981" },
      { label: "Fashion", value: 20, color: "#ef4444" },
      { label: "Services", value: 5, color: "#8b5cf6" },
    ];
  }
  const { data } = await http.get("/admin/dashboard/revenue-split");
  return data;
}

export async function getTrends() {
  if (USE_MOCK) {
    await delay();
    return Array.from(
      { length: 30 },
      () => 50 + Math.round(Math.random() * 80)
    );
  }
  const { data } = await http.get("/admin/dashboard/trends");
  return data;
}

export async function getTopSegments() {
  if (USE_MOCK) {
    await delay();
    return [
      { id: "fnb", label: "Food & Beverage", percent: 64 },
      { id: "fashion", label: "Fashion", percent: 53 },
      { id: "elec", label: "Electronics", percent: 42 },
      { id: "beauty", label: "Beauty", percent: 31 },
      { id: "travel", label: "Travel", percent: 18 },
    ];
  }
  const { data } = await http.get("/admin/dashboard/top-segments");
  return data;
}
