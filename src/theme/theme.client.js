export function bootTheme() {
  try {
    const saved = localStorage.getItem("snag.theme");
    const prefersDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", !!prefersDark);
  } catch (err) {
    console.error(err);
  }
}

export function toggleTheme() {
  const el = document.documentElement;
  const isDark = el.classList.toggle("dark");
  try {
    localStorage.setItem("snag.theme", isDark ? "dark" : "light");
  } catch (err) {
    console.error(err);
  }
}
