import { genDeals } from "../../../shared/mock";

const db = {
  deals: genDeals(36),
  library: Array.from({ length: 12 }).map((_, i) => ({
    id: `img_${i + 1}`,
    url: `https://picsum.photos/seed/deal${i + 1}/640/360`,
    label: `Asset #${i + 1}`,
    tags: ["promo", "photo"],
  })),
};

export const deals = {
  list: ({ q = "", status } = {}) => {
    let list = db.deals;
    if (status) list = list.filter((d) => d.status === status);
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(s) || d.brand.toLowerCase().includes(s)
      );
    }
    return list;
  },
  create: (payload) => {
    const id = `d_${Date.now()}`;
    db.deals.unshift({ id, redemptions: 0, ...payload });
    return id;
  },
  update: (id, payload) => {
    const i = db.deals.findIndex((x) => x.id === id);
    if (i >= 0) db.deals[i] = { ...db.deals[i], ...payload };
  },
  remove: (id) => {
    const i = db.deals.findIndex((x) => x.id === id);
    if (i >= 0) db.deals.splice(i, 1);
  },
};

export function getLibrary() {
  return db.library;
}
