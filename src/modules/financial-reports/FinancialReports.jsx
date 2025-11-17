import React, { useEffect, useState } from "react";
import { StatsCard, DonutChart, BarChart } from "../../shared/charts";
import {
  getKpis,
  getOffersRedeemed,
  getRevenueSplit,
} from "../dashboard/api/dashboard.service";
import SearchBar from "../../shared/components/SearchBar";
import ConfirmDialog from "../../shared/components/ConfirmDialog";

export default function FinancialReports() {
  const [kpis, setKpis] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [revenueSplitData, setRevenueSplitData] = useState([]);
  const [busy, setBusy] = useState(true);
  const [period, setPeriod] = useState("month");
  const [weekday, setWeekday] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [rows, setRows] = useState([
    {
      id: 1,
      date: "2025-11-15",
      tx: "TXN-1001",
      merchant: "KFC",
      amount: 1250.0,
      type: "Payout",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-11-14",
      tx: "TXN-1002",
      merchant: "Outfitters",
      amount: 430.5,
      type: "Refund",
      status: "Pending",
    },
    {
      id: 3,
      date: "2025-11-13",
      tx: "TXN-1003",
      merchant: "LocalMart",
      amount: 78.25,
      type: "Payout",
      status: "Completed",
    },
    {
      id: 4,
      date: "2025-11-12",
      tx: "TXN-1004",
      merchant: "XYZ Boutique",
      amount: 920.0,
      type: "Payout",
      status: "Completed",
    },
    {
      id: 5,
      date: "2025-11-11",
      tx: "TXN-1005",
      merchant: "Ora Grande",
      amount: 210.0,
      type: "Refund",
      status: "Completed",
    },
    {
      id: 6,
      date: "2025-11-10",
      tx: "TXN-1006",
      merchant: "Burger King",
      amount: 540.0,
      type: "Payout",
      status: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [isMobile, setIsMobile] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setBusy(true);
      const [k, m] = await Promise.all([getKpis(), getOffersRedeemed()]);
      if (!mounted) return;
      setKpis(k);
      setMonthlyData(m);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, []);

  // fetch revenue split whenever period, weekday or selectedDate changes
  useEffect(() => {
    let mounted = true;
    async function fetchSplit() {
      setBusy(true);
      try {
        const option =
          period === "week"
            ? weekday || null
            : period === "date"
            ? selectedDate || null
            : null;
        const rs = await getRevenueSplit(period, option);
        if (!mounted) return;
        setRevenueSplitData(rs);
      } catch {
        // ignore for now
      } finally {
        if (mounted) setBusy(false);
      }
    }
    fetchSplit();
    return () => (mounted = false);
  }, [period, weekday, selectedDate]);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // filter + paginate
  const filtered = rows.filter((r) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (
        !(
          r.tx.toLowerCase().includes(q) || r.merchant.toLowerCase().includes(q)
        )
      )
        return false;
    }
    if (typeFilter && r.type !== typeFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  const cards = busy
    ? [null, null, null, null]
    : [
        {
          title: "Total Revenue",
          value: kpis?.revenue?.value ?? "$1,240,000",
          trend: kpis?.revenue?.trend ?? "5%",
        },
        {
          title: "Total Payouts",
          value: kpis?.payouts?.value ?? "$320,000",
          trend: kpis?.payouts?.trend ?? "2%",
        },
        {
          title: "Avg. Order Value",
          value: kpis?.aov?.value ?? "$45.60",
          trend: kpis?.aov?.trend ?? "1%",
        },
        {
          title: "Refund Rate",
          value: kpis?.refunds?.value ?? "1.8%",
          trend: kpis?.refunds?.trend ?? "-0.2%",
        },
      ];

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Financial Reports
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {cards.map((c, i) => (
          <StatsCard
            key={i}
            loading={busy}
            title={c?.title}
            value={c?.value}
            trend={c?.trend}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4 gap-3">
            <h3 className="font-semibold text-black dark:text-white">
              Revenue by Category
            </h3>
            <div className="flex items-center gap-2">
              <label className="muted text-sm">Show:</label>
              <select
                className="input text-sm w-auto"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
                  // reset weekday/selectedDate when switching away
                  if (e.target.value !== "week") setWeekday("");
                  if (e.target.value !== "date") setSelectedDate("");
                }}
              >
                <option value="month">This Month</option>
                <option value="week">This Week</option>
                <option value="day">Today</option>
                <option value="date">This Date</option>
              </select>
              {period === "week" && (
                <select
                  className="input text-sm w-auto"
                  value={weekday}
                  onChange={(e) => setWeekday(e.target.value)}
                >
                  <option value="">All days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
              )}
              {period === "date" && (
                <input
                  type="date"
                  className="input text-sm w-auto"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              )}
            </div>
          </div>
          <DonutChart data={revenueSplitData} loading={busy} size={220} />
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black dark:text-white">
              Monthly Revenue
            </h3>
            <select className="input text-sm w-auto">
              <option>Last 6 Months</option>
            </select>
          </div>
          <BarChart
            data={monthlyData}
            loading={busy}
            height={240}
            color="#60a5fa"
            showValues
          />
        </div>
      </div>

      <div className="card p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold">Transactions</h3>
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <div className="w-full sm:w-auto sm:min-w-[360px]">
              <SearchBar
                placeholder="Search by Tx ID or Merchant"
                onSearch={(q) => {
                  setSearchTerm(q);
                  setPage(1);
                }}
              />
            </div>
            <select
              className="input w-full sm:w-40"
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Type</option>
              <option value="Payout">Payout</option>
              <option value="Refund">Refund</option>
            </select>
            <select
              className="input w-full sm:w-40"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Status</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        {isMobile ? (
          <div className="divide-y rounded-md overflow-hidden">
            {paged.map((r) => (
              <div key={r.id} className="px-4 py-4 bg-(--card)">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-black dark:text-white">
                      {r.tx}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {r.date} • {r.merchant}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Amount</div>
                    <div className="font-medium">${r.amount.toFixed(2)}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-500">Type</div>
                    <div className="font-medium">{r.type}</div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                        r.status === "Completed"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => {
                      setSelected(r);
                      setModalAction(
                        r.type === "Refund" ? "process-refund" : "flag"
                      );
                      setModalOpen(true);
                    }}
                    className="p-2 rounded-lg text-slate-600 hover:bg-slate-50"
                    title="Actions"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="min-w-[720px] sm:min-w-full text-sm">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Tx ID</th>
                  <th className="px-4 py-3">Merchant</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 w-32">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <td className="px-4 py-3">{r.date}</td>
                    <td className="px-4 py-3">{r.tx}</td>
                    <td className="px-4 py-3">{r.merchant}</td>
                    <td className="px-4 py-3">${r.amount.toFixed(2)}</td>
                    <td className="px-4 py-3">{r.type}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                          r.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => {
                          setSelected(r);
                          setModalAction(
                            r.type === "Refund" ? "process-refund" : "flag"
                          );
                          setModalOpen(true);
                        }}
                        className="p-2 rounded-lg text-slate-600 hover:bg-slate-50"
                        title="Actions"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="muted text-sm">{`Showing ${
            total === 0 ? 0 : start + 1
          } to ${Math.min(
            currentPage * pageSize,
            total
          )} of ${total} Transactions`}</div>
          <div className="flex items-center gap-2">
            <button
              className="btn-ghost"
              onClick={() => setPage((s) => Math.max(1, s - 1))}
              disabled={currentPage <= 1}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={i + 1 === currentPage ? "btn" : "btn-ghost"}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="btn-ghost"
              onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
              disabled={currentPage >= totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          if (!selected) return setModalOpen(false);
          if (modalAction === "process-refund") {
            setRows((prev) =>
              prev.map((x) =>
                x.id === selected.id ? { ...x, status: "Completed" } : x
              )
            );
          }
          if (modalAction === "flag") {
            setRows((prev) =>
              prev.map((x) =>
                x.id === selected.id ? { ...x, status: "Pending" } : x
              )
            );
          }
          setModalOpen(false);
        }}
        variant={modalAction === "process-refund" ? "danger" : "danger"}
        title={
          modalAction === "process-refund"
            ? "Process Refund?"
            : "Flag Transaction?"
        }
        message={
          modalAction === "process-refund"
            ? "This will process the refund for the transaction and notify the merchant. This action cannot be undone."
            : "This transaction will be flagged for review by the finance team."
        }
        confirmText={
          modalAction === "process-refund" ? "Process Refund" : "Flag"
        }
        cancelText="Cancel"
      />
    </div>
  );
}
