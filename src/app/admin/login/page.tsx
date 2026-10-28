"use client";

import { useState } from "react";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (busy) return;
    const data = new FormData(e.currentTarget);
    setError(null);
    setBusy(true);

    login(data)
      .then((result) => {
        if (result?.error) {
          setError(result.error);
          setBusy(false);
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        setBusy(false);
      });
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4" style={{ background: "#fbf5ec" }}>
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm space-y-5 rounded-sm bg-white p-8"
        style={{ border: "1px solid #e2d5c4" }}
      >
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "#6e0000" }}>Staff sign in</h1>
          <p className="mt-1 text-sm" style={{ color: "#4a3636" }}>Kenol Junior Angels Academy</p>
        </div>

        {error && (
          <p role="alert" className="rounded-sm px-3 py-2 text-sm font-semibold" style={{ background: "#fbe9d0", color: "#7a2e00" }}>
            {error}
          </p>
        )}

        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-semibold" style={{ color: "#6e0000" }}>Phone number</label>
          <input id="phone" name="phone" type="tel" autoComplete="username" required
            className="w-full rounded-sm px-3 py-2.5 text-lg outline-none focus:ring-2 focus:ring-[#e8b23d]"
            style={{ border: "1px solid #d9c9b4" }} />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-semibold" style={{ color: "#6e0000" }}>Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required
            className="w-full rounded-sm px-3 py-2.5 text-lg outline-none focus:ring-2 focus:ring-[#e8b23d]"
            style={{ border: "1px solid #d9c9b4" }} />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="w-full rounded-full px-6 py-3 text-lg font-bold text-white disabled:opacity-60"
          style={{ background: "#6e0000" }}
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
}