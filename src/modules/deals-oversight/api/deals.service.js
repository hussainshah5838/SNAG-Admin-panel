import { genDeals } from "../../../shared/mock";

const db = {
  deals: genDeals(36),
};

export const deals = {
  list: ({ q = "", status, category, maxRadius } = {}) => {
    let list = db.deals;
    if (status) list = list.filter((d) => d.status === status);
    if (category) list = list.filter((d) => d.category === category);
    if (maxRadius) {
      const r = Number(maxRadius);
      if (!Number.isNaN(r)) list = list.filter((d) => Number(d.radius) <= r);
    }
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

// getLibrary removed along with the Assets Library feature
