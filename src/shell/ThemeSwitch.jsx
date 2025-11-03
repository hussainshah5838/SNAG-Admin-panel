import React from "react";
import { toggleTheme } from "../theme/theme.client";
import useTheme from "../shared/hooks/useTheme";
export default function ThemeSwitch() {
  const { dark } = useTheme();
  return (
    <button
      className="btn-ghost"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {dark ? "☾" : "☀︎"}
    </button>
  );
}
