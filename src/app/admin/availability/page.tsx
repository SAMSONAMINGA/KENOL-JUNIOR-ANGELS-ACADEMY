import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { LEVEL_OPTIONS } from "@/lib/levels";
import { AVAIL_STATUSES, AVAIL_ADMIN_LABEL, type AvailStatus } from "@/lib/availability";
import AdminNav from "@/components/admin/AdminNav";
import { saveAvailability } from "./actions";

export const dynamic = "force-dynamic";

const field = "w-full rounded-sm px-3 py-2 text-base";
const fieldStyle = { border: "1px solid #d9c9b4", background: "#fff" } as const;

export default async function AvailabilityAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireStaff();
  const sp = await searchParams;

  const rows = await db.gradeAvailability.findMany();
  const byLevel = new Map(rows.map((r) => [r.level, r]));
  const updatedAt = rows.reduce<Date | null>((latest, r) => (!latest || r.updatedAt > latest ? r.updatedAt : latest), null);
  const now = new Date();
  const daysOld = updatedAt ? Math.floor((now.getTime() - updatedAt.getTime()) / 86_400_000) : null;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ background: "#fbf5ec", color: "#2a0d0d" }}>
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold" style={{ color: "#6e0000" }}>Places available</h1>
        <p className="mb-6 text-base" style={{ color: "#4a3636" }}>
          Tell parents which grades still have space. This shows on the Admissions page, on each level page, and next to each grade in the application form.
        </p>

        <AdminNav active="availability" />

        {sp.error && (
          <p role="alert" className="mb-6 rounded-sm px-4 py-3 text-sm font-semibold" style={{ background: "#fbe9d0", color: "#7a2e00" }}>
            {sp.error}
          </p>
        )}
        {sp.saved && (
          <p role="status" className="mb-6 rounded-sm px-4 py-3 text-sm font-semibold" style={{ background: "#e3f1e3", color: "#1f5a1f" }}>
            Saved. The website updates within a minute.
          </p>
        )}
        {!updatedAt && (
          <p className="mb-6 rounded-sm px-4 py-3 text-sm font-semibold" style={{ background: "#f4ead9", color: "#6e0000" }}>
            Nothing has been set yet, so the website shows no availability. Fill in each grade below and click Save.
          </p>
        )}
        {daysOld !== null && daysOld > 30 && (
          <p role="status" className="mb-6 rounded-sm px-4 py-3 text-sm font-semibold" style={{ background: "#fbe9d0", color: "#7a2e00" }}>
            This was last updated {daysOld} days ago. Please check that every grade below is still correct.
          </p>
        )}

        <form action={saveAvailability} className="space-y-4">
          {LEVEL_OPTIONS.map((l) => {
            const r = byLevel.get(l.code);
            const status = (r?.status ?? "OPEN") as AvailStatus;
            return (
              <fieldset key={l.code} className="rounded-sm bg-white p-5" style={{ border: "1px solid #e2d5c4" }}>
                <legend className="px-2 text-lg font-bold" style={{ color: "#6e0000" }}>{l.label}</legend>
                <div className="grid gap-4 sm:grid-cols-[1.2fr_0.7fr_1.6fr]">
                  <div>
                    <label htmlFor={`status_${l.code}`} className="mb-1.5 block text-sm font-semibold">Status</label>
                    <select id={`status_${l.code}`} name={`status_${l.code}`} defaultValue={status} className={field} style={fieldStyle}>
                      {AVAIL_STATUSES.map((s) => (
                        <option key={s} value={s}>{AVAIL_ADMIN_LABEL[s]}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`places_${l.code}`} className="mb-1.5 block text-sm font-semibold">Places left</label>
                    <input
                      id={`places_${l.code}`}
                      name={`places_${l.code}`}
                      inputMode="numeric"
                      maxLength={3}
                      defaultValue={r?.places ?? ""}
                      placeholder="Optional"
                      className={field}
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <label htmlFor={`note_${l.code}`} className="mb-1.5 block text-sm font-semibold">Note (optional)</label>
                    <input
                      id={`note_${l.code}`}
                      name={`note_${l.code}`}
                      maxLength={80}
                      defaultValue={r?.note ?? ""}
                      placeholder="e.g. Waiting list opens in January"
                      className={field}
                      style={fieldStyle}
                    />
                  </div>
                </div>
              </fieldset>
            );
          })}

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button className="rounded-full px-8 py-3 text-base font-semibold text-white" style={{ background: "#6e0000" }}>
              Save all
            </button>
            {updatedAt && (
              <span className="text-sm" style={{ color: "#4a3636" }}>
                Last saved{" "}
                {updatedAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" })}
              </span>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}