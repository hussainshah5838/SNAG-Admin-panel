import React, { useEffect, useState } from "react";
import Drawer from "../../../../shared/components/Drawer";
import { createRetailer, updateRetailer } from "../../api/iam.service";

export default function RetailerDrawer({ open, onClose, row, onSaved }) {
  const isEdit = !!row;
  const [form, setForm] = useState({
    name: "",
    contact: "",
    locations: 1,
    status: "approved",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (row)
      setForm({
        name: row.name,
        contact: row.contact,
        locations: row.locations,
        status: row.status,
      });
  }, [row]);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    if (isEdit) await updateRetailer(row.id, form);
    else await createRetailer(form);
    setBusy(false);
    onSaved?.();
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Retailer" : "Add Retailer"}
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
          <div className="text-sm text-slate-600 mb-1">Contact Email</div>
          <input
            type="email"
            className="input w-full"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            required
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-sm text-slate-600 mb-1">Locations</div>
            <input
              type="number"
              min={1}
              className="input w-full"
              value={form.locations}
              onChange={(e) =>
                setForm({ ...form, locations: Number(e.target.value) })
              }
            />
          </label>
          <label className="block">
            <div className="text-sm text-slate-600 mb-1">Status</div>
            <select
              className="input w-full"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
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
