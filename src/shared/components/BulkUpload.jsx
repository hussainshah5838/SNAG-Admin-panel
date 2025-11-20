import React, { useState, useRef } from "react";
import Papa from "papaparse";

// Simple reusable bulk upload + preview component
export default function BulkUpload({
  accept = ".csv",
  columns = [],
  onImport,
}) {
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState([]);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef(null);

  function validateRow(row, index) {
    const rowErrors = [];
    columns.forEach((col) => {
      if (col.required && !row[col.key]) {
        rowErrors.push(`${col.key} is required`);
      }
      if (col.type === "number" && row[col.key]) {
        if (isNaN(Number(row[col.key])))
          rowErrors.push(`${col.key} must be numeric`);
      }
      if (col.type === "date" && row[col.key]) {
        const d = new Date(row[col.key]);
        if (isNaN(d.getTime()))
          rowErrors.push(`${col.key} must be a valid date`);
      }
    });
    return rowErrors.length ? { index, errors: rowErrors } : null;
  }

  function onFile(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    Papa.parse(f, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        setRows(res.data);
        const allErrors = [];
        res.data.forEach((r, i) => {
          const v = validateRow(r, i + 1);
          if (v) allErrors.push(v);
        });
        setErrors(allErrors);
      },
    });
  }

  function handleChoose() {
    if (inputRef.current) inputRef.current.click();
  }

  function handleClear() {
    setFileName("");
    setRows([]);
    setErrors([]);
    if (inputRef.current) inputRef.current.value = null;
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={onFile}
          style={{ display: "none" }}
        />
        <button type="button" className="btn" onClick={handleChoose}>
          {fileName ? "Choose different file" : "Choose file"}
        </button>
        <div className="muted text-sm">{fileName || "No file chosen"}</div>
        <div className="ml-auto flex items-center gap-2">
          {fileName && (
            <button type="button" className="btn-ghost" onClick={handleClear}>
              Clear
            </button>
          )}
          <button
            className="btn"
            onClick={() => onImport && onImport(rows)}
            disabled={!rows.length || errors.length > 0}
          >
            Import ({rows.length})
          </button>
        </div>
      </div>

      {errors.length > 0 && (
        <div className="p-3 bg-rose-50 rounded-md text-sm text-rose-700">
          <strong>Validation errors:</strong>
          <ul className="mt-2 list-disc pl-5">
            {errors.slice(0, 10).map((e) => (
              <li key={e.index}>
                Row {e.index}: {e.errors.join(", ")}
              </li>
            ))}
            {errors.length > 10 && <li>...and more</li>}
          </ul>
        </div>
      )}

      {rows.length > 0 && (
        <div className="overflow-auto border rounded-md">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 dark:bg-slate-800">
              <tr>
                {Object.keys(rows[0])
                  .slice(0, 12)
                  .map((h) => (
                    <th key={h} className="px-3 py-2 text-left">
                      {h}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 50).map((r, i) => (
                <tr key={i} className={i % 2 ? "bg-white" : ""}>
                  {Object.keys(r)
                    .slice(0, 12)
                    .map((k) => (
                      <td key={k} className="px-3 py-2">
                        {r[k]}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length > 50 && (
            <div className="p-2 muted text-sm">Showing first 50 rows</div>
          )}
        </div>
      )}
    </div>
  );
}
