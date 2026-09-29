import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { levelLabel } from "@/lib/levels";
import { STATUSES, STATUS_LABEL, STATUS_COLOR, type StatusCode } from "@/lib/status";
import { addNote, updateStatus, deleteApplication } from "./actions";

export const dynamic = "force-dynamic";

const fmtDate = (d: Date) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const fmtDateTime = (d: Date) =>
  d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-3 border-b py-2.5" style={{ borderColor: "#eee3d3" }}>
      <dt className="text-sm font-semibold" style={{ color: "#6e0000" }}>{label}</dt>
      <dd>{value || <span style={{ color: "#8a7a6d" }}>Not given</span>}</dd>
    </div>
  );
}

export default async function ApplicationDetail({ params }: { params: Promise<{ id: string }> }) {
  const staff = await requireStaff();
  const { id } = await params;

  const app = await db.application.findUnique({
    where: { id },
    include: { notes: { include: { author: true }, orderBy: { createdAt: "desc" } } },
  });
  if (!app) notFound();

  const c = STATUS_COLOR[app.status as StatusCode];
  const setStatus = updateStatus.bind(null, app.id);
  const saveNote = addNote.bind(null, app.id);
  const removeApplication = deleteApplication.bind(null, app.id);

  const otherGuardian =
    app.otherParentName || app.otherRelationship || app.otherPhone
      ? [app.otherParentName, app.otherRelationship ? `(${app.otherRelationship})` : null, app.otherPhone]
          .filter(Boolean)
          .join(" ")
      : null;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ background: "#fbf5ec", color: "#2a0d0d" }}>
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/admissions" className="text-sm font-semibold underline" style={{ color: "#6e0000" }}>
          &larr; All applications
        </Link>

        <div className="mb-6 mt-4 flex flex-wrap items-center gap-4">
          <h1 className="text-3xl font-bold" style={{ color: "#6e0000" }}>{app.childName}</h1>
          <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ background: c.bg, color: c.fg }}>
            {STATUS_LABEL[app.status as StatusCode]}
          </span>
        </div>
        <p className="mb-8 text-sm" style={{ color: "#4a3636" }}>
          <span className="font-mono">{app.reference}</span> &middot; Submitted {fmtDateTime(app.createdAt)} &middot; Last updated {fmtDateTime(app.updatedAt)}
        </p>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <section className="rounded-sm bg-white p-6" style={{ border: "1px solid #e2d5c4" }}>
            <h2 className="mb-2 text-xl font-bold">Application</h2>
            <dl>
              <Row label="Child" value={app.childName} />
              <Row label="Date of birth" value={fmtDate(app.dateOfBirth)} />
              <Row label="Gender" value={app.gender} />
              <Row label="Level" value={levelLabel(app.level)} />
              <Row label="Previous school" value={app.previousSchool} />
              <Row label="Parent / guardian" value={`${app.parentName} (${app.relationship})`} />
              <Row label="Main phone" value={app.phone} />
              <Row label="Alt. phone" value={app.altPhone} />
              <Row label="Area" value={app.area} />
              <Row label="Other parent/guardian" value={otherGuardian} />
            </dl>
          </section>

          <div className="space-y-8">
            <section className="rounded-sm bg-white p-6" style={{ border: "1px solid #e2d5c4" }}>
              <h2 className="mb-3 text-xl font-bold">Status</h2>
              <form action={setStatus} className="flex gap-3">
                <select name="status" defaultValue={app.status} className="flex-1 rounded-sm px-3 py-2.5" style={{ border: "1px solid #d9c9b4" }}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                  ))}
                </select>
                <button className="rounded-full px-5 py-2.5 font-semibold text-white" style={{ background: "#6e0000" }}>
                  Save
                </button>
              </form>
            </section>

            <section className="rounded-sm bg-white p-6" style={{ border: "1px solid #e2d5c4" }}>
              <h2 className="mb-1 text-xl font-bold">Internal notes</h2>
              <p className="mb-3 text-sm" style={{ color: "#4a3636" }}>
                Only staff can see these. Follow-up only (calls, interview times) — do not record medical or personal details here.
              </p>
              <form action={saveNote} className="mb-5 space-y-3">
                <textarea name="body" required rows={3} maxLength={1000} placeholder="e.g. Called mum, interview Tuesday 10am"
                  className="w-full resize-none rounded-sm px-3 py-2.5" style={{ border: "1px solid #d9c9b4" }} />
                <button className="rounded-full px-5 py-2 font-semibold text-white" style={{ background: "#6e0000" }}>
                  Add note
                </button>
              </form>

              {app.notes.length === 0 ? (
                <p className="text-sm" style={{ color: "#8a7a6d" }}>No notes yet.</p>
              ) : (
                <ul className="space-y-4">
                  {app.notes.map((n) => (
                    <li key={n.id} className="border-t pt-3" style={{ borderColor: "#eee3d3" }}>
                      <p className="whitespace-pre-wrap">{n.body}</p>
                      <p className="mt-1 text-xs" style={{ color: "#8a7a6d" }}>
                        {n.author.name} &middot; {fmtDateTime(n.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {staff.role === "OWNER" && (
              <section className="rounded-sm bg-white p-6" style={{ border: "1px solid #e2c4c4" }}>
                <h2 className="mb-1 text-xl font-bold" style={{ color: "#7a2222" }}>Delete application</h2>
                <p className="mb-3 text-sm" style={{ color: "#4a3636" }}>
                  Permanently removes this application and its notes. Type{" "}
                  <span className="font-mono">{app.reference}</span> to confirm.
                </p>
                <form action={removeApplication} className="flex gap-3">
                  <input name="confirm" required autoComplete="off" className="flex-1 rounded-sm px-3 py-2.5" style={{ border: "1px solid #d9c9b4" }} />
                  <button className="rounded-full px-5 py-2.5 font-semibold text-white" style={{ background: "#7a2222" }}>
                    Delete
                  </button>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}