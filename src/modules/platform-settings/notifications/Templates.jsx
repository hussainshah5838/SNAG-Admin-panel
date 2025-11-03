import React, { useState } from "react";
import TemplateEditor from "../components/TemplateEditor";

export default function Templates() {
  const [selected, setSelected] = useState({
    id: "t_new",
    name: "New Template",
    channel: "push",
    body: "Hello {{name}}, there's a new deal nearby!",
  });

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="card p-3 space-y-2 lg:col-span-1">
        {["Welcome", "Deal Nearby", "Weekly Summary"].map((n, i) => (
          <button
            key={i}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50"
            onClick={() =>
              setSelected({
                id: `tpl_${i}`,
                name: n,
                channel: "push",
                body: `${n} body…`,
              })
            }
          >
            {n}
          </button>
        ))}
      </div>
      <div className="lg:col-span-2">
        <TemplateEditor value={selected} onChange={setSelected} />
      </div>
    </div>
  );
}
