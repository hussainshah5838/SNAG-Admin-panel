import React, { useState } from "react";

export default function OperationalLimits() {
  const [limits, setLimits] = useState({
    maxLivePerRetailer: 3,
    maxRadius: 1500,
    defaultDuration: 7,
  });
  const set = (k, v) => setLimits((s) => ({ ...s, [k]: v }));

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-semibold">Operational Limits</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="block">
          <div className="muted text-sm">Max Live Deals / Retailer</div>
          <input
            type="number"
            className="input"
            value={limits.maxLivePerRetailer}
            onChange={(e) => set("maxLivePerRetailer", +e.target.value || 0)}
          />
        </label>
        <label className="block">
          <div className="muted text-sm">Max Radius (m)</div>
          <input
            type="number"
            className="input"
            value={limits.maxRadius}
            onChange={(e) => set("maxRadius", +e.target.value || 0)}
          />
        </label>
        <label className="block">
          <div className="muted text-sm">Default Duration (days)</div>
          <input
            type="number"
            className="input"
            value={limits.defaultDuration}
            onChange={(e) => set("defaultDuration", +e.target.value || 0)}
          />
        </label>
      </div>
      <button className="btn">Save Limits</button>
    </div>
  );
}
