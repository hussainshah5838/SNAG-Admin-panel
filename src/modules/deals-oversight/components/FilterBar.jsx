import React from "react";

export default function FilterBar({ onChange }) {
  return (
    <div className="card p-3 flex flex-wrap gap-2 items-center">
      <select className="input" onChange={onChange}>
        <option value="">All Categories</option>
        <option>Fashion</option>
        <option>Electronics</option>
        <option>Beauty</option>
        <option>Food & Drink</option>
      </select>
      <select className="input" onChange={onChange}>
        <option value="">Any Radius</option>
        <option value="250">≤ 250m</option>
        <option value="500">≤ 500m</option>
        <option value="1000">≤ 1km</option>
      </select>
      <select className="input" onChange={onChange}>
        <option value="">Any Status</option>
        <option value="live">Live</option>
        <option value="draft">Draft</option>
        <option value="needs-approval">Needs Approval</option>
      </select>
    </div>
  );
}
