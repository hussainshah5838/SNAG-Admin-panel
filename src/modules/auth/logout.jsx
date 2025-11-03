import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "./api/auth.service.js";
import { PATHS } from "../../routes/paths.js";

export default function Logout() {
  const nav = useNavigate();

  useEffect(() => {
    signOut();
    // short delay to let storage clear
    const t = setTimeout(() => nav(PATHS.AUTH_LOGIN || "/auth/login"), 250);
    return () => clearTimeout(t);
  }, [nav]);

  return (
    <div className="page min-h-screen flex items-center justify-center">
      <div className="card p-6 text-center">
        <div className="font-semibold mb-2">Signed out</div>
        <div className="text-sm text-muted">Redirecting to login…</div>
      </div>
    </div>
  );
}
