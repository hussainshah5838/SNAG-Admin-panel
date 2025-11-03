import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../../../shared/components/SearchBar";
import Pagination from "../../../shared/components/Pagination";
import RetailersTable from "./components/RetailersTable";
import RetailerDrawer from "./components/RetailerDrawer";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import { listRetailers, deleteRetailer } from "../api/iam.service";
import useDebounce from "../../../shared/hooks/useDebounce";

export default function RetailersList() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ items: [], total: 0 });
  const [busy, setBusy] = useState(true);
  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const debounced = useDebounce(q, 300);

  useEffect(() => {
    let mounted = true;
    async function run() {
      setBusy(true);
      const res = await listRetailers({ q: debounced, page, limit: 10 });
      if (!mounted) return;
      setData(res);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, [debounced, page]);

  const onCreate = () => {
    setEditRow(null);
    setOpen(true);
  };

  const onEdit = (row) => {
    setEditRow(row);
    setOpen(true);
  };

  const onDelete = (row) => setConfirm(row);

  const afterSave = () => {
    setOpen(false);
    setPage(1);
    setQ((v) => v);
  };

  const rows = useMemo(() => data.items, [data.items]);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Search retailers by name…"
        />
        <button className="btn" onClick={onCreate}>
          Add Retailer
        </button>
      </div>

      <RetailersTable
        rows={rows}
        loading={busy}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <Pagination
        page={page}
        pageSize={10}
        total={data.total}
        onPageChange={setPage}
      />

      {open && (
        <RetailerDrawer
          open={open}
          onClose={() => setOpen(false)}
          row={editRow}
          onSaved={afterSave}
        />
      )}
      {confirm && (
        <ConfirmDialog
          title="Delete retailer?"
          body={`Remove ${confirm.name} from SNAG?`}
          confirmText="Delete"
          onCancel={() => setConfirm(null)}
          onConfirm={async () => {
            await deleteRetailer(confirm.id);
            setConfirm(null);
            setPage(1);
            setQ((v) => v);
          }}
        />
      )}
    </div>
  );
}
