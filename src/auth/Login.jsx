import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { signIn } from "./api/auth.service";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const res = await signIn({ email: email.trim(), password: pw });
      if (res?.ok) nav(PATHS.DASHBOARD);
      else setErr("Sign-in failed");
    } catch (e2) {
      setErr(e2.message || "Sign-in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center relative overflow-hidden">
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,.35), transparent)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 h-112 w-md rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(129,140,248,.30), transparent)",
        }}
      />

      <div className="w-full max-w-md card p-6 relative">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <img
            src="/snag-logo-large.svg"
            alt="Snag Logo"
            className="h-12 w-12"
            style={{ color: "var(--primary)" }}
          />
          <div>
            <div className="font-bold text-2xl">Snag</div>
            <div className="text-sm muted">Admin Panel</div>
          </div>
        </div>

        {err && (
          <div
            className="mb-4 p-3 rounded-xl border text-sm"
            style={{ borderColor: "var(--danger)", color: "var(--danger)" }}
          >
            {err}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <div className="text-sm muted mb-1">Email</div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              type="email"
              required
            />
          </label>
          <label className="block">
            <div className="text-sm muted mb-1">Password</div>
            <input
              className="input"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
              type="password"
              required
            />
          </label>
          <button className="btn w-full justify-center" disabled={busy}>
            {busy ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
