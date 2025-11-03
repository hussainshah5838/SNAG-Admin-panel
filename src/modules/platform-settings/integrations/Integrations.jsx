import React, { useState } from "react";

export default function Integrations() {
  const [cfg, setCfg] = useState({
    googleMapsKey: "",
    stripeKey: "",
    apnsKey: "",
  });
  const set = (k, v) => setCfg((s) => ({ ...s, [k]: v }));

  return (
    <div className="card p-4 space-y-3">
      <h3 className="font-semibold">Integrations</h3>
      <label className="block">
        <div className="muted text-sm">Google Maps API Key</div>
        <input
          className="input"
          value={cfg.googleMapsKey}
          onChange={(e) => set("googleMapsKey", e.target.value)}
        />
      </label>
      <label className="block">
        <div className="muted text-sm">Stripe Secret</div>
        <input
          className="input"
          value={cfg.stripeKey}
          onChange={(e) => set("stripeKey", e.target.value)}
        />
      </label>
      <label className="block">
        <div className="muted text-sm">APNs Key</div>
        <input
          className="input"
          value={cfg.apnsKey}
          onChange={(e) => set("apnsKey", e.target.value)}
        />
      </label>
      <button className="btn">Save</button>
    </div>
  );
}
