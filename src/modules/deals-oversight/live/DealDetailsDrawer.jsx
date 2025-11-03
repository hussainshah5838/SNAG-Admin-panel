import React, { useEffect, useState } from "react";
import Drawer from "../../../shared/components/Drawer";

export default function DealDetailsDrawer({ open, onClose, deal, onSave }) {
  // callers may pass `deal` as null - ensure local form state is always an object
  const [form, setForm] = useState(() => deal || {});
  useEffect(() => setForm(deal || {}), [deal]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={form?.id ? "Edit Deal" : "Create Deal"}
      footer={
        <div className="flex justify-between w-full">
          <div className="muted text-xs">Status: {form.status || "draft"}</div>
          <div className="flex gap-2">
            <button className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="btn" onClick={() => onSave(form)}>
              Save
            </button>
          </div>
        </div>
      }
    >
      <div className="space-y-3">
        <label className="block">
          <div className="muted text-sm">Title</div>
          <input
            className="input"
            value={form.title || ""}
            onChange={(e) => set("title", e.target.value)}
          />
        </label>

        <label className="block">
          <div className="muted text-sm">Brand</div>
          <input
            className="input"
            value={form.brand || ""}
            onChange={(e) => set("brand", e.target.value)}
          />
        </label>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <div className="muted text-sm">Target Radius (m)</div>
            <input
              type="number"
              className="input"
              value={form.radius || 500}
              onChange={(e) => set("radius", +e.target.value || 0)}
            />
          </label>
          <label className="block">
            <div className="muted text-sm">Expires</div>
            <input
              type="date"
              className="input"
              value={
                form.expiresAt
                  ? new Date(form.expiresAt).toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) =>
                set("expiresAt", new Date(e.target.value).getTime())
              }
            />
          </label>
        </div>

        <label className="block">
          <div className="muted text-sm">Status</div>
          <select
            className="input"
            value={form.status || "draft"}
            onChange={(e) => set("status", e.target.value)}
          >
            <option>draft</option>
            <option>needs-approval</option>
            <option>live</option>
          </select>
        </label>

        <label className="block">
          <div className="muted text-sm">Image URL</div>
          <input
            className="input"
            value={form.image || ""}
            onChange={(e) => set("image", e.target.value)}
          />
        </label>

        {form.image && (
          <img
            src={form.image}
            alt=""
            className="rounded-xl border"
            style={{ borderColor: "var(--line)" }}
          />
        )}
      </div>
    </Drawer>
  );
}
