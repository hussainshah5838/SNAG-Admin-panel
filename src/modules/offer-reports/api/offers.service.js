const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

export async function importOffersAdmin(rows = []) {
  await delay();
  const failures = [];
  rows.forEach((r, i) => {
    // simple validation: title, merchant, price required
    const errs = [];
    if (!r.title) errs.push("title required");
    if (!r.merchant) errs.push("merchant required");
    if (!r.price || isNaN(Number(r.price))) errs.push("price invalid");
    if (errs.length) failures.push({ row: i + 1, errors: errs });
  });
  return {
    total: rows.length,
    success: rows.length - failures.length,
    failures,
  };
}

export async function importOffersMerchant(rows = []) {
  // same mock behavior for merchants
  return importOffersAdmin(rows);
}
