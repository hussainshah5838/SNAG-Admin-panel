import React from "react";
import { getLibrary } from "../api/deals.service";

export default function Library() {
  const rows = getLibrary();

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((x) => (
        <figure key={x.id} className="card overflow-hidden">
          <img src={x.url} alt="" className="w-full h-40 object-cover" />
          <figcaption className="p-3">
            <div className="font-medium">{x.label}</div>
            <div className="muted text-sm">{x.tags.join(", ")}</div>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
