import React, { useEffect, useState } from "react";
import SearchBar from "../../../shared/components/SearchBar";
import FilterBar from "../components/FilterBar";
import DealCard from "../components/DealCard";
import DealDetailsDrawer from "./DealDetailsDrawer.jsx";
import { deals } from "../api/deals.service";

export default function List() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = React.useCallback(() => {
    setRows(deals.list({ q, status: "live" }));
  }, [q]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchBar placeholder="Search live deals…" onSearch={setQ} />
        <button className="btn" onClick={() => setSelected({})}>
          Create Deal
        </button>
      </div>

      <FilterBar onChange={() => {}} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rows.map((d) => (
          <DealCard key={d.id} deal={d} onOpen={() => setSelected(d)} />
        ))}
      </div>

      <DealDetailsDrawer
        open={!!selected}
        deal={selected}
        onClose={() => setSelected(null)}
        onSave={(payload) => {
          if (payload.id) deals.update(payload.id, payload);
          else deals.create(payload);
          setSelected(null);
          load();
        }}
      />
    </div>
  );
}
