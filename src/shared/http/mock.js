// Lightweight mock data helpers for local/dev mode.
// Use in list screens, charts, etc., when VITE_API_URL is not set.

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export function genUsers(n = 25) {
  const roles = ["admin", "analyst", "moderator", "retailer", "viewer"];
  const states = ["active", "pending", "suspended"];
  return Array.from({ length: n }).map((_, i) => ({
    id: `u_${i + 1}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@snag.app`,
    role: pick(roles),
    status: pick(states),
    lastActivity: Date.now() - rand(1, 21) * 3600 * 1000,
  }));
}

export function genRetailers(n = 20) {
  const brands = [
    "Zara",
    "Nike",
    "Adidas",
    "H&M",
    "Apple",
    "Samsung",
    "Sephora",
  ];
  const cats = ["Fashion", "Electronics", "Beauty", "Food & Drink"];
  return Array.from({ length: n }).map((_, i) => ({
    id: `r_${i + 1}`,
    name: pick(brands) + " " + (100 + i),
    category: pick(cats),
    locations: rand(1, 12),
    status: pick(["active", "paused"]),
  }));
}

export function genDeals(n = 40) {
  const kinds = ["% Off", "BOGO", "Free Gift", "Cashback"];
  const imgs = [
    "https://picsum.photos/seed/1/640/360",
    "https://picsum.photos/seed/2/640/360",
    "https://picsum.photos/seed/3/640/360",
  ];
  return Array.from({ length: n }).map((_, i) => ({
    id: `d_${i + 1}`,
    title: `${pick(kinds)} Deal #${i + 1}`,
    brand: pick(["Zara", "Nike", "Apple", "H&M"]),
    image: pick(imgs),
    radius: pick([100, 250, 500, 1000]),
    expiresAt: Date.now() + rand(1, 14) * 86400000,
    redemptions: rand(10, 800),
    status: pick(["live", "draft", "needs-approval"]),
  }));
}

export function paginate(list, page = 1, pageSize = 10) {
  const start = (page - 1) * pageSize;
  const slice = list.slice(start, start + pageSize);
  return { rows: slice, total: list.length, page, pageSize };
}

export default {
  genUsers,
  genRetailers,
  genDeals,
  paginate,
};
