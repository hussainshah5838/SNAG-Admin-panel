import React from "react";

export default function TemplateEditor({ value, onChange }) {
  const set = (k, v) => onChange?.({ ...value, [k]: v });

  return (
    <div className="card p-4 space-y-3">
      <div className="font-semibold">Template</div>
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
        <div className="muted text-sm">Body</div>
        <textarea
          className="input min-h-[140px]"
          value={value?.body || ""}
          onChange={(e) => set("body", e.target.value)}
        />
      </label>
    </div>
  );
}
