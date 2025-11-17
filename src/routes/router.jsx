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

// Deals redemptions (moved from Trust & Safety)
const DealsRedemptions = lazy(() =>
  import("../modules/deals-oversight/redemptions/Explorer.jsx")
);

const UserReport = lazy(() => import("../modules/user-report"));
const MerchantReports = lazy(() => import("../modules/merchant-reports"));
const FinancialReports = lazy(() => import("../modules/financial-reports"));
const FraudReports = lazy(() => import("../modules/fraud-reports"));
const OfferReports = lazy(() => import("../modules/offer-reports"));

// Platform Settings - Admin Controls
const SettingsAdminControls = lazy(() =>
  import("../modules/platform-settings/admin-controls/AdminControls.jsx")
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
        path: PATHS.USER_REPORT,
        element: (
          <Suspense fallback={<Loading />}>
            <UserReport />
          </Suspense>
        ),
      },
      {
        path: PATHS.MERCHANT_REPORTS,
        element: (
          <Suspense fallback={<Loading />}>
            <MerchantReports />
          </Suspense>
        ),
      },
      {
        path: PATHS.FINANCIAL_REPORTS,
        element: (
          <Suspense fallback={<Loading />}>
            <FinancialReports />
          </Suspense>
        ),
      },
      {
        path: PATHS.FRAUD_REPORTS,
        element: (
          <Suspense fallback={<Loading />}>
            <FraudReports />
          </Suspense>
        ),
      },
      {
        path: PATHS.OFFER_REPORTS,
        element: (
          <Suspense fallback={<Loading />}>
            <OfferReports />
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
        path: PATHS.DEALS_REDEMPTIONS,
        element: (
          <Suspense fallback={<Loading />}>
            <DealsRedemptions />
          </Suspense>
        ),
      },

      // Analytics Exports route removed

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
        path: PATHS.SETTINGS_ADMIN_CONTROLS,
        element: (
          <Suspense fallback={<Loading />}>
            <SettingsAdminControls />
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
