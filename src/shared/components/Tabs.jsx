import React from "react";

export default function Tabs({ tabs = [], current, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const active = current === t.value;
        return (
          <button
            key={t.value}
            onClick={() => onChange?.(t.value)}
            className={`h-9 px-3 rounded-xl border ${
              active ? "bg-[--primary] text-white" : "bg-transparent"
            }`}
            style={{ borderColor: "var(--line)" }}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
