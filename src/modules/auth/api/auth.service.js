const sleep = (ms = 320) => new Promise((r) => setTimeout(r, ms));

const STORAGE_KEY = "zavolla_auth";

export async function signIn({ email, password, remember = true }) {
  await sleep(300);
  // very small demo auth: accept any non-empty credentials
  if (!email || !password) return { ok: false, error: "Missing credentials" };
  const user = { id: "u_demo", name: "Demo User", email };
  const token = btoa(`${email}:${Date.now()}`);
  const payload = { user, token };
  try {
    if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    else sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return { ok: true, data: payload, user, token };
  } catch {
    return { ok: false, error: "Storage error" };
  }
}

export function signOut() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function getAuth() {
  try {
    const raw =
      localStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  return !!getAuth();
}

export function getCurrentUser() {
  const a = getAuth();
  return a?.user ?? null;
}

export default { signIn, signOut, getAuth, isAuthenticated, getCurrentUser };
