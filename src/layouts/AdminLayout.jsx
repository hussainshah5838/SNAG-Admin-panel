import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../shell";
import LeftSidebar from "../shell/LeftSidebar";

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => setOpen(false), [loc.pathname]);

  return (
    <div
      className="min-h-screen w-full flex relative"
      style={{ background: "var(--bg)" }}
    >
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <LeftSidebar open={open} onClose={() => setOpen(false)} />
      <div
        className="flex-1 min-w-0 w-full flex flex-col"
        style={{ background: "var(--bg)" }}
      >
        <Header title="SNAG Admin" onMenuClick={() => setOpen(true)} />
        <main className="page w-full flex-1 overflow-x-auto">
          <div className="px-3 sm:px-6 lg:px-8 w-full min-w-0">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
