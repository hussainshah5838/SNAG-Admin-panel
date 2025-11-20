const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const billing = {
  plans: () => ({}),
  usage: () => ({}),
  invoices: () => ({}),
  payouts: () => ({}),
  disputes: () => ({}),
};

export async function payForService({ merchantId, amount }) {
  await delay();
  // mock payment: accept anything > 0
  if (!merchantId || !amount || Number(amount) <= 0) {
    throw new Error("invalid payment");
  }
  return {
    id: `pay_${Date.now()}`,
    merchantId,
    amount: Number(amount),
    status: "paid",
    createdAt: new Date().toISOString(),
  };
}

export async function createInvoice({ merchantId, amount, description }) {
  await delay();
  return {
    id: `inv_${Date.now()}`,
    merchantId,
    amount: Number(amount),
    description: description || "",
    status: "issued",
    createdAt: new Date().toISOString(),
  };
}

export async function getPayments(merchantId) {
  await delay();
  // return a small mock set
  return [
    {
      id: "pay_1",
      merchantId,
      amount: 100,
      status: "paid",
      createdAt: new Date().toISOString(),
    },
  ];
}
