import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

/**
 * Returns the logged-in staff member, or null.
 * Re-checks the database every time: deactivating an account, or changing
 * its tokenVersion (password reset), stops it working immediately, even
 * while the browser still holds a valid-looking cookie.
 */
export async function getCurrentStaff() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  const session = await verifySession(token);
  if (!session) return null;

  const staff = await db.staffUser.findUnique({ where: { id: session.sub } });
  if (!staff || !staff.active || staff.tokenVersion !== session.tv) return null;
  return staff;
}

export async function requireStaff() {
  const staff = await getCurrentStaff();
  if (!staff) redirect("/admin/login");
  return staff;
}

export async function requireOwner() {
  const staff = await requireStaff();
  if (staff.role !== "OWNER") redirect("/admin/admissions");
  return staff;
}