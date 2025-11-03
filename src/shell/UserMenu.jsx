import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { signOut } from "../auth/api/auth.service";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const handleProfileClick = () => {
    setOpen(false);
    navigate(PATHS.PROFILE);
  };

  const handleAccountSettingsClick = () => {
    setOpen(false);
    navigate(PATHS.ACCOUNT_SETTINGS);
  };

  const handleLogout = () => {
    signOut();
    navigate(PATHS.LOGIN, { replace: true });
  };

  return (
    <div className="relative" ref={ref}>
      <button
        className="h-9 w-9 rounded-full overflow-hidden border btn-ghost"
        style={{ borderColor: "var(--line)" }}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <img
          src="https://i.pravatar.cc/80"
          alt="avatar"
          className="h-full w-full object-cover"
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 card p-2 shadow-xl"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,.15)" }}
        >
          <div className="px-3 py-2">
            <div className="font-medium">Admin User</div>
            <div className="text-sm muted">admin@snag.app</div>
          </div>
          <hr style={{ borderColor: "var(--line)" }} />
          <button
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={handleProfileClick}
          >
            Profile
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={handleAccountSettingsClick}
          >
            Account Settings
          </button>
          <button
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
