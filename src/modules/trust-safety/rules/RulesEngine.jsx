import React, { useState } from "react";
import DataTable from "../../../shared/components/DataTable";
import Drawer from "../../../shared/components/Drawer";

export default function RulesEngine() {
  const [rows, setRows] = useState([
    { id: "rl1", name: "Velocity > 5/min", severity: "high", action: "flag" },
    { id: "rl2", name: "Radius mismatch", severity: "med", action: "suspend" },
  ]);
  const [editing, setEditing] = useState(null);

  const save = (p) => {
    setRows((list) => {
      const i = list.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const c = [...list];
        c[i] = p;
        return c;
      }
      return [...list, { ...p, id: `rule_${Date.now()}` }];
    });
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Detection Rules</h3>
        <button className="btn" onClick={() => setEditing({})}>
          Add Rule
        </button>
      </div>
      <DataTable
        columns={[
          { key: "name", header: "Rule" },
          { key: "severity", header: "Severity" },
          { key: "action", header: "Action" },
          {
            key: "actions",
            header: "",
            render: (r) => (
              <button className="btn-ghost" onClick={() => setEditing(r)}>
                Edit
              </button>
            ),
          },
        ]}
        rows={rows}
      />
      <Drawer
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.id ? "Edit Rule" : "Add Rule"}
        footer={
          <div className="flex justify-end gap-2">
            <button className="btn-ghost" onClick={() => setEditing(null)}>
              Cancel
            </button>
            <button className="btn" onClick={() => save(editing)}>
              Save
            </button>
          </div>
        }
      >
        <div className="space-y-3">
          <label className="block">
            <div className="muted text-sm">Name</div>
            <input
              className="input"
              value={editing?.name || ""}
              onChange={(e) =>
                setEditing((f) => ({ ...f, name: e.target.value }))
              }
            />
          </label>
          <label className="block">
            <div className="muted text-sm">Severity</div>
            <select
              className="input"
              value={editing?.severity || "med"}
              onChange={(e) =>
                setEditing((f) => ({ ...f, severity: e.target.value }))
              }
            >
              <option value="low">low</option>
              <option value="med">med</option>
              <option value="high">high</option>
            </select>
          </label>
          <label className="block">
            <div className="muted text-sm">Action</div>
            <select
              className="input"
              value={editing?.action || "flag"}
              onChange={(e) =>
                setEditing((f) => ({ ...f, action: e.target.value }))
              }
            >
              <option>flag</option>
              <option>suspend</option>
              <option>notify</option>
            </select>
          </label>
        </div>
      </Drawer>
    </div>
  );
}
