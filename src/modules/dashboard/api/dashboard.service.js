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

export async function getOffersRedeemed(period = "month", option = null) {
  if (USE_MOCK) {
    await delay();
    if (period === "month") {
      return [
        { label: "Week 1", value: 5000 },
        { label: "Week 2", value: 4000 },
        { label: "Week 3", value: 4500 },
        { label: "Week 4", value: 5500 },
      ];
    }
    if (period === "week") {
      // return days in week
      return [
        { label: "Mon", value: 800 },
        { label: "Tue", value: 900 },
        { label: "Wed", value: 700 },
        { label: "Thu", value: 1100 },
        { label: "Fri", value: 1300 },
        { label: "Sat", value: 1600 },
        { label: "Sun", value: 1200 },
      ];
    }
    if (period === "day" || period === "date") {
      // return hourly buckets for a day
      return Array.from({ length: 8 }).map((_, i) => ({
        label: `${i * 3}:00`,
        value: 50 + Math.round(Math.random() * 250),
      }));
    }
    return [
      { label: "Week 1", value: 5000 },
      { label: "Week 2", value: 4000 },
      { label: "Week 3", value: 4500 },
      { label: "Week 4", value: 5500 },
    ];
  }
  const optParam = option ? `&opt=${encodeURIComponent(option)}` : "";
  const { data } = await http.get(
    `/admin/dashboard/offers-redeemed?period=${period}${optParam}`
  );
  return data;
}

export async function getMonthlyRevenue(period = "month", option = null) {
  if (USE_MOCK) {
    await delay();
    if (period === "month") {
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
        value: 200 + Math.random() * 400,
      }));
    }
    if (period === "week") {
      // return 7 days
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      return days.map((d) => ({
        label: d,
        value: 50 + Math.round(Math.random() * 300),
      }));
    }
    if (period === "day" || period === "date") {
      // hourly or small buckets
      return Array.from({ length: 8 }).map((_, i) => ({
        label: `${i * 3}:00`,
        value: 100 + Math.round(Math.random() * 300),
      }));
    }
    // fallback
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
      value: 200 + Math.random() * 400,
    }));
  }
  const optParam = option ? `&opt=${encodeURIComponent(option)}` : "";
  const { data } = await http.get(
    `/admin/dashboard/monthly-revenue?period=${period}${optParam}`
  );
  return data;
}

export async function getRevenueSplit(period = "month", option = null) {
  if (USE_MOCK) {
    await delay();
    // Base distribution
    const base = [
      { label: "Food & Beverages", value: 40, color: "#3b82f6" },
      { label: "Beauty & Wellness", value: 30, color: "#10b981" },
      { label: "Fashion", value: 20, color: "#ef4444" },
      { label: "Services", value: 5, color: "#8b5cf6" },
    ];

    if (period === "week") {
      if (option) {
        const mapping = {
          Monday: [2, -1, -0.5, -0.5],
          Tuesday: [1, 0, -0.5, -0.5],
          Wednesday: [0, 2, -1, -1],
          Thursday: [-1, 3, -1, -1],
          Friday: [5, -3, -1, -1],
          Saturday: [6, -4, -1, -1],
          Sunday: [3, -1, -1, -1],
        };
        const tweak = mapping[option] || [0, 0, 0, 0];
        return base.map((b, i) => ({
          ...b,
          value: Math.max(1, b.value + tweak[i]),
        }));
      }
      return [
        { label: "Food & Beverages", value: 38, color: "#3b82f6" },
        { label: "Beauty & Wellness", value: 34, color: "#10b981" },
        { label: "Fashion", value: 20, color: "#ef4444" },
        { label: "Services", value: 8, color: "#8b5cf6" },
      ];
    }

    if (period === "day") {
      return [
        { label: "Food & Beverages", value: 45, color: "#3b82f6" },
        { label: "Beauty & Wellness", value: 28, color: "#10b981" },
        { label: "Fashion", value: 17, color: "#ef4444" },
        { label: "Services", value: 10, color: "#8b5cf6" },
      ];
    }

    if (period === "date") {
      if (option) {
        try {
          const d = new Date(option);
          const days = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ];
          const day = days[d.getDay()];
          const mapping = {
            Monday: [2, -1, -0.5, -0.5],
            Tuesday: [1, 0, -0.5, -0.5],
            Wednesday: [0, 2, -1, -1],
            Thursday: [-1, 3, -1, -1],
            Friday: [5, -3, -1, -1],
            Saturday: [6, -4, -1, -1],
            Sunday: [3, -1, -1, -1],
          };
          const tweak = mapping[day] || [0, 0, 0, 0];
          return base.map((b, i) => ({
            ...b,
            value: Math.max(1, b.value + tweak[i]),
          }));
        } catch (_) {
          return base;
        }
      }
      return base;
    }

    // default: month
    return base;
  }

  const optParam = option ? `&opt=${encodeURIComponent(option)}` : "";
  const { data } = await http.get(
    `/admin/dashboard/revenue-split?period=${period}${optParam}`
  );
  return data;
}
