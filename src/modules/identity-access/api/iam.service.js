import axios from "axios";

const API = import.meta.env.VITE_API_URL || "";
const USE_MOCK = !API;
const http = axios.create({ baseURL: API || "/api" });

const delay = (ms = 350) => new Promise((r) => setTimeout(r, ms));

let USERS = Array.from({ length: 11 }).map((_, i) => ({
  id: String(i + 1),
  name: [
    "Alice",
    "Bob",
    "Carol",
    "Dave",
    "Eve",
    "Frank",
    "Grace",
    "Heidi",
    "Ivan",
    "Judy",
    "Mallory",
  ][i],
  email: `user${i + 1}@snag.dev`,
  role: ["Admin", "Retailer", "Moderator", "Viewer"][i % 4],
  status: i % 7 === 0 ? "suspended" : "active",
  lastActive: Date.now() - i * 86400000,
}));

let RETAILERS = Array.from({ length: 7 }).map((_, i) => ({
  id: String(i + 1),
  name: ["Zara", "H&M", "Nike", "Uniqlo", "Apple", "BestBuy", "Sephora"][i],
  contact: `retailer${i + 1}@brand.com`,
  locations: 1 + (i % 12),
  status: i % 5 === 0 ? "pending" : "approved",
}));

export async function listUsers({ q = "", page = 1, limit = 10 } = {}) {
  if (USE_MOCK) {
    await delay();
    const filtered = USERS.filter(
      (u) =>
        u.name.toLowerCase().includes(q.toLowerCase()) ||
        u.email.toLowerCase().includes(q.toLowerCase())
    );
    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit),
      total: filtered.length,
    };
  }
  const { data } = await http.get("/admin/users", {
    params: { q, page, limit },
  });
  return data;
}

export async function createUser(payload) {
  if (USE_MOCK) {
    await delay();
    const u = {
      ...payload,
      id: String(Date.now()),
      status: "active",
      lastActive: Date.now(),
    };
    USERS.unshift(u);
    return u;
  }
  const { data } = await http.post("/admin/users", payload);
  return data;
}

export async function updateUser(id, payload) {
  if (USE_MOCK) {
    await delay();
    USERS = USERS.map((u) => (u.id === id ? { ...u, ...payload } : u));
    return USERS.find((u) => u.id === id);
  }
  const { data } = await http.put(`/admin/users/${id}`, payload);
  return data;
}

export async function deleteUser(id) {
  if (USE_MOCK) {
    await delay();
    USERS = USERS.filter((u) => u.id !== id);
    return { ok: true };
  }
  const { data } = await http.delete(`/admin/users/${id}`);
  return data;
}

export async function listRetailers({ q = "", page = 1, limit = 10 } = {}) {
  if (USE_MOCK) {
    await delay();
    const filtered = RETAILERS.filter((r) =>
      r.name.toLowerCase().includes(q.toLowerCase())
    );
    const start = (page - 1) * limit;
    return {
      items: filtered.slice(start, start + limit),
      total: filtered.length,
    };
  }
  const { data } = await http.get("/admin/retailers", {
    params: { q, page, limit },
  });
  return data;
}

export async function createRetailer(payload) {
  if (USE_MOCK) {
    await delay();
    const r = { ...payload, id: String(Date.now()), status: "approved" };
    RETAILERS.unshift(r);
    return r;
  }
  const { data } = await http.post("/admin/retailers", payload);
  return data;
}

export async function updateRetailer(id, payload) {
  if (USE_MOCK) {
    await delay();
    RETAILERS = RETAILERS.map((r) => (r.id === id ? { ...r, ...payload } : r));
    return RETAILERS.find((r) => r.id === id);
  }
  const { data } = await http.put(`/admin/retailers/${id}`, payload);
  return data;
}

export async function deleteRetailer(id) {
  if (USE_MOCK) {
    await delay();
    RETAILERS = RETAILERS.filter((r) => r.id !== id);
    return { ok: true };
  }
  const { data } = await http.delete(`/admin/retailers/${id}`);
  return data;
}
