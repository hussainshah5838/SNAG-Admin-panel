import React from "react";

export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  variant = "default",
}) {
  if (!open) return null;

  // Map variant to confirm button classes
  let confirmClass = "btn";
  if (variant === "danger") {
    confirmClass =
      "inline-flex items-center px-4 py-2 rounded-md bg-rose-500 text-white hover:bg-rose-600";
  } else if (variant === "success") {
    confirmClass =
      "inline-flex items-center px-4 py-2 rounded-md bg-emerald-500 text-white hover:bg-emerald-600";
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md card p-5 shadow-xl">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="mt-1 muted">{message}</p>
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose}>
            {cancelText}
          </button>
          <button className={confirmClass} onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
