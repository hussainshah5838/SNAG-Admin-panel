import React, { useState } from "react";
import DataTable from "../../../shared/components/DataTable";
import Drawer from "../../../shared/components/Drawer";

export default function Presets() {
  const [rows, setRows] = useState([
    {
      id: "t1",
      name: "Airport Travelers",
      filter: "geo:airport, last_seen<7d, interests:food",
    },
    {
      id: "t2",
      name: "Mall Fashionistas",
      filter: "geo:mall, interests:fashion",
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
      return [...list, { ...p, id: `preset_${Date.now()}` }];
    });
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Targeting Presets</h3>
        <button className="btn" onClick={() => setEditing({})}>
          Add Preset
        </button>
      </div>
      <DataTable
        columns={[
          { key: "name", header: "Name" },
          { key: "filter", header: "Filter" },
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
        <label className="block">
          <div className="muted text-sm">Filter (DSL)</div>
          <textarea
            className="input min-h-[120px]"
            value={editing?.filter || ""}
            onChange={(e) =>
              setEditing((f) => ({ ...f, filter: e.target.value }))
            }
          />
        </label>
      </Drawer>
    </div>
  );
}
