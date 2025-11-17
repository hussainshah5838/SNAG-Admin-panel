import React from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/paths";

export default function UserMenu() {
  const navigate = useNavigate();

  // Clicking the avatar opens Admin Controls directly
  return (
    <div className="relative">
      <button
        className="h-9 w-9 rounded-full overflow-hidden border btn-ghost"
        style={{ borderColor: "var(--line)" }}
        onClick={() => navigate(PATHS.SETTINGS_ADMIN_CONTROLS)}
        aria-label="Open admin controls"
      >
        <img
          src="https://i.pravatar.cc/80"
          alt="avatar"
          className="h-full w-full object-cover"
        />
      </button>
    </div>
  );
}
