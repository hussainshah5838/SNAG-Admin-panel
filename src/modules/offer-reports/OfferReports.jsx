import React, { useEffect, useState } from "react";
import { StatsCard, DonutChart, BarChart } from "../../shared/charts";
import {
  getKpis,
  getOffersRedeemed,
  getRevenueSplit,
} from "../dashboard/api/dashboard.service";
import SearchBar from "../../shared/components/SearchBar";
import ConfirmDialog from "../../shared/components/ConfirmDialog";

export default function OfferReports() {
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
      title: "Buy 1 Get 1 Free",
      merchant: "KFC",
      location: "Brooklyn",
      category: "Food",
      views: 5600,
      redemptions: 12,
      status: "Active",
    },
    {
      id: 2,
      title: "Flat 20% Off",
      merchant: "Burger King",
      location: "Manhattan",
      category: "Fashion",
      views: 4300,
      redemptions: 7,
      status: "Active",
    },
    {
      id: 3,
      title: "Free Blowdry",
      merchant: "XYZ Boutique",
      location: "Queens",
      category: "Beauty",
      views: 2100,
      redemptions: 3,
      status: "Suspended",
    },
    {
      id: 4,
      title: "Rs 500 Service",
      merchant: "Outfitters",
      location: "The Bronx",
      category: "Fashion",
      views: 900,
      redemptions: 12,
      status: "Active",
    },
    {
      id: 5,
      title: "Virao Offer Today",
      merchant: "Tony & Guy",
      location: "Staten Island",
      category: "Services",
      views: 2400,
      redemptions: 5,
      status: "Active",
    },
    {
      id: 6,
      title: "Promo 40 Off",
      merchant: "Burger King",
      location: "Harlem",
      category: "Food",
      views: 3100,
      redemptions: 10,
      status: "Suspended",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
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

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const cards = busy
    ? [null, null, null, null]
    : [
        {
          title: "Total Offers Live",
          value: kpis?.offers?.value ?? "1,320",
          trend: "10% vs Last Month",
        },
        {
          title: "Total Redemptions",
          value: kpis?.redemptions?.value ?? "218,000",
          trend: "10% vs Last Month",
        },
        {
          title: "Avg. Redemption Rate",
          value: kpis?.redemptionRate ?? "14.6%",
          trend: "32% vs Last Month",
        },
        {
          title: "Scheduled Offers",
          value: kpis?.scheduled ?? "720",
          trend: "",
        },
      ];

  // filtering
  const filtered = rows.filter((r) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (
        !(
          r.title.toLowerCase().includes(q) ||
          r.merchant.toLowerCase().includes(q)
        )
      )
        return false;
    }
    if (locationFilter && r.location !== locationFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    if (industryFilter && r.category !== industryFilter) return false;
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
          Offers Stats
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
              Offer Status Breakdown
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
              Redemptions by Category
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold">Offers Overview</h3>
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <div className="w-full sm:w-auto sm:min-w-[360px]">
              <SearchBar
                placeholder="Search by Name or Merchant"
                onSearch={(q) => {
                  setSearchTerm(q);
                  setPage(1);
                }}
              />
            </div>
            <select
              className="input w-full sm:w-40"
              value={industryFilter}
              onChange={(e) => {
                setIndustryFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Industry</option>
              {[...new Set(rows.map((r) => r.category))].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              className="input w-full sm:w-40"
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Location</option>
              {[...new Set(rows.map((r) => r.location))].map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
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
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
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
                      {r.title}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">
                      {r.merchant} • {r.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Views</div>
                    <div className="font-medium">
                      {r.views.toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-sm text-slate-500">Category</div>
                    <div className="font-medium">{r.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Redemptions</div>
                    <div className="font-medium">{r.redemptions}</div>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
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
                    </button>
                  </div>
                  <div className="flex items-center">
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
                    <button
                      onClick={() => {
                        setSelected(r);
                        setModalAction("flag");
                        setModalOpen(true);
                      }}
                      className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 ml-2"
                      title="Flag"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 3v14"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 7l-7 4-7-4"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <table className="min-w-[720px] sm:min-w-full text-sm">
              <thead>
                <tr className="text-left text-sm text-slate-500">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Merchant</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Views</th>
                  <th className="px-4 py-3">Redemptions</th>
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
                    <td className="px-4 py-3">{r.title}</td>
                    <td className="px-4 py-3">{r.merchant}</td>
                    <td className="px-4 py-3">{r.location}</td>
                    <td className="px-4 py-3">{r.category}</td>
                    <td className="px-4 py-3">{r.views.toLocaleString()}</td>
                    <td className="px-4 py-3">{r.redemptions}</td>
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
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M3 6h18M8 6v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6M10 6V4a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => {
                          setSelected(r);
                          setModalAction("flag");
                          setModalOpen(true);
                        }}
                        className="p-2 rounded-lg text-slate-600 hover:bg-slate-50 ml-2"
                        title="Flag"
                      >
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M5 3v14"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 7l-7 4-7-4"
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
        )}

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
          // flag action could set a flagged state; for now we'll just close
          setModalOpen(false);
        }}
        variant={modalAction === "activate" ? "success" : "danger"}
        title={
          modalAction === "delete"
            ? "Permanently Delete Offer?"
            : modalAction === "suspend"
            ? "Suspend Offer?"
            : modalAction === "flag"
            ? "Flag Offer for Review?"
            : "Reactivate Offer?"
        }
        message={
          modalAction === "delete"
            ? "This action will permanently remove the offer from the platform, including all its data (views, redemptions, stats). This cannot be undone."
            : modalAction === "suspend"
            ? "This offer will no longer be visible to users or redeemable. You can reactivate it anytime."
            : modalAction === "flag"
            ? "This offer will be sent to the Fraud Review team. No immediate action will be taken until confirmed."
            : "This expired offer will be reactivated and shown to users again."
        }
        confirmText={
          modalAction === "delete"
            ? "Delete Offer"
            : modalAction === "suspend"
            ? "Suspend Offer"
            : modalAction === "flag"
            ? "Flag Offer"
            : "Activate Offer"
        }
        cancelText="Cancel"
      />
    </div>
  );
}
