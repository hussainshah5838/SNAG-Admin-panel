import React, { useMemo } from "react";
import { useLocation, NavLink } from "react-router-dom";
import DataTable from "../../../shared/components/DataTable";

export default function Invoices() {
  const location = useLocation();

  const active = useMemo(() => {
    if (location.pathname.startsWith("/billing/payouts")) return "payouts";
    return "invoices";
  }, [location.pathname]);

  const invoices = Array.from({ length: 8 }).map((_, i) => ({
    id: `inv_${1000 + i}`,
    period: `2025-${String(i + 1).padStart(2, "0")}`,
    amount: `$${(199 + i * 2).toFixed(2)}`,
    status: i === 7 ? "due" : "paid",
  }));

  const payouts = Array.from({ length: 10 }).map((_, i) => ({
    id: `po_${i + 1}`,
    partner: ["Apple Pay", "Stripe", "Visa"][i % 3],
    amount: `$${(5000 + i * 311).toFixed(2)}`,
    status: ["pending", "paid"][i % 2],
    ts: Date.now() - i * 86400000,
  }));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Billing</h3>
        <div className="inline-flex rounded-xl bg-slate-50 dark:bg-slate-800/50 p-1">
          <NavLink
            to="/billing/invoices"
            className={({ isActive }) =>
              `px-3 py-1 rounded-lg text-sm ${
                isActive || active === "invoices"
                  ? "bg-white dark:bg-slate-700 font-medium"
                  : "muted"
              }`
            }
          >
            Invoices
          </NavLink>
          <NavLink
            to="/billing/payouts"
            className={({ isActive }) =>
              `px-3 py-1 rounded-lg text-sm ${
                isActive || active === "payouts"
                  ? "bg-white dark:bg-slate-700 font-medium"
                  : "muted"
              }`
            }
          >
            Payouts
          </NavLink>
        </div>
      </div>

      {active === "invoices" && (
        <DataTable
          columns={[
            { key: "id", header: "Invoice" },
            { key: "period", header: "Period" },
            { key: "amount", header: "Amount" },
            { key: "status", header: "Status" },
            {
              key: "download",
              header: "",
              render: () => (
                <a
                  className="btn-ghost"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Download
                </a>
              ),
            },
          ]}
          rows={invoices}
        />
      )}

      {active === "payouts" && (
        <DataTable
          columns={[
            { key: "partner", header: "Processor" },
            { key: "amount", header: "Amount" },
            { key: "status", header: "Status" },
            {
              key: "ts",
              header: "Date",
              render: (r) => new Date(r.ts).toLocaleDateString(),
            },
          ]}
          rows={payouts}
        />
      )}
    </div>
  );
}
