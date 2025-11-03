import React from "react";

export default function Pagination({ page, pageSize, total, onPage }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const prev = () => onPage(Math.max(1, page - 1));
  const next = () => onPage(Math.min(pages, page + 1));

  return (
    <div className="flex items-center justify-between gap-3">
      <div className="muted text-sm">
        Page {page} of {pages}
      </div>
      <div className="flex items-center gap-2">
        <button className="btn-ghost" onClick={prev} disabled={page <= 1}>
          Prev
        </button>
        <button className="btn-ghost" onClick={next} disabled={page >= pages}>
          Next
        </button>
      </div>
    </div>
  );
}
