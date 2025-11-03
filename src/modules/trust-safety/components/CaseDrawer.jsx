import React, { useEffect, useState } from "react";
import Drawer from "../../../shared/components/Drawer";

export default function CaseDrawer({ open, caseItem, onClose, onSave }) {
  const [form, setForm] = useState(caseItem);
  useEffect(() => setForm(caseItem || {}), [caseItem]);
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Case"
      footer={
        <div className="flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>
            Close
          </button>
          <button className="btn" onClick={() => onSave(form)}>
            Save
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <label className="block">
          <div className="muted text-sm">Subject</div>
          <input
            className="input"
            value={form?.subject || ""}
            onChange={(e) => set("subject", e.target.value)}
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <div className="muted text-sm">Assignee</div>
            <input
              className="input"
              value={form?.assignee || ""}
              onChange={(e) => set("assignee", e.target.value)}
            />
          </label>
          <label className="block">
            <div className="muted text-sm">Status</div>
            <select
              className="input"
              value={form?.status || "open"}
              onChange={(e) => set("status", e.target.value)}
            >
              <option>open</option>
              <option>investigating</option>
              <option>closed</option>
            </select>
          </label>
        </div>
        <label className="block">
          <div className="muted text-sm">Notes</div>
          <textarea
            className="input min-h-[120px]"
            value={form?.notes || ""}
            onChange={(e) => set("notes", e.target.value)}
          />
        </label>
      </div>
    </Drawer>
  );
}
