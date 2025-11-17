import React, { useState } from "react";
import DataTable from "../../../shared/components/DataTable";
import SearchBar from "../../../shared/components/SearchBar";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";

const initialTeam = [
  {
    id: 1,
    name: "Ali Khan",
    email: "alik@snag.com",
    role: "Manager",
    lastActive: "2025-06-30",
    status: "deactivated",
  },
  {
    id: 2,
    name: "Sarah Altaf",
    email: "sarah@snag.com",
    role: "Staff",
    lastActive: "2025-01-01",
    status: "active",
  },
  {
    id: 3,
    name: "Khizar Azeem",
    email: "khizar@snag.com",
    role: "Staff",
    lastActive: "2025-02-15",
    status: "active",
  },
  {
    id: 4,
    name: "Iqbal Afridi",
    email: "iqbal@snag.com",
    role: "Staff",
    lastActive: "2025-03-10",
    status: "active",
  },
];

export default function AdminControls() {
  const [email, setEmail] = useState("rajahazaifa@gmail.com");
  const [password, setPassword] = useState("password123");
  const [commission, setCommission] = useState("10%");
  const [payoutSchedule, setPayoutSchedule] = useState("Monthly");
  const [supportEmail, setSupportEmail] = useState("support@snagapp.com");

  const [team, setTeam] = useState(initialTeam);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [confirmType, setConfirmType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Staff");

  const filtered = team.filter((t) => {
    if (
      query &&
      !`${t.name} ${t.email}`.toLowerCase().includes(query.toLowerCase())
    )
      return false;
    if (statusFilter && t.status !== statusFilter) return false;
    return true;
  });

  const onConfirmAction = () => {
    if (!selected) return setShowConfirm(false);
    if (confirmType === "delete")
      setTeam((s) => s.filter((x) => x.id !== selected.id));
    if (confirmType === "deactivate")
      setTeam((s) =>
        s.map((x) =>
          x.id === selected.id ? { ...x, status: "deactivated" } : x
        )
      );
    if (confirmType === "activate")
      setTeam((s) =>
        s.map((x) => (x.id === selected.id ? { ...x, status: "active" } : x))
      );
    setSelected(null);
    setShowConfirm(false);
  };

  const handleAddUser = () => {
    const name = newName.trim();
    const mail = newEmail.trim();
    if (!name || !mail) return alert("Please provide name and email");
    const nextId = team.length ? Math.max(...team.map((t) => t.id)) + 1 : 1;
    const entry = {
      id: nextId,
      name,
      email: mail,
      role: newRole || "Staff",
      lastActive: new Date().toISOString().slice(0, 10),
      status: "active",
    };
    setTeam((s) => [entry, ...s]);
    setNewName("");
    setNewEmail("");
    setNewRole("Staff");
    setShowAddUser(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Admin Controls</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card p-4">
          <h3 className="font-semibold mb-3">Basic</h3>
          <div className="space-y-3">
            <label className="block text-sm">Email Address</label>
            <input
              className="input w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="block text-sm">Password</label>
            <div className="relative">
              <input
                type="password"
                className="input w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="card p-4">
          <h3 className="font-semibold mb-3">Platform</h3>
          <div className="space-y-3">
            <label className="block text-sm">
              Platform-Wide Commission Rate
            </label>
            <input
              className="input w-full"
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
            />

            <label className="block text-sm">Default Payout Schedule</label>
            <select
              className="input w-full"
              value={payoutSchedule}
              onChange={(e) => setPayoutSchedule(e.target.value)}
            >
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Bi-Weekly</option>
            </select>

            <label className="block text-sm">Support Contact Email</label>
            <input
              className="input w-full"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card p-4">
        <h3 className="font-semibold mb-3">Team & Roles</h3>

        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <SearchBar
              onSearch={setQuery}
              placeholder="Search by Name or Email"
            />
          </div>
          <select
            className="input w-40"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="deactivated">Deactivated</option>
          </select>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddUser(true)}
          >
            Add User
          </button>
        </div>

        {showAddUser && (
          <div className="card p-4 mb-4">
            <h4 className="font-semibold mb-2">Add User</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
              <div>
                <label className="text-sm block mb-1">Name</label>
                <input
                  className="input w-full"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Email</label>
                <input
                  className="input w-full"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm block mb-1">Role</label>
                <select
                  className="input w-full"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                >
                  <option>Staff</option>
                  <option>Manager</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="md:col-span-3 flex gap-2 justify-end mt-2">
                <button
                  className="btn"
                  onClick={() => {
                    setShowAddUser(false);
                    setNewName("");
                    setNewEmail("");
                    setNewRole("Staff");
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleAddUser}>
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        <DataTable
          columns={[
            { key: "name", header: "Name" },
            { key: "email", header: "Email" },
            { key: "role", header: "Role" },
            { key: "lastActive", header: "Last Active" },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <button
                  className={`px-3 py-1 rounded-full text-sm ${
                    r.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                  onClick={() => {
                    setSelected(r);
                    setConfirmType(
                      r.status === "active" ? "deactivate" : "activate"
                    );
                    setShowConfirm(true);
                  }}
                >
                  {r.status === "active" ? "Active" : "Deactivated"}
                </button>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (r) => (
                <button
                  className="text-red-600"
                  onClick={() => {
                    setSelected(r);
                    setConfirmType("delete");
                    setShowConfirm(true);
                  }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 6h18"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ),
            },
          ]}
          rows={filtered}
        />
      </div>

      <div className="card p-4">
        <h3 className="font-semibold mb-3">Notifications</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="toggle" />
            <span>Daily Summary Emails</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="toggle" />
            <span>Flagged Report Alerts</span>
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="toggle" />
            <span>Merchant Onboarding Notifications</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn btn-primary px-6 py-2">Save Details</button>
      </div>

      <ConfirmDialog
        open={showConfirm}
        title={
          confirmType === "delete"
            ? "Permanently Delete?"
            : confirmType === "deactivate"
            ? "Deactivate Access??"
            : "Activate Access?"
        }
        description={
          confirmType === "delete"
            ? "This action will permanently remove this admin account from the system. This cannot be undone."
            : confirmType === "deactivate"
            ? "This will temporarily remove the admin's access to the platform. They will not be able to log in until reactivated."
            : "This role will regain access to the dashboard and all role-based permissions. Make sure the assigned role is correct before confirming."
        }
        variant={
          confirmType === "delete" || confirmType === "deactivate"
            ? "danger"
            : "success"
        }
        onClose={() => setShowConfirm(false)}
        onConfirm={onConfirmAction}
      />
    </div>
  );
}
