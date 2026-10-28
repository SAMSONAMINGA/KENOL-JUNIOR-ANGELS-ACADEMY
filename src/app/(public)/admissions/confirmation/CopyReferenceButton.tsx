"use client";

import { useState } from "react";

export default function CopyReferenceButton({ reference }: { reference: string }) {
  const [message, setMessage] = useState("");

  async function copyReference() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(reference);
      } else {
        const field = document.createElement("textarea");
        field.value = reference;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.left = "-9999px";
        field.style.opacity = "0";
        document.body.appendChild(field);
        try {
          field.select();
          if (!document.execCommand("copy")) throw new Error("Clipboard copy failed.");
        } finally {
          field.remove();
        }
      }
      setMessage("Copied");
    } catch {
      setMessage("Copy unavailable. Please write down the reference number.");
    }
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={copyReference}
        className="no-print rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
      >
        Copy
      </button>
      <span aria-live="polite" className="text-sm text-white/90">{message}</span>
    </div>
  );
}
