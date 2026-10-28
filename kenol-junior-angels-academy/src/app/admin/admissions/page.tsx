import Link from "next/link";
import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { logout } from "../login/actions";
import { LEVEL_OPTIONS, levelLabel } from "@/lib/levels";
import { STATUSES, STATUS_LABEL, STATUS_COLOR, isStatus, type StatusCode } from "@/lib/status";

export const dynamic = "force-dynamic";

export default async function AdmissionsDashboard({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string; level?: string }>;
}) {
  const staff = await requireStaff();
  const sp = await searchParams;

  const q = sp.q?.trim() ?? "";
  const status = sp.status && isStatus(sp.status) ? sp.status : "";
  const level = LEVEL_OPTIONS.find((l) => l.code === sp.level)?.code ?? "";

  const ci = "insensitive" as const;
  const where: Prisma.ApplicationWhereInput = {
    ...(status && { status }),
    ...(level && { level }),
    ...(q && {
      OR: [
        { childName: { contains: q, mode: ci } },
        { phone: { contains: q } },
        { altPhone: { contains: q } },
        { reference: { contains: q, mode: ci } },
      ],
    }),
  };

  const [applications, counts] = await Promise.all([
    db.application.findMany({ where, orderBy: { createdAt: "desc" }, take: 200 }),
    db.application.groupBy({ by: ["status"], _count: { _all: true } }),
  ]);

  const countOf = (s: StatusCode) => counts.find((c) => c.status === s)?._count._all ?? 0;
  const exportUrl = `/admin/admissions/export?${new URLSearchParams({ q, status, level }).toString()}`;

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ background: "#fbf5ec", color: "#2a0d0d" }}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#6e0000" }}>Admissions</h1>
            <p className="text-sm" style={{ color: "#4a3636" }}>
              Signed in as {staff.name}
              {staff.role === "OWNER" && " (Owner)"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {staff.role === "OWNER" && (
              <Link href="/admin/staff" className="rounded-full border-2 px-4 py-2 text-sm font-semibold" style={{ borderColor: "#6e0000", color: "#6e0000" }}>
                Manage staff
              </Link>
            )}
            <form action={logout}>
              <button className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "#6e0000" }}>
                Sign out
              </button>
            </form>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-4">
          {(["PENDING", "APPROVED", "ENROLLED"] as StatusCode[]).map((s) => (
            <div key={s} className="rounded-sm bg-white p-5" style={{ border: "1px solid #e2d5c4" }}>
              <p className="text-sm font-semibold" style={{ color: "#6e0000" }}>{STATUS_LABEL[s]}</p>
              <p className="mt-1 text-4xl font-bold">{countOf(s)}</p>
            </div>
          ))}
        </div>

        <form method="get" className="mb-6 flex flex-wrap gap-3">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search child name, phone or reference"
            className="min-w-[16rem] flex-1 rounded-sm px-4 py-2.5 text-base"
            style={{ border: "1px solid #d9c9b4", background: "#fff" }}
          />
          <select name="status" defaultValue={status} className="rounded-sm px-3 py-2.5 text-base" style={{ border: "1px solid #d9c9b4", background: "#fff" }}>
            <option value="">All statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{STATUS_LABEL[s]}</option>
            ))}
          </select>
          <select name="level" defaultValue={level} className="rounded-sm px-3 py-2.5 text-base" style={{ border: "1px solid #d9c9b4", background: "#fff" }}>
            <option value="">All levels</option>
            {LEVEL_OPTIONS.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <button className="rounded-full px-5 py-2.5 text-base font-semibold text-white" style={{ background: "#6e0000" }}>
            Filter
          </button>
          <a href={exportUrl} className="rounded-full border-2 px-5 py-2.5 text-base font-semibold" style={{ borderColor: "#6e0000", color: "#6e0000" }}>
            Export CSV
          </a>
          {(q || status || level) && (
            <Link href="/admin/admissions" className="self-center text-sm font-semibold underline" style={{ color: "#6e0000" }}>
              Clear
            </Link>
          )}
        </form>

        <div className="overflow-x-auto rounded-sm bg-white" style={{ border: "1px solid #e2d5c4" }}>
          <table className="w-full min-w-[46rem] text-left">
            <thead>
              <tr className="text-sm" style={{ background: "#f4ead9", color: "#6e0000" }}>
                <th className="px-4 py-3 font-semibold">Reference</th>
                <th className="px-4 py-3 font-semibold">Child</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Parent phone</th>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center" style={{ color: "#4a3636" }}>
                    No applications match.
                  </td>
                </tr>
              )}
              {applications.map((a) => {
                const c = STATUS_COLOR[a.status as StatusCode];
                return (
                  <tr key={a.id} className="border-t" style={{ borderColor: "#eee3d3" }}>
                    <td className="px-4 py-3 font-mono text-sm">{a.reference}</td>
                    <td className="px-4 py-3 font-semibold">{a.childName}</td>
                    <td className="px-4 py-3">{levelLabel(a.level)}</td>
                    <td className="px-4 py-3">{a.phone}</td>
                    <td className="px-4 py-3 text-sm">{a.createdAt.toLocaleDateString("en-GB")}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ background: c.bg, color: c.fg }}>
                        {STATUS_LABEL[a.status as StatusCode]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/admin/admissions/${a.id}`} className="text-sm font-semibold underline" style={{ color: "#6e0000" }}>
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {applications.length === 200 && (
          <p className="mt-3 text-sm" style={{ color: "#4a3636" }}>Showing the latest 200. Use search to narrow down.</p>
        )}
      </div>
    </main>
  );
}