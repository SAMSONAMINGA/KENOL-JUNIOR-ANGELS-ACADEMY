"use client";

import { useState } from "react";
import Link from "next/link";
import { submitApplication } from "./actions";
import { LEVEL_OPTIONS, type LevelCode } from "@/lib/levels";

const input = "w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#6e0000]/30";
const label = "mb-1.5 block text-sm font-semibold text-[#6e0000]";

export default function ApplyForm({ defaultLevel, formToken }: { defaultLevel?: LevelCode; formToken: string }) {
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    const data = new FormData(e.currentTarget);
    setError(null);
    setSending(true);

    submitApplication(data)
      .then((result) => {
        if (result?.error) {
          setError(result.error);
          setSending(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch(() => {
        setError("Something went wrong sending your application. Please try again, or call 0723 248 400.");
        setSending(false);
      });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
      {error && (
        <p role="alert" className="rounded-lg bg-[#fbe9d0] px-4 py-3 text-sm font-semibold text-[#7a2e00]">
          {error}
        </p>
      )}

      <input type="hidden" name="ft" value={formToken} />
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px" }}>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Child details */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-xl font-bold text-gray-900">About the child</legend>

        <div>
          <label className={label}>Child&rsquo;s full name *</label>
          <input name="childName" required maxLength={100} className={input} />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Date of birth *</label>
            <input name="dateOfBirth" type="date" required className={input} />
          </div>
          <div>
            <label className={label}>Gender *</label>
            <select name="gender" required defaultValue="" className={input}>
              <option value="" disabled>Choose</option>
              <option>Girl</option>
              <option>Boy</option>
            </select>
          </div>
        </div>

        <div>
          <label className={label}>Level applying for *</label>
          <select name="level" required defaultValue={defaultLevel ?? ""} className={input}>
            <option value="" disabled>Choose a level</option>
            {LEVEL_OPTIONS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={label}>Previous school (if any)</label>
          <input name="previousSchool" maxLength={150} className={input} />
        </div>
      </fieldset>

      {/* Parent / guardian */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-xl font-bold text-gray-900">Parent or guardian</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Full name *</label>
            <input name="parentName" required maxLength={100} className={input} />
          </div>
          <div>
            <label className={label}>Relationship to child *</label>
            <input name="relationship" placeholder="e.g. Mother, Father, Guardian" required maxLength={50} className={input} />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Main phone number *</label>
            <input name="phone" type="tel" required maxLength={20} className={input} />
          </div>
          <div>
            <label className={label}>Alternative phone</label>
            <input name="altPhone" type="tel" maxLength={20} className={input} />
          </div>
        </div>

        <div>
          <label className={label}>Location / Area *</label>
          <input name="area" required maxLength={100} className={input} />
        </div>
      </fieldset>

      {/* Other parent / guardian — optional, all-or-nothing */}
      <fieldset className="space-y-5">
        <legend className="mb-2 text-xl font-bold text-gray-900">Other parent or guardian (optional)</legend>
        <p className="-mt-3 text-sm text-gray-500">Leave all three blank if there isn&rsquo;t a second contact.</p>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={label}>Full name</label>
            <input name="otherParentName" maxLength={100} className={input} />
          </div>
          <div>
            <label className={label}>Relationship to child</label>
            <input name="otherRelationship" placeholder="e.g. Mother, Father, Guardian" maxLength={50} className={input} />
          </div>
        </div>

        <div>
          <label className={label}>Main phone number</label>
          <input name="otherPhone" type="tel" maxLength={20} className={input} />
        </div>
      </fieldset>

      <div>
        <label className="mb-5 flex items-start gap-3 text-sm leading-6 text-gray-600">
          <input type="checkbox" name="consent" required className="mt-1 h-5 w-5 shrink-0 accent-[#6e0000]" />
          <span>
            I agree that Kenol Junior Angels Academy may store and use these details to
            process this application. Read our{" "}
            <Link href="/privacy" target="_blank" className="font-semibold text-[#6e0000] underline">privacy notice</Link>.
          </span>
        </label>

        <p className="mb-5 text-sm text-gray-500">
          Submitting this form does not mean automatic admission. The school will contact you
          after reviewing your application. Please bring the child&rsquo;s birth certificate, 2 passport
          photos, and parent ID when you visit.
        </p>

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-[#6e0000] px-8 py-3.5 font-bold text-white transition hover:bg-[#8b0000] disabled:opacity-60 sm:w-auto"
        >
          {sending ? "Sending…" : "Submit Application"}
        </button>
      </div>
    </form>
  );
}