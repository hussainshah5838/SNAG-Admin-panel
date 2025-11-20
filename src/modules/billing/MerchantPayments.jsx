import React, { useState, useEffect } from "react";
import { payForService, getPayments } from "./api/billing.service";

export default function MerchantPayments({ merchantId }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!merchantId) return;
    let mounted = true;
    getPayments(merchantId)
      .then((res) => mounted && setPayments(res))
      .catch(() => {});
    return () => (mounted = false);
  }, [merchantId]);

  async function handlePay(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await payForService({ merchantId, amount });
      setPayments((p) => [res, ...p]);
      setAmount("");
    } catch (err) {
      setError(err.message || "payment failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Merchant Payments</h3>
      <form onSubmit={handlePay} className="flex gap-2 mb-4">
        <input
          type="number"
          step="0.01"
          className="border p-2 rounded flex-1"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay"}
        </button>
      </form>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div>
        <h4 className="font-medium mb-2">Recent Payments</h4>
        <ul className="space-y-2">
          {payments.map((p) => (
            <li key={p.id} className="border rounded p-2">
              <div className="text-sm">{p.id}</div>
              <div className="text-xs text-gray-600">
                {p.status} • ${p.amount}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
