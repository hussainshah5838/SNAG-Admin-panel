import React, { useEffect, useRef, useState } from "react";

export default function Drawer({
  open,
  title,
  onClose,
  width = 480,
  children,
  footer,
}) {
  const panelRef = useRef(null);
  const [panelStyle, setPanelStyle] = useState({ width: "100%" });

  // close on ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // compute panel width responsively
  useEffect(() => {
    if (typeof window === "undefined") return;
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) {
        // mobile: full width
        setPanelStyle({ width: "100%" });
      } else {
        // desktop/tablet: use provided width (px)
        setPanelStyle({
          width: typeof width === "number" ? `${width}px` : width,
        });
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [width]);

  // lock body scrolling when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // focus panel when opened for accessibility
  useEffect(() => {
    if (open && panelRef.current) {
      // use a short timeout to ensure element is mounted
      setTimeout(() => panelRef.current?.focus?.(), 50);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      {/* panel: slides in from right on desktop, covers full screen on mobile */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        className="absolute right-0 top-0 h-full card flex flex-col shadow-xl transform transition-transform"
        style={panelStyle}
      >
        <div
          className="px-5 py-4 border-b flex items-center justify-between"
          style={{ borderColor: "var(--line)" }}
        >
          <h3 id="drawer-title" className="font-semibold truncate">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <button className="btn-ghost md:hidden" onClick={onClose}>
              Close
            </button>
            <button
              className="btn-ghost hidden md:inline-flex"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>

        <div className="p-5 overflow-auto flex-1">{children}</div>

        {footer && (
          <div
            className="px-5 py-3 border-t bg-slate-50/50 dark:bg-slate-900/30"
            style={{ borderColor: "var(--line)" }}
          >
            {footer}
          </div>
        )}
      </div>

      <style>{`\n        /* animation: slide-in from right on larger screens */\n        @media (min-width: 768px) {\n          .card[role="dialog"] {\n            right: 0;\n            transform: translateX(0%);\n            animation: slideIn 220ms ease-out;\n          }\n          @keyframes slideIn {\n            from { transform: translateX(12%); }\n            to { transform: translateX(0%); }\n          }\n        }\n        /* on small screens, ensure panel covers full width and sits above overlay */\n        @media (max-width: 767px) {\n          .card[role="dialog"] {\n            left: 0 !important;\n            right: 0 !important;\n            width: 100% !important;\n            height: 100% !important;\n            border-radius: 0 !important;\n            animation: slideUp 180ms ease-out;\n          }\n          @keyframes slideUp {\n            from { transform: translateY(6%); }\n            to { transform: translateY(0%); }\n          }\n        }\n      `}</style>
    </div>
  );
}
