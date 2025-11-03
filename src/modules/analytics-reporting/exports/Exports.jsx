import React, { useState } from "react";

export default function Exports() {
  const [format, setFormat] = useState("csv");
  const [type, setType] = useState("summary");

  const exportNow = () => {
    const blob = new Blob([`dummy ${type} export in ${format}`], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `snag-${type}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card p-4 space-y-3">
      <div className="font-semibold">Exports</div>
      <div className="grid sm:grid-cols-3 gap-3">
        <label className="block">
          <div className="muted text-sm">Report</div>
          <select
            className="input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="summary">Summary</option>
            <option value="redemptions">Redemptions</option>
            <option value="retailers">Retailers</option>
            <option value="users">Users</option>
          </select>
        </label>
        <label className="block">
          <div className="muted text-sm">Format</div>
          <select
            className="input"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          >
            <option value="csv">CSV</option>
            <option value="xlsx">XLSX</option>
            <option value="pdf">PDF</option>
          </select>
        </label>
      </div>
      <button className="btn" onClick={exportNow}>
        Export
      </button>
    </div>
  );
}
