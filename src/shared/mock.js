// Simple mock data generators for development
const statuses = [
  "live",
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
      category: [`Fashion`, `Electronics`, `Beauty`, `Food & Drink`][i % 4],
      status: statuses[i % statuses.length],
      redemptions: Math.floor(Math.random() * 500),
      // radius in meters (DealCard prints "Radius {radius}m")
      radius: 500 + (i % 20) * 50,
      image: `https://picsum.photos/seed/deal${i + 1}/640/360`,
      expiresAt: new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toISOString(),
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24).toISOString(),
    };
  });
}
