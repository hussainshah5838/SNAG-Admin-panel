import React, { useEffect, useMemo, useRef, useState } from "react";
import ThemeSwitch from "../shared/components/ThemeSwitch.jsx";
import UserMenu from "./UserMenu.jsx";
import useLocalStorage from "../shared/hooks/useLocalStorage.js";

/* ------------ tiny inline icons (no deps) ------------ */
const Icon = ({ name, className = "w-5 h-5" }) => {
  const c = "stroke-current";
  switch (name) {
    case "menu":
      return (
        <svg viewBox="0 0 24 24" className={`${className} ${c}`} fill="none">
          <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="1.7" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 24 24" className={`${className} ${c}`} fill="none">
          <path
            d="M15 17H5.5c-.83 0-1.5-.67-1.5-1.5 0-.38.15-.74.41-1.01A5.5 5.5 0 0 0 6 11V9a6 6 0 1 1 12 0v2c0 1.23.49 2.4 1.35 3.26.26.27.41.63.41 1.01 0 .83-.67 1.5-1.5 1.5H15Zm-6 0a3 3 0 0 0 6 0"
            strokeWidth="1.6"
          />
        </svg>
      );
    case "dot":
      return (
        <svg viewBox="0 0 12 12" className={className} fill="currentColor">
          <circle cx="6" cy="6" r="6" />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" className={`${className} ${c}`} fill="none">
          <path d="M6 6l12 12M18 6L6 18" strokeWidth="1.6" />
        </svg>
      );
    default:
      return null;
  }
};

/* ------------ defaults (used on first load) ------------ */
const demoNotifications = [
  {
    id: "n1",
    title: "New retailer signup",
    body: "“TechHub Downtown” requested verification.",
    ts: Date.now() - 1000 * 60 * 12,
    read: false,
    type: "info",
  },
  {
    id: "n2",
    title: "Unusual redemption pattern",
    body: "High velocity redemptions in Zone B (flagged).",
    ts: Date.now() - 1000 * 60 * 45,
    read: false,
    type: "warning",
  },
  {
    id: "n3",
    title: "Export ready",
    body: "Your cohort export has finished generating.",
    ts: Date.now() - 1000 * 60 * 90,
    read: true,
    type: "success",
  },
];

/* ------------ helper ------------ */
const timeAgo = (t) => {
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

export default function Header({ onMenuClick, onSearch }) {
  const [query, setQuery] = useState("");

  const submitSearch = (e) => {
    e?.preventDefault?.();
    if (onSearch && query.trim()) onSearch(query.trim());
  };

  return (
    <header
      className="sticky top-0 z-40 border-b app-header"
      style={{ borderColor: "var(--line)" }}
    >
      {/* three columns: left (menu/logo), center (search), right (icons) */}
      <div className="h-14 flex items-center justify-between gap-2 px-3 sm:gap-3">
        {/* left: mobile menu and brand */}
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0"
            aria-label="Open menu"
          >
            <Icon name="menu" />
          </button>
          {/* Show brand name on mobile when sidebar is closed */}
          <div className="md:hidden font-semibold text-lg truncate">Snag</div>
        </div>

        {/* center: search (responsive width) */}
        <form onSubmit={submitSearch} className="flex-1 max-w-xl mx-2 sm:mx-6">
          <input
            className="w-full input px-3 py-2 rounded-xl outline-none text-sm sm:text-base"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {/* right: pinned icons (responsive) */}
        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <NotificationsBell />
          </div>
          <ThemeSwitch />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

/* =====================================================
 * Notifications Bell + Panel
 * ===================================================== */
function NotificationsBell() {
  const [items, setItems] = useLocalStorage(
    "snag.notifications",
    demoNotifications
  );
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const btnRef = useRef(null);

  const unread = useMemo(() => items.filter((n) => !n.read).length, [items]);

  // close on outside click / ESC
  useEffect(() => {
    const onDoc = (e) => {
      if (!open) return;
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  const markAllRead = () =>
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));

  const toggleRead = (id) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );

  const remove = (id) => setItems((prev) => prev.filter((n) => n.id !== id));

  const clearAll = () => setItems([]);

  // Small color chip by type
  const chipClass = (t) =>
    ({
      info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200",
      warning:
        "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
      success:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200",
    }[t] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200");

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Notifications"
      >
        <Icon name="bell" />
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 grid place-items-center w-4 h-4 rounded-full bg-rose-600 text-white text-[10px]">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 mt-2 w-88 max-h-104 overflow-hidden rounded-xl border shadow-xl"
          style={{ borderColor: "var(--line)", background: "var(--card)" }}
        >
          {/* header */}
          <div
            className="flex items-center justify-between px-3 py-2 border-b"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="font-medium">Notifications</div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllRead}
                className="text-xs px-2 py-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 muted"
                title="Mark all as read"
              >
                Mark all
              </button>
              <button
                onClick={clearAll}
                className="text-xs px-2 py-1 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600"
                title="Clear all"
              >
                Clear
              </button>
            </div>
          </div>

          {/* list */}
          <div
            className="max-h-88 overflow-auto divide-y"
            style={{ borderColor: "var(--line)" }}
          >
            {items.length === 0 && (
              <div className="p-6 text-center muted text-sm">
                No notifications
              </div>
            )}

            {items.map((n) => (
              <div key={n.id} className="p-3 flex gap-3 items-start">
                <div
                  className={`px-2 h-6 rounded-md text-[11px] grid place-items-center ${chipClass(
                    n.type
                  )}`}
                >
                  {n.type}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm truncate">
                      {n.title}
                    </div>
                    {!n.read && (
                      <Icon name="dot" className="w-2.5 h-2.5 text-rose-600" />
                    )}
                    <div className="muted text-[11px] ml-auto">
                      {timeAgo(n.ts)}
                    </div>
                  </div>
                  <div className="muted text-sm line-clamp-2">{n.body}</div>

                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => toggleRead(n.id)}
                      className="text-xs px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      {n.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button
                      onClick={() => remove(n.id)}
                      className="text-xs px-2 py-1 rounded hover:bg-rose-50 dark:hover:bg-rose-900/30 text-rose-600"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* footer quick add (for demos) */}
          <div
            className="px-3 py-2 border-t flex items-center justify-between"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="muted text-xs">Stays until you clear it.</div>
            <button
              onClick={() =>
                setItems((prev) => [
                  {
                    id: `n${Math.random().toString(36).slice(2)}`,
                    title: "Sample alert",
                    body: "This is a demo notification.",
                    ts: Date.now(),
                    read: false,
                    type: ["info", "warning", "success"][
                      Math.floor(Math.random() * 3)
                    ],
                  },
                  ...prev,
                ])
              }
              className="text-xs px-2 py-1 rounded-lg btn-ghost"
            >
              Add demo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
