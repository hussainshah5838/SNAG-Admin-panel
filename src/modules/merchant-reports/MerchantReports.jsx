import React, { useEffect, useState } from "react";
import { StatsCard, DonutChart, BarChart } from "../../shared/charts";
import {
  getKpis,
  getOffersRedeemed,
  getRevenueSplit,
} from "../dashboard/api/dashboard.service";
import SearchBar from "../../shared/components/SearchBar";
import ConfirmDialog from "../../shared/components/ConfirmDialog";

export default function MerchantReports() {
  const [kpis, setKpis] = useState(null);
  const [offersData, setOffersData] = useState([]);
  const [revenueSplitData, setRevenueSplitData] = useState([]);
  const [busy, setBusy] = useState(true);
  const [period, setPeriod] = useState("month");
  const [weekday, setWeekday] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "KFC",
      mail: "kfc@snag.com",
      location: "Brooklyn",
      offers: 25,
      views: 5600,
      rate: 12,
      status: "Active",
      industry: "F&B",
    },
    {
      id: 2,
      name: "Outfitters",
      mail: "sales@outfitt.com",
      location: "Manhattan",
      offers: 35,
      views: 4300,
      rate: 7,
      status: "Active",
      industry: "Fashion",
    },
    {
      id: 3,
      name: "LocalMart",
      mail: "info@localmart.pk",
      location: "Queens",
      offers: 125,
      views: 2100,
      rate: 3,
      status: "Suspended",
      industry: "Grocery",
    },
    {
      id: 4,
      name: "XYZ Boutique",
      mail: "xyz@fashion.com",
      location: "The Bronx",
      offers: 88,
      views: 900,
      rate: 12,
      status: "Active",
      industry: "Fashion",
    },
    {
      id: 5,
      name: "Ora Grande",
      mail: "oragrande@rmail.com",
      location: "Staten Island",
      offers: 56,
      views: 2400,
      rate: 5,
      status: "Active",
      industry: "F&B",
    },
    {
      id: 6,
      name: "Burger King",
      mail: "bking@gmail.com",
      location: "Harlem",
      offers: 80,
      views: 3100,
      rate: 10,
      status: "Suspended",
      industry: "F&B",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setBusy(true);
      const [k, o] = await Promise.all([getKpis(), getOffersRedeemed()]);
      if (!mounted) return;
      setKpis(k);
      setOffersData(o);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, []);

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
        // ignore
      } finally {
        if (mounted) setBusy(false);
      }
    }
    fetchSplit();
    return () => (mounted = false);
  }, [period, weekday, selectedDate]);

  const cards = busy
    ? [null, null, null, null]
    : [
        {
          title: "Total Merchants",
          value: kpis?.merchants?.value ?? "1,320",
          trend: kpis?.merchants?.trend ?? "10%",
        },
        {
          title: "Total Offers",
          value: kpis?.offers?.value ?? "3,850",
          trend: kpis?.offers?.trend ?? "10%",
        },
        {
          title: "Avg. Redemption Rate",
          value: kpis?.redemptionRate ?? "14.6%",
          trend: "32%",
        },
        { title: "Top Performing", value: "F&B", trend: "" },
      ];

  // filtering + pagination
  const filtered = rows.filter((r) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (
        !(r.name.toLowerCase().includes(q) || r.mail.toLowerCase().includes(q))
      )
        return false;
    }
    if (industryFilter && r.industry !== industryFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize
  );

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          Merchant Stats
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
              Offer Distribution by Category
            </h3>
            <div className="flex items-center gap-2">
              <label className="muted text-sm">Show:</label>
              <select
                className="input text-sm w-auto"
                value={period}
                onChange={(e) => {
                  setPeriod(e.target.value);
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
              Merchants by Redemptions
            </h3>
            <select className="input text-sm w-auto">
              <option>This Month</option>
            </select>
          </div>
          <BarChart
            data={offersData}
            loading={busy}
            height={240}
            color="#60a5fa"
            showValues
          />
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Merchant Overview</h3>
          <div className="flex items-center gap-3">
            <div style={{ minWidth: 360 }}>
              <SearchBar
                placeholder="Search by Name or Email"
                onSearch={(q) => {
                  setSearchTerm(q);
                  setPage(1);
                }}
              />
            </div>
            <select
              className="input w-40"
              value={industryFilter}
              onChange={(e) => {
                setIndustryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Industry</option>
              {[...new Set(rows.map((r) => r.industry))].map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
            <select
              className="input w-40"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <table className="min-w-[720px] sm:min-w-full text-sm">
            <thead>
              <tr className="text-left text-sm text-slate-500">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Mail</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Offers</th>
                <th className="px-4 py-3">Views</th>
                <th className="px-4 py-3">Redemption Rate</th>
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
                  <td className="px-4 py-3">{r.name}</td>
                  <td className="px-4 py-3">{r.mail}</td>
                  <td className="px-4 py-3">{r.location}</td>
                  <td className="px-4 py-3">{r.offers}</td>
                  <td className="px-4 py-3">{r.views.toLocaleString()}</td>
                  <td className="px-4 py-3">{r.rate}</td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(r);
                        setModalAction(
                          r.status === "Active" ? "suspend" : "activate"
                        );
                        setModalOpen(true);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${
                        r.status === "Active"
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      <span>{r.status}</span>
                      <svg
                        className="w-3 h-3 opacity-90"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelected(r);
                        setModalAction("delete");
                        setModalOpen(true);
                      }}
                      className="p-2 rounded-lg text-rose-600 hover:bg-rose-50"
                      title="Delete"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"
                          stroke="currentColor"
                          strokeWidth="1.8"
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

        <div className="flex items-center justify-between mt-3">
          <div className="muted text-sm">
            Showing{" "}
            {filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, filtered.length)} of{" "}
            {filtered.length} Customers
          </div>
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
          if (modalAction === "delete")
            setRows((prev) => prev.filter((x) => x.id !== selected.id));
          if (modalAction === "suspend")
            setRows((prev) =>
              prev.map((x) =>
                x.id === selected.id ? { ...x, status: "Suspended" } : x
              )
            );
          if (modalAction === "activate")
            setRows((prev) =>
              prev.map((x) =>
                x.id === selected.id ? { ...x, status: "Active" } : x
              )
            );
          setModalOpen(false);
        }}
        variant={modalAction === "activate" ? "success" : "danger"}
        title={
          modalAction === "delete"
            ? "Permanently Delete Merchant?"
            : modalAction === "suspend"
            ? "Suspend Merchant?"
            : "Reactivate Merchant?"
        }
        message={
          modalAction === "delete"
            ? "This action cannot be undone. The merchant's profile, activity history, and saved data will be permanently removed from the platform."
            : modalAction === "suspend"
            ? "The merchant is temporarily restricted from posting new offers. You can unsuspend them anytime from the Merchant Reports."
            : "The merchant will regain full access to their dashboard and all live offers will be visible to users again."
        }
        confirmText={
          modalAction === "delete"
            ? "Delete Merchant"
            : modalAction === "suspend"
            ? "Suspend Merchant"
            : "Activate Merchant"
        }
        cancelText="Cancel"
      />
    </div>
  );
}
