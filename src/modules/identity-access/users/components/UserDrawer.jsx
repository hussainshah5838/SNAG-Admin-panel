import React, { useEffect, useState } from "react";
import Drawer from "../../../../shared/components/Drawer";
import { createUser, updateUser } from "../../api/iam.service";

export default function UserDrawer({ open, onClose, row, onSaved }) {
  const isEdit = !!row;
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Viewer",
    status: "active",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (row)
      setForm({
        name: row.name,
        email: row.email,
        role: row.role,
        status: row.status,
      });
  }, [row]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    if (isEdit) await updateUser(row.id, form);
    else await createUser(form);
    setBusy(false);
    onSaved?.();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Add User"}
    >
      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <div className="text-sm text-slate-600 mb-1">Name</div>
          <input
            className="input w-full"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label className="block">
          <div className="text-sm text-slate-600 mb-1">Email</div>
          <input
            type="email"
            className="input w-full"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-sm text-slate-600 mb-1">Role</div>
            <select
              className="input w-full"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option>Admin</option>
              <option>Retailer</option>
              <option>Moderator</option>
              <option>Viewer</option>
            </select>
          </label>
          <label className="block">
            <div className="text-sm text-slate-600 mb-1">Status</div>
            <select
              className="input w-full"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </label>
        </div>

        <div className="pt-3 flex items-center justify-end gap-2">
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn" disabled={busy}>
            {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    </Drawer>
  );
}
