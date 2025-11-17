import React, { useEffect, useState } from "react";
import { StatsCard } from "../../shared/charts";
import SearchBar from "../../shared/components/SearchBar";
import ConfirmDialog from "../../shared/components/ConfirmDialog";
import { getKpis } from "../dashboard/api/dashboard.service";

export default function FraudReports() {
  const [kpis, setKpis] = useState(null);
  const [busy, setBusy] = useState(true);

  const [rows, setRows] = useState([
    {
      id: 1,
      entity: "User",
      name: "Ali Khan",
      mail: "alikhan7@gmail.com",
      reason: "Redeemed 9 offers in 2 minutes",
      date: "Aug 25, 2025",
      status: "Review",
    },
    {
      id: 2,
      entity: "Offer",
      name: "Free Meal Promo",
      mail: "sales@outfitt.com",
      reason: "Exceeds set redemption limits",
      date: "Aug 25, 2025",
      status: "Cleared",
    },
    {
      id: 3,
      entity: "Merchant",
      name: "XYZ Boutique",
      mail: "xyz@fashion.com",
      reason: "Duplicate offers on multiple days",
      date: "Aug 24, 2025",
      status: "Review",
    },
    {
      id: 4,
      entity: "Merchant",
      name: "Outfitters",
      mail: "xyz@outfitters.com",
      reason: "Duplicate offers on multiple days",
      date: "Aug 23, 2025",
      status: "Fraud",
    },
    {
      id: 5,
      entity: "User",
      name: "Kashan Ali",
      mail: "kashanaliar@gmail.com",
      reason: "6 scans from different devices",
      date: "Aug 22, 2025",
      status: "Cleared",
    },
    {
      id: 6,
      entity: "Offer",
      name: "Everything Free",
      mail: "Bking@gmail.com",
      reason: "Redeemed 15 offers in 1 minutes",
      date: "Aug 21, 2025",
      status: "Fraud",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [isMobile, setIsMobile] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setBusy(true);
      const k = await getKpis().catch(() => null);
      if (!mounted) return;
      setKpis(k);
      setBusy(false);
    })();
    return () => (mounted = false);
  }, []);

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
          title: "Flagged Users",
          value: kpis?.flaggedUsers ?? "15",
          trend: "10%",
        },
        {
          title: "Flagged Merchants",
          value: kpis?.flaggedMerchants ?? "12",
          trend: "10%",
        },
        {
          title: "Suspicious Offers",
          value: kpis?.suspiciousOffers ?? "26",
          trend: "32%",
        },
        {
          title: "High-Risk Redemptions",
          value: kpis?.highRisk ?? "8,540",
          trend: "",
        },
      ];

  const filtered = rows.filter((r) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (
        !(
          r.name.toLowerCase().includes(q) ||
          r.mail.toLowerCase().includes(q) ||
          r.reason.toLowerCase().includes(q)
        )
      )
        return false;
    }
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
          Fraud Stats
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

      <div className="card p-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold">Fraud Overview</h3>
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <div className="w-full sm:w-auto sm:min-w-[360px]">
              <SearchBar
                placeholder="Search by Name or Email"
                onSearch={(q) => {
                  setSearchTerm(q);
                  setPage(1);
                }}
              />
            </div>
            <select
              className="input w-full sm:w-40"
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Status</option>
              <option value="Review">Review</option>
              <option value="Fraud">Fraud</option>
              <option value="Cleared">Cleared</option>
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
                      {r.name}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">{r.mail}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-slate-500">Flagged</div>
                    <div className="font-medium">{r.date}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-slate-500">{r.reason}</div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(r);
                        setModalAction(
                          r.status === "Cleared"
                            ? "review"
                            : r.status === "Fraud"
                            ? "clear"
                            : "fraud"
                        );
                        setModalOpen(true);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${
                        r.status === "Cleared"
                          ? "bg-emerald-500 text-white"
                          : r.status === "Fraud"
                          ? "bg-rose-500 text-white"
                          : "bg-amber-500 text-white"
                      }`}
                    >
                      <span>{r.status}</span>
                    </button>
                  </div>
                  <div>
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
                  <th className="px-4 py-3">Entity Type</th>
                  <th className="px-4 py-3">Name / Title</th>
                  <th className="px-4 py-3">Mail</th>
                  <th className="px-4 py-3">Reason Flagged</th>
                  <th className="px-4 py-3">Flagged Date</th>
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
                    <td className="px-4 py-3">{r.entity}</td>
                    <td className="px-4 py-3">{r.name}</td>
                    <td className="px-4 py-3">{r.mail}</td>
                    <td className="px-4 py-3">{r.reason}</td>
                    <td className="px-4 py-3">{r.date}</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => {
                          setSelected(r);
                          setModalAction(
                            r.status === "Cleared"
                              ? "review"
                              : r.status === "Fraud"
                              ? "clear"
                              : "fraud"
                          );
                          setModalOpen(true);
                        }}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${
                          r.status === "Cleared"
                            ? "bg-emerald-500 text-white"
                            : r.status === "Fraud"
                            ? "bg-rose-500 text-white"
                            : "bg-amber-500 text-white"
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
          if (modalAction === "fraud")
            setRows((prev) =>
              prev.map((x) =>
                x.id === selected.id ? { ...x, status: "Fraud" } : x
              )
            );
          if (modalAction === "review")
            setRows((prev) =>
              prev.map((x) =>
                x.id === selected.id ? { ...x, status: "Review" } : x
              )
            );
          if (modalAction === "clear")
            setRows((prev) =>
              prev.map((x) =>
                x.id === selected.id ? { ...x, status: "Cleared" } : x
              )
            );
          setModalOpen(false);
        }}
        variant={
          modalAction === "clear" || modalAction === "review"
            ? "success"
            : "danger"
        }
        title={
          modalAction === "delete"
            ? "Permanently Delete?"
            : modalAction === "fraud"
            ? "Confirm Fraudulent Activity?"
            : modalAction === "review"
            ? "Mark Report As Under Review?"
            : "Clear Flag and Mark as Safe?"
        }
        message={
          modalAction === "delete"
            ? "This offer has been confirmed as fraudulent. Deleting it will permanently remove it from the platform and erase all related user activity."
            : modalAction === "fraud"
            ? "This report will be marked as confirmed fraud. Relevant actions can now be taken (such as suspending the user, merchant, or removing the offer)."
            : modalAction === "review"
            ? "This will label the flagged item for internal review. No action will be taken yet."
            : "This item will be marked safe and removed from the Fraud Reports list. No suspicious behavior will remain linked to the profile or offer."
        }
        confirmText={
          modalAction === "delete"
            ? "Yes, Delete"
            : modalAction === "fraud"
            ? "Mark as Fraud"
            : modalAction === "review"
            ? "Mark as Under Review"
            : "Mark as Clear"
        }
        cancelText="Cancel"
      />
    </div>
  );
}
