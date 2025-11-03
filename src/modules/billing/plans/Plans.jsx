import React, { useState } from "react";
import DataTable from "../../../shared/components/DataTable";
import Drawer from "../../../shared/components/Drawer";

export default function Plans() {
  const [rows, setRows] = useState([
    { id: "p_free", name: "Free", price: "$0", perks: "Basic analytics" },
    {
      id: "p_pro",
      name: "Pro",
      price: "$199",
      perks: "Advanced analytics, approvals",
    },
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
      return [...list, { ...p, id: `plan_${Date.now()}` }];
    });
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Plans</h3>
        <button className="btn" onClick={() => setEditing({})}>
          Add Plan
        </button>
      </div>
      <DataTable
        columns={[
          { key: "name", header: "Plan" },
          { key: "price", header: "Price" },
          { key: "perks", header: "Perks" },
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
        title={editing?.id ? "Edit Plan" : "Add Plan"}
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
            <div className="muted text-sm">Price</div>
            <input
              className="input"
              value={editing?.price || ""}
              onChange={(e) =>
                setEditing((f) => ({ ...f, price: e.target.value }))
              }
            />
          </label>
          <label className="block">
            <div className="muted text-sm">Perks</div>
            <textarea
              className="input min-h-[100px]"
              value={editing?.perks || ""}
              onChange={(e) =>
                setEditing((f) => ({ ...f, perks: e.target.value }))
              }
            />
          </label>
        </div>
      </Drawer>
    </div>
  );
}
