import type { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { getCurrentStaff } from "@/lib/auth";
import { LEVEL_OPTIONS, levelLabel } from "@/lib/levels";
import { STATUS_LABEL, isStatus, type StatusCode } from "@/lib/status";

export const dynamic = "force-dynamic";

function cell(v: string | null | undefined): string {
  let s = v ?? "";
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
}

export async function GET(req: Request) {
  if (!(await getCurrentStaff())) return new Response("Unauthorized", { status: 401 });

  const sp = new URL(req.url).searchParams;
  const q = sp.get("q")?.trim() ?? "";
  const status = sp.get("status") && isStatus(sp.get("status")!) ? sp.get("status")! : "";
  const level = LEVEL_OPTIONS.find((l) => l.code === sp.get("level"))?.code ?? "";
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

  const apps = await db.application.findMany({ where, orderBy: { createdAt: "desc" } });

  const header = ["Reference", "Submitted", "Status", "Child", "Date of birth", "Gender", "Level",
    "Parent", "Relationship", "Phone", "Alt phone", "Area", "Previous school",
    "Other parent/guardian", "Other relationship", "Other phone"];
  const rows = apps.map((a) => [
    a.reference,
    a.createdAt.toISOString().slice(0, 10),
    STATUS_LABEL[a.status as StatusCode] ?? a.status,
    a.childName,
    a.dateOfBirth.toISOString().slice(0, 10),
    a.gender,
    levelLabel(a.level),
    a.parentName,
    a.relationship,
    a.phone,
    a.altPhone,
    a.area,
    a.previousSchool,
    a.otherParentName,
    a.otherRelationship,
    a.otherPhone,
  ]);

  const csv = "\uFEFF" + [header, ...rows].map((r) => r.map(cell).join(",")).join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="kjac-applications-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}