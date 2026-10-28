"use client";

import { useActionState } from "react";
import { lookupApplication, type LookupState } from "./actions";

const initialState: LookupState = {};
const inputClass =
  "w-full rounded-lg border border-[#d9c9b4] px-4 py-3 text-[#2a0d0d] focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30";

export default function LookupForm() {
  const [state, action, pending] = useActionState(lookupApplication, initialState);

  return (
    <form action={action} className="mt-8 space-y-5">
      {state.error && (
        <p role="alert" className="rounded-lg bg-[#fbe9d0] px-4 py-3 text-sm font-semibold text-[#7a2e00]">
          {state.error}
        </p>
      )}
      <div>
        <label htmlFor="reference" className="mb-1.5 block text-sm font-semibold text-[#6e0000]">
          Application reference number
        </label>
        <input
          id="reference"
          name="reference"
          required
          maxLength={32}
          autoComplete="off"
          className={inputClass}
          placeholder="e.g. KJAC-2026-0001"
        />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-semibold text-[#6e0000]">
          Parent or guardian phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          maxLength={20}
          autoComplete="tel"
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-[#6e0000] px-8 py-3.5 font-bold text-white transition hover:bg-[#8b0000] disabled:opacity-60"
      >
        {pending ? "Checking…" : "Check application status"}
      </button>
    </form>
  );
}
