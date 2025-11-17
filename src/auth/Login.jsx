import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";
import { signIn } from "./api/auth.service";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const [showPw, setShowPw] = useState(false);

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

  // Hero images for the left panel carousel
  const heroImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=60",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=60",
  ];

  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(t);
    // heroImages.length is constant here; include to satisfy linter
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-stretch">
      {/* Left hero */}
      <div className="hidden md:block md:w-1/2 relative">
        {/* layered backgrounds for crossfade carousel */}
        {heroImages.map((src, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
              i === heroIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${src}')` }}
            aria-hidden
          />
        ))}

        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        <div className="absolute left-8 bottom-8 text-white max-w-xs">
          <h3
            className="font-semibold text-lg text-white!"
            style={{ color: "#ffffff" }}
          >
            Easily monitor merchants, offers, and user activity in real time.
          </h3>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        {/* Scoped styles to prevent dark/light theme from affecting this panel */}
        <style>{`
          /* Base: make all text inside login panel black */
          .login-no-theme, .login-no-theme * { color: #000 !important; }
          /* Ensure labels and helper text remain black in dark mode */
          .login-no-theme label,
          .login-no-theme .muted,
          .login-no-theme .text-sm,
          .login-no-theme .text-xs,
          .login-no-theme .input,
          .login-no-theme a { color: #000 !important; }
          /* Placeholders */
          .login-no-theme input::placeholder, .login-no-theme textarea::placeholder { color: #000 !important; opacity: 1 !important; }
          /* Keep primary button text readable (white) */
          .login-no-theme .btn { color: #fff !important; }
        `}</style>

        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 login-no-theme">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold" style={{ color: "#000000" }}>
              Welcome Back to Snag
            </h2>
            <p className="text-sm mt-2" style={{ color: "#000000" }}>
              Log in to discover and manage the best deals around you.
            </p>
          </div>

          {err && (
            <div className="mb-4 p-3 rounded-xl border text-sm text-red-600 border-red-200">
              {err}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm muted">Email Address</label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  className="input w-full pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm">
                  @
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm muted">Password</label>
                <a href="#" className="text-sm text-sky-600">
                  Forgot Password?
                </a>
              </div>
              <div className="mt-1 relative">
                <input
                  type={showPw ? "text" : "password"}
                  required
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  placeholder="********"
                  className="input w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted text-sm px-2"
                >
                  {showPw ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              className="btn w-full justify-center bg-sky-600 hover:bg-sky-700 text-white"
              disabled={busy}
            >
              {busy ? "Signing in…" : "Login"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="text-xs muted">OR</div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <button
              type="button"
              className="btn w-full justify-center border border-gray-200 bg-white text-sm text-black!"
            >
              <span className="mr-2 inline-flex items-center" aria-hidden>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 533.5 544.3"
                  className="h-4 w-4"
                  width="18"
                  height="18"
                  aria-hidden
                >
                  <path
                    fill="#4285F4"
                    d="M533.5 278.4c0-18.5-1.5-36.3-4.4-53.6H272v101.4h147.4c-6.3 34.5-25 63.7-53.3 83.3v69.1h86.2c50.3-46.3 81.2-114.7 81.2-200.2z"
                  />
                  <path
                    fill="#34A853"
                    d="M272 544.3c72.6 0 133.6-24 178.2-65.3l-86.2-69.1c-24 16.1-54.7 25.6-92 25.6-70.7 0-130.6-47.7-152-111.6H31.1v69.9C75.7 487.8 167 544.3 272 544.3z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M120 328.5c-10.6-31.9-10.6-66.1 0-98l-88.9-69.9C4 200.4 0 239.8 0 272s4 71.6 31.1 111.4l88.9-69.9z"
                  />
                  <path
                    fill="#EA4335"
                    d="M272 107.7c39.5 0 75 13.6 103 40.2l77.6-77.6C405.6 24.4 347.4 0 272 0 167 0 75.7 56.5 31.1 142.1l88.9 69.9C141.4 155.4 201.3 107.7 272 107.7z"
                  />
                </svg>
              </span>
              <span>Sign in with Google</span>
            </button>

            <div className="text-center text-xs muted mt-2">
              Facing any issues?{" "}
              <a href="#" className="text-sky-600">
                Contact Support
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
