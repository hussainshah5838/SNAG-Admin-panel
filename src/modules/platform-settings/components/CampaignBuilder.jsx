import React from "react";

export default function CampaignBuilder({ value, onChange }) {
  const set = (k, v) => onChange?.({ ...value, [k]: v });
  return (
    <div className="card p-4 space-y-3">
      <div className="font-semibold">Campaign Builder</div>
      <label className="block">
        <div className="muted text-sm">Name</div>
        <input
          className="input"
          value={value?.name || ""}
          onChange={(e) => set("name", e.target.value)}
        />
      </label>
      <label className="block">
        <div className="muted text-sm">Channel</div>
        <select
          className="input"
          value={value?.channel || "push"}
          onChange={(e) => set("channel", e.target.value)}
        >
          <option>push</option>
          <option>email</option>
          <option>sms</option>
        </select>
      </label>
      <label className="block">
        <div className="muted text-sm">Segment</div>
        <input
          className="input"
          value={value?.segment || ""}
          onChange={(e) => set("segment", e.target.value)}
        />
      </label>
      <label className="block">
        <div className="muted text-sm">Send at</div>
        <input
          className="input"
          value={value?.sendAt || ""}
          onChange={(e) => set("sendAt", e.target.value)}
          placeholder="17:00"
        />
      </label>
      <button className="btn">Schedule</button>
    </div>
  );
}
