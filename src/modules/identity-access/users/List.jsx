import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "../../../shared/components/SearchBar";
import Pagination from "../../../shared/components/Pagination";
import UsersTable from "./components/UsersTable";
import UserDrawer from "./components/UserDrawer";
import ConfirmDialog from "../../../shared/components/ConfirmDialog";
import { listUsers, deleteUser } from "../api/iam.service";
import useDebounce from "../../../shared/hooks/useDebounce";

export default function UsersList() {
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
      const res = await listUsers({ q: debounced, page, limit: 10 });
      if (!mounted) return;
      setData(res);
      setBusy(false);
    }
    run();
    return () => (mounted = false);
  }, [debounced, page]);

  // expose a fetch function so we can re-run list after create/update
  const fetchData = async ({ q: qv = debounced, pg = 1 } = {}) => {
    setBusy(true);
    const res = await listUsers({ q: qv, page: pg, limit: 10 });
    setData(res);
    setBusy(false);
  };

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
    // refresh list and reset to first page so new/edited item is visible
    setPage(1);
    fetchData({ q: debounced, pg: 1 });
  };

  const rows = useMemo(() => data.items, [data.items]);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Search users by name or email…"
        />
        <button className="btn" onClick={onCreate}>
          Add User
        </button>
      </div>

      <UsersTable
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
        <UserDrawer
          open={open}
          onClose={() => setOpen(false)}
          row={editRow}
          onSaved={afterSave}
        />
      )}

      {confirm && (
        <ConfirmDialog
          title="Delete user?"
          body={`This will permanently remove ${confirm.name}.`}
          confirmText="Delete"
          onCancel={() => setConfirm(null)}
          onConfirm={async () => {
            await deleteUser(confirm.id);
            setConfirm(null);
            setPage(1);
            setQ((v) => v);
          }}
        />
      )}
    </div>
  );
}
