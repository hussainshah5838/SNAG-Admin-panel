import React, { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useLocalStorage from "../shared/hooks/useLocalStorage";
import { signOut } from "../auth/api/auth.service";

/**
 * Simple inline icons (no external deps)
 */
const Icon = ({ name, className = "w-4 h-4" }) => {
  const common = "stroke-current";
  switch (name) {
    case "dashboard":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 12h8V3H3v9Zm10 9h8v-8h-8v8ZM3 21h8v-6H3v6Zm10-10h8V3h-8v8Z"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "users":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M12 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm10 14v-2a4 4 0 0 0-3-3.87M17 3a4 4 0 0 1 0 8"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "deals":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M3 7h18M4 7l2 14h12l2-14M8 7V5a4 4 0 1 1 8 0v2"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "shield":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "chart":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M3 21h18M6 10v7M12 6v11M18 13v4" strokeWidth="1.5" />
        </svg>
      );
    case "billing":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M3 7h18v10H3V7Zm0-3h18M7 17h4" strokeWidth="1.5" />
        </svg>
      );
    case "settings":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8.66-3a7.9 7.9 0 0 0-.1-1l2.1-1.64-2-3.46-2.6 1a7.9 7.9 0 0 0-1.7-1l-.4-2.8h-4l-.4 2.8a7.9 7.9 0 0 0-1.7 1l-2.6-1-2 3.46L3.44 11a7.9 7.9 0 0 0 0 2l-2.1 1.64 2 3.46 2.6-1a7.9 7.9 0 0 0 1.7 1l.4 2.8h4l.4-2.8a7.9 7.9 0 0 0 1.7-1l2.6 1 2-3.46L20.56 13a7.9 7.9 0 0 0 .1-1Z"
            strokeWidth="1.5"
          />
        </svg>
      );
    case "logout":
      return (
        <svg
          className={`${className} ${common}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M16 17l5-5-5-5M21 12H9M12 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-2"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "chev":
    default:
      return (
        <svg className={`${className}`} viewBox="0 0 24 24" fill="none">
          <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
  }
};

function Section({ id, icon, label, children, openSet, setOpenSet }) {
  const open = openSet.includes(id);
  const toggle = () =>
    setOpenSet((arr) =>
      arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]
    );
  return (
    <div className="space-y-1">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-100 hover:text-black dark:hover:bg-slate-800/60 dark:hover:text-white"
      >
        <div className="flex items-center gap-2">
          <Icon name={icon} />
          <span className="text-sm font-medium">{label}</span>
        </div>
        <Icon
          name="chev"
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pl-2">{children}</div>}
    </div>
  );
}

const Item = ({ to, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      [
        "block px-3 py-2 rounded-xl text-sm",
        "hover:bg-slate-100 hover:text-black dark:hover:bg-slate-800/60 dark:hover:text-white",
        isActive
          ? "bg-slate-100 dark:bg-slate-800/80 font-medium text-black dark:text-slate-200"
          : "muted",
      ].join(" ")
    }
  >
    {label}
  </NavLink>
);

export default function LeftSidebar({ open, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSet, setOpenSet] = useLocalStorage("snag.nav.openSet", [
    "dashboard",
    // auto-open relevant groups if route matches on first load
  ]);

  // Auto open a section if current pathname is inside it
  useMemo(() => {
    const map = {
      dashboard: ["/dashboard"],
      identity: ["/identity"],
      deals: ["/deals"],
      analytics: ["/analytics"],
      billing: ["/billing"],
      settings: ["/settings"],
    };
    const sec = Object.entries(map).find(([, prefixes]) =>
      prefixes.some((p) => location.pathname.startsWith(p))
    );
    if (sec && !openSet.includes(sec[0])) setOpenSet((s) => [...s, sec[0]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleLogout = () => {
    signOut();
    navigate("/auth/login", { replace: true });
  };

  return (
    <aside
      className={`
        w-64 shrink-0 h-screen p-3 overflow-y-auto border-r left-sidebar
        fixed md:static top-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      style={{ borderColor: "var(--line)" }}
    >
      {/* Mobile close button */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="Close menu"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="px-2 pb-2 flex items-center gap-3">
        {/* Snag logo */}
        <img
          src="/snag-logo.svg"
          alt="Snag Logo"
          className="w-10 h-10 object-contain"
          style={{ color: "var(--primary)" }}
          onError={(e) => {
            // Fallback to text if logo is not found
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling.style.display = "block";
          }}
        />
        {/* Fallback text logo (hidden by default) */}
        <div
          className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg"
          style={{ display: "none" }}
        >
          S
        </div>
        <div>
          <div className="text-lg font-semibold">Snag</div>
          <div className="muted text-xs">Admin Panel</div>
        </div>
      </div>

      <nav className="space-y-2">
        {/* Dashboard */}
        <Section
          id="dashboard"
          icon="dashboard"
          label="Dashboard"
          openSet={openSet}
          setOpenSet={setOpenSet}
        >
          <Item to="/dashboard" label="Overview" />
        </Section>

        {/* Identity & Access */}
        <Section
          id="identity"
          icon="users"
          label="Identity & Access"
          openSet={openSet}
          setOpenSet={setOpenSet}
        >
          <Item to="/identity/users" label="Users" />
          <Item to="/identity/retailers" label="Retailers" />
          <Item to="/identity/invites" label="Invites" />
          <Item to="/identity/audit" label="Audit Log" />
        </Section>

        {/* Deals Oversight */}
        <Section
          id="deals"
          icon="deals"
          label="Deals Oversight"
          openSet={openSet}
          setOpenSet={setOpenSet}
        >
          <Item to="/deals/live" label="Live Deals" />
          <Item to="/deals/approvals" label="Approvals Queue" />
          <Item to="/deals/redemptions" label="Redemptions" />
        </Section>

        {/* Trust & Safety section removed */}

        {/* Analytics */}
        <Section
          id="analytics"
          icon="chart"
          label="Analytics & Reporting"
          openSet={openSet}
          setOpenSet={setOpenSet}
        >
          <Item to="/reports/users" label="User Report" />
          <Item to="/reports/merchants" label="Merchant Reports" />
          <Item to="/reports/financials" label="Financial Reports" />
          <Item to="/reports/offers" label="Offer Reports" />
          <Item to="/reports/fraud" label="Fraud Reports" />
        </Section>

        {/* Billing */}
        <Section
          id="billing"
          icon="billing"
          label="Billing"
          openSet={openSet}
          setOpenSet={setOpenSet}
        >
          <Item to="/billing/plans" label="Plans" />
          <Item to="/billing/invoices" label="Invoices & Payouts" />
        </Section>

        {/* Platform Settings */}
        <Section
          id="settings"
          icon="settings"
          label="Platform Settings"
          openSet={openSet}
          setOpenSet={setOpenSet}
        >
          <Item to="/settings/admin-controls" label="Admin Controls" />
          <Item to="/settings/docs" label="Legal & Help" />
        </Section>
        <div
          className="pt-4 mt-6 border-t"
          style={{ borderColor: "var(--line)" }}
        >
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-500/10 transition-colors"
          >
            <Icon name="logout" />
            <span>Log Out</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}
