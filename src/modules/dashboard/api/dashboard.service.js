import axios from "axios";

const API = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API;

const http = axios.create({ baseURL: API || "/api" });

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export async function getKpis() {
  if (USE_MOCK) {
    await delay();
    return {
      usage: { title: "Active Users", value: "12,304", delta: 8.3 },
      redemptions: { title: "Redemptions", value: "4,921", delta: 3.2 },
      retailers: { title: "Retailers", value: "732", delta: 1.1 },
      growth: { title: "Revenue", value: "$48.7k", delta: 5.9 },
    };
  }
  const { data } = await http.get("/admin/dashboard/kpis");
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
