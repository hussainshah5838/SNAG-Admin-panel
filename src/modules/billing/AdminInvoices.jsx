import React, { useState } from "react";
import { createInvoice } from "./api/billing.service";

export default function AdminInvoices() {
  const [merchantId, setMerchantId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleCreate(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const inv = await createInvoice({ merchantId, amount, description });
      setResult(inv);
      setMerchantId("");
      setAmount("");
      setDescription("");
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Admin - Create Invoice</h3>
      <form onSubmit={handleCreate} className="space-y-2">
        <input
          placeholder="Merchant ID"
          value={merchantId}
          onChange={(e) => setMerchantId(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Amount"
          value={amount}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <div>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Invoice"}
          </button>
        </div>
      </form>
      {result && (
        <div className="mt-4 p-2 border rounded bg-gray-50">
          {result.error ? (
            <div className="text-red-600">{result.error}</div>
          ) : (
            <div>
              <div>Invoice ID: {result.id}</div>
              <div>Amount: ${result.amount}</div>
              <div>Status: {result.status}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
