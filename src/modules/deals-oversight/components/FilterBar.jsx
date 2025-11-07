import React, { useEffect, useState } from "react";

export default function FilterBar({ onChange, values = {} }) {
  const [filters, setFilters] = useState({
    category: values.category || "",
    radius: values.radius || "",
    status: values.status || "",
  });

  useEffect(() => {
    onChange?.(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="card p-3 flex flex-wrap gap-2 items-center">
      <select
        className="input"
        value={filters.category}
        onChange={(e) =>
          setFilters((s) => ({ ...s, category: e.target.value }))
        }
      >
        <option value="">All Categories</option>
        <option>Fashion</option>
        <option>Electronics</option>
        <option>Beauty</option>
        <option>Food & Drink</option>
      </select>

      <select
        className="input"
        value={filters.radius}
        onChange={(e) => setFilters((s) => ({ ...s, radius: e.target.value }))}
      >
        <option value="">Any Radius</option>
        <option value="250">≤ 250m</option>
        <option value="500">≤ 500m</option>
        <option value="1000">≤ 1km</option>
      </select>

      <select
        className="input"
        value={filters.status}
        onChange={(e) => setFilters((s) => ({ ...s, status: e.target.value }))}
      >
        <option value="">Any Status</option>
        <option value="live">Live</option>
        <option value="draft">Draft</option>
        <option value="needs-approval">Needs Approval</option>
      </select>
    </div>
  );
}
