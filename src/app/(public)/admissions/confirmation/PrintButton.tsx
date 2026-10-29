"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-full px-8 py-3.5 text-lg font-bold text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
      style={{ background: "#6e0000" }}
    >
      Print this page
    </button>
  );
}