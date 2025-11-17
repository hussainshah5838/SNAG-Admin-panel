import React, { useEffect, useState } from "react";
import { StatsCard, DonutChart, BarChart } from "../../shared/charts";
import {
  getKpis,
  getOffersRedeemed,
  getRevenueSplit,
} from "../dashboard/api/dashboard.service";
import SearchBar from "../../shared/components/SearchBar";
import Pagination from "../../shared/components/Pagination";
import ConfirmDialog from "../../shared/components/ConfirmDialog";

export default function UserReport() {
  const [kpis, setKpis] = useState(null);
  const [offersData, setOffersData] = useState([]);
  const [revenueSplitData, setRevenueSplitData] = useState([]);
  const [busy, setBusy] = useState(true);

  const [rows, setRows] = useState([
    {
      id: 1,
      name: "Olivia Aroth",
      mail: "Oliviaaroth@gmail.com",
      location: "Brooklyn",
      viewed: 25,
      status: "Active",
      redeemed: 12,
    },
    {
      id: 2,
      name: "Brett Freen",
      mail: "brettfreen@gmail.com",
      location: "Manhattan",
      viewed: 35,
      status: "Active",
      redeemed: 7,
    },
    {
      id: 3,
      name: "Liam Johnson",
      mail: "liamjohnson@gmail.com",
      location: "Queens",
      viewed: 125,
      status: "Suspended",
      redeemed: 3,
    },
    {
      id: 4,
      name: "Sophia Williams",
      mail: "Sophiawilliams@gmail.com",
      location: "The Bronx",
      viewed: 88,
      status: "Active",
      redeemed: 12,
    },
    {
      id: 5,
      name: "Ethan Farmer",
      mail: "Ethanfarmer@gmail.com",
      location: "Staten Island",
      viewed: 44,
      status: "Active",
      redeemed: 5,
    },
    {
      id: 6,
      name: "Noah Johnson",
      mail: "Noahjohnson@gmail.com",
      location: "Harlem",
      viewed: 80,
      status: "Suspended",
      redeemed: 10,
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null); // 'delete' | 'suspend' | 'activate'
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 640);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setBusy(true);
      const [k, o, rs] = await Promise.all([
        getKpis(),
        getOffersRedeemed(),
        getRevenueSplit(),
      ]);
      if (!mounted) return;
      setKpis(k);
      setOffersData(o);
      setRevenueSplitData(rs);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, []);

  // centralize filtering + pagination so both table and mobile card list use the same data
  const filtered = rows.filter((r) => {
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      if (
        !(r.name.toLowerCase().includes(q) || r.mail.toLowerCase().includes(q))
      )
        return false;
    }
    if (locationFilter && r.location !== locationFilter) return false;
    if (statusFilter && r.status !== statusFilter) return false;
    return true;
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = filtered.slice(start, start + pageSize);

  // Map KPIs to the requested labels (if kpis returns similar keys)
  const cards = busy
    ? [null, null, null, null]
    : [
        {
          title: "Total Users",
          value: kpis?.users?.value ?? "12,450",
          trend: kpis?.users?.trend ?? "10%",
        },
        {
          title: "Total Merchants",
          value: kpis?.merchants?.value ?? "4,540",
          trend: kpis?.merchants?.trend ?? "10%",
        },
        {
          title: "Active Offers",
          value: kpis?.offers?.value ?? "7,650",
          trend: kpis?.offers?.trend ?? "32%",
        },
        {
          title: "Total Redemptions",
          value: kpis?.redemptions?.value ?? "32,560",
          trend: kpis?.redemptions?.trend ?? "20%",
        },
      ];

  return (
    <div className="page">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">
          User Report
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-black dark:text-white">
              Revenue Split by Offer Category
            </h3>
            <select className="input text-sm w-auto">
              <option>This Month</option>
            </select>
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

      {/* User overview table */}
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
          <h3 className="text-lg font-semibold text-black dark:text-white">
            User Overview
          </h3>
          <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
            <div className="w-full sm:w-auto sm:min-w-[320px]">
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
              value={locationFilter}
              onChange={(e) => {
                setLocationFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Locations</option>
              {Array.from(new Set(rows.map((r) => r.location))).map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
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
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>

        <div className="card p-0">
          {isMobile ? (
            <div className="divide-y">
              {paged.map((r) => (
                <div key={r.id} className="px-4 py-4">
                  <div className="flex justify-between items-start">
                    <div className="text-sm font-medium">{r.name}</div>
                    <div className="text-sm text-slate-400">{r.location}</div>
                  </div>
                  <div className="mt-2 text-sm text-slate-500">{r.mail}</div>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3">
                      <div className="text-slate-500">Viewed</div>
                      <div className="font-medium">{r.viewed}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-slate-500">Redeemed</div>
                      <div className="font-medium">{r.redeemed}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUser(r);
                        if (r.status === "Active") setModalAction("suspend");
                        else setModalAction("activate");
                        setModalOpen(true);
                      }}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium shadow-sm ${
                        r.status === "Active"
                          ? "bg-emerald-500 text-white"
                          : "bg-rose-500 text-white"
                      }`}
                    >
                      {r.status}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedUser(r);
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
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
              <table className="min-w-[720px] sm:min-w-full text-sm">
                <thead>
                  <tr className="text-left text-sm text-slate-500">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Mail</th>
                    <th className="px-4 py-3">Location</th>
                    <th className="px-4 py-3">Viewed</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Redeemed</th>
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
                      <td className="px-4 py-3">{r.viewed}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUser(r);
                            if (r.status === "Active")
                              setModalAction("suspend");
                            else setModalAction("activate");
                            setModalOpen(true);
                          }}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium shadow-sm ${
                            r.status === "Active"
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          }`}
                          aria-haspopup="menu"
                          aria-expanded="false"
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
                      <td className="px-4 py-3">{r.redeemed}</td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUser(r);
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
        </div>
        <ConfirmDialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            if (!selectedUser) return setModalOpen(false);
            if (modalAction === "delete") {
              setRows((prev) => prev.filter((x) => x.id !== selectedUser.id));
            } else if (modalAction === "suspend") {
              setRows((prev) =>
                prev.map((x) =>
                  x.id === selectedUser.id ? { ...x, status: "Suspended" } : x
                )
              );
            } else if (modalAction === "activate") {
              setRows((prev) =>
                prev.map((x) =>
                  x.id === selectedUser.id ? { ...x, status: "Active" } : x
                )
              );
            }
            setModalOpen(false);
          }}
          variant={modalAction === "activate" ? "success" : "danger"}
          title={
            modalAction === "delete"
              ? "Permanently Delete User?"
              : modalAction === "suspend"
              ? "Suspend User?"
              : "Reactivate User?"
          }
          message={
            modalAction === "delete"
              ? "This action cannot be undone. The user's profile, activity history, and saved data will be permanently removed from the platform."
              : modalAction === "suspend"
              ? "This user will be temporarily restricted from accessing the platform. You can unsuspend them at any time."
              : "This user's account will be reactivated and they will regain full access to the platform."
          }
          confirmText={
            modalAction === "delete"
              ? "Delete User"
              : modalAction === "suspend"
              ? "Suspend User"
              : "Activate User"
          }
          cancelText="Cancel"
        />

        {/* Pagination controls: update page state */}
        <div className="flex items-center justify-between mt-3">
          <div className="muted text-sm">
            {(() => {
              const startDisplay = total === 0 ? 0 : start + 1;
              const endDisplay = Math.min(currentPage * pageSize, total);
              return `Showing ${startDisplay} to ${endDisplay} of ${total} Customers`;
            })()}
          </div>
          <div className="flex items-center gap-2">
            {(() => {
              const pages = [];
              const windowSize = 5;
              const half = Math.floor(windowSize / 2);
              let startPage = Math.max(1, page - half);
              let endPage = Math.min(totalPages, startPage + windowSize - 1);
              if (endPage - startPage + 1 < windowSize) {
                startPage = Math.max(1, endPage - windowSize + 1);
              }
              for (let p = startPage; p <= endPage; p++) pages.push(p);

              return (
                <>
                  <button
                    className="btn-ghost"
                    onClick={() => setPage((s) => Math.max(1, s - 1))}
                    disabled={page <= 1}
                  >
                    &lt;
                  </button>
                  {pages.map((p) => (
                    <button
                      key={p}
                      className={p === page ? "btn" : "btn-ghost"}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    className="btn-ghost"
                    onClick={() => setPage((s) => Math.min(totalPages, s + 1))}
                    disabled={page >= totalPages}
                  >
                    &gt;
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
