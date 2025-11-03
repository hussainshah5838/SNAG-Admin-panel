// Simple mock data generators for development
const statuses = [
  "published",
  "needs-approval",
  "draft",
  "flagged",
  "archived",
];

export function genDeals(n = 10) {
  return Array.from({ length: n }).map((_, i) => {
    const days = i + 1;
    return {
      id: `deal_${i + 1}`,
      title: `Promo Deal ${i + 1}`,
      brand: [`Acme`, `Globex`, `Initech`, `Umbrella`][i % 4],
      status: statuses[i % statuses.length],
      redemptions: Math.floor(Math.random() * 500),
      radius: `${5 + (i % 20)} km`,
      expiresAt: new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toISOString(),
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    };
  });
}
