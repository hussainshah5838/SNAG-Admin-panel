import React, { Suspense, lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PATHS } from "./paths";
import AdminLayout from "../layouts/AdminLayout";
import Loading from "../components/Loading";

// Core pages
const Login = lazy(() => import("../auth"));
const Dashboard = lazy(() => import("../modules/dashboard"));
const Profile = lazy(() => import("../modules/profile"));
const AccountSettings = lazy(() => import("../modules/account"));

// Identity & Access
const UsersList = lazy(() =>
  import("../modules/identity-access/users/List.jsx")
);
const RetailersList = lazy(() =>
  import("../modules/identity-access/retailers/List.jsx")
);
const InvitesList = lazy(() =>
  import("../modules/identity-access/invites/InvitesList.jsx")
);
const AuditLog = lazy(() =>
  import("../modules/identity-access/audit/AuditLog.jsx")
);

// Deals Oversight
const DealsLive = lazy(() =>
  import("../modules/deals-oversight/live/List.jsx")
);
const DealsApprovals = lazy(() =>
  import("../modules/deals-oversight/approvals/Queue.jsx")
);
const DealsCategories = lazy(() =>
  import("../modules/deals-oversight/categories/Categories.jsx")
);
const DealsViolations = lazy(() =>
  import("../modules/deals-oversight/violations/Violations.jsx")
);

// Trust & Safety
const TrustCases = lazy(() =>
  import("../modules/trust-safety/cases/Cases.jsx")
);
const TrustRedemptions = lazy(() =>
  import("../modules/trust-safety/redemptions/Explorer.jsx")
);

// Analytics & Reporting (Overview removed)
const AnalyticsExports = lazy(() =>
  import("../modules/analytics-reporting/exports/Exports.jsx")
);

// Billing
const BillingPlans = lazy(() => import("../modules/billing/plans/Plans.jsx"));
const BillingInvoices = lazy(() =>
  import("../modules/billing/invoices/Invoices.jsx")
);
const BillingPayouts = lazy(() =>
  import("../modules/billing/payouts/Payouts.jsx")
);

// Settings
const SettingsLogs = lazy(() =>
  import("../modules/platform-settings/notifications/Logs.jsx")
);
const SettingsDocs = lazy(() =>
  import("../modules/platform-settings/legal-help/Docs.jsx")
);
const router = createBrowserRouter([
  { path: PATHS.ROOT, element: <Navigate to={PATHS.DASHBOARD} replace /> },
  {
    path: PATHS.LOGIN,
    element: (
      <Suspense fallback={<Loading />}>
        <Login />
      </Suspense>
    ),
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: PATHS.DASHBOARD,
        element: (
          <Suspense fallback={<Loading />}>
            <Dashboard />
          </Suspense>
        ),
      },

      {
        path: PATHS.PROFILE,
        element: (
          <Suspense fallback={<Loading />}>
            <Profile />
          </Suspense>
        ),
      },

      {
        path: PATHS.ACCOUNT_SETTINGS,
        element: (
          <Suspense fallback={<Loading />}>
            <AccountSettings />
          </Suspense>
        ),
      },

      {
        path: PATHS.USERS,
        element: (
          <Suspense fallback={<Loading />}>
            <UsersList />
          </Suspense>
        ),
      },
      {
        path: PATHS.RETAILERS,
        element: (
          <Suspense fallback={<Loading />}>
            <RetailersList />
          </Suspense>
        ),
      },
      /* Roles route removed */
      {
        path: PATHS.INVITES,
        element: (
          <Suspense fallback={<Loading />}>
            <InvitesList />
          </Suspense>
        ),
      },
      {
        path: PATHS.AUDIT,
        element: (
          <Suspense fallback={<Loading />}>
            <AuditLog />
          </Suspense>
        ),
      },

      {
        path: PATHS.DEALS_LIVE,
        element: (
          <Suspense fallback={<Loading />}>
            <DealsLive />
          </Suspense>
        ),
      },
      {
        path: PATHS.DEALS_APPROVALS,
        element: (
          <Suspense fallback={<Loading />}>
            <DealsApprovals />
          </Suspense>
        ),
      },
      /* Assets Library route removed */
      {
        path: PATHS.DEALS_CATEGORIES,
        element: (
          <Suspense fallback={<Loading />}>
            <DealsCategories />
          </Suspense>
        ),
      },
      {
        path: PATHS.DEALS_VIOLATIONS,
        element: (
          <Suspense fallback={<Loading />}>
            <DealsViolations />
          </Suspense>
        ),
      },

      {
        path: PATHS.TRUST_CASES,
        element: (
          <Suspense fallback={<Loading />}>
            <TrustCases />
          </Suspense>
        ),
      },
      {
        path: PATHS.TRUST_REDEMPTIONS,
        element: (
          <Suspense fallback={<Loading />}>
            <TrustRedemptions />
          </Suspense>
        ),
      },

      // Overview route removed from Analytics & Reporting
      {
        path: PATHS.ANALYTICS_EXPORTS,
        element: (
          <Suspense fallback={<Loading />}>
            <AnalyticsExports />
          </Suspense>
        ),
      },

      {
        path: PATHS.BILLING_PLANS,
        element: (
          <Suspense fallback={<Loading />}>
            <BillingPlans />
          </Suspense>
        ),
      },
      {
        path: PATHS.BILLING_INVOICES,
        element: (
          <Suspense fallback={<Loading />}>
            <BillingInvoices />
          </Suspense>
        ),
      },
      {
        path: PATHS.BILLING_PAYOUTS,
        element: (
          <Suspense fallback={<Loading />}>
            <BillingPayouts />
          </Suspense>
        ),
      },

      {
        path: PATHS.SETTINGS_LOGS,
        element: (
          <Suspense fallback={<Loading />}>
            <SettingsLogs />
          </Suspense>
        ),
      },
      {
        path: PATHS.SETTINGS_LOGS,
        element: (
          <Suspense fallback={<Loading />}>
            <SettingsLogs />
          </Suspense>
        ),
      },
      {
        path: PATHS.SETTINGS_DOCS,
        element: (
          <Suspense fallback={<Loading />}>
            <SettingsDocs />
          </Suspense>
        ),
      },
    ],
  },
  { path: "*", element: <div className="card p-8">Not Found</div> },
]);

export default router;
