import React, { useState } from "react";
import DataTable from "../../../shared/components/DataTable";
import Drawer from "../../../shared/components/Drawer";

export default function Categories() {
  const [rows, setRows] = useState([
    { id: "c1", name: "Fashion" },
    { id: "c2", name: "Electronics" },
    { id: "c3", name: "Beauty" },
    { id: "c4", name: "Food & Drink" },
  ]);
  const [editing, setEditing] = useState(null);

  const save = (p) => {
    setRows((list) => {
      const i = list.findIndex((x) => x.id === p.id);
      if (i >= 0) {
        const copy = [...list];
        copy[i] = p;
        return copy;
      }
      return [...list, { ...p, id: `cat_${Date.now()}` }];
    });
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Deal Categories</h3>
        <button className="btn" onClick={() => setEditing({})}>
          Add Category
        </button>
      </div>
      <DataTable
        columns={[
          { key: "name", header: "Name" },
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
        title={editing?.id ? "Edit" : "Add"}
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
      </Drawer>
    </div>
  );
}
