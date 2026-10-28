"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { SESSION_COOKIE, newExpiry, sessionCookieOptions, signSession } from "@/lib/session";

export type LoginResult = { error: string };

const GENERIC_ERROR = "Wrong phone number or password.";
const MAX_FAILS = 5;
const LOCK_MINUTES = 15;
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password", 10);

export async function login(form: FormData): Promise<LoginResult> {
  const phone = String(form.get("phone") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!phone || !password || phone.length > 30 || password.length > 200) {
    return { error: GENERIC_ERROR };
  }

  const staff = await db.staffUser.findUnique({ where: { phone } });

  if (staff?.lockedUntil && staff.lockedUntil > new Date()) {
    await bcrypt.compare(password, DUMMY_HASH);
    return { error: GENERIC_ERROR };
  }

  const ok = await bcrypt.compare(password, staff?.passwordHash ?? DUMMY_HASH);

  if (!staff || !ok || !staff.active) {
    if (staff) {
      const fails = staff.failedAttempts + 1;
      await db.staffUser.update({
        where: { id: staff.id },
        data:
          fails >= MAX_FAILS
            ? { failedAttempts: 0, lockedUntil: new Date(Date.now() + LOCK_MINUTES * 60_000) }
            : { failedAttempts: fails },
      });
    }
    return { error: GENERIC_ERROR };
  }

  if (staff.failedAttempts > 0 || staff.lockedUntil) {
    await db.staffUser.update({
      where: { id: staff.id },
      data: { failedAttempts: 0, lockedUntil: null },
    });
  }

  const token = await signSession({
    sub: staff.id,
    name: staff.name,
    role: staff.role === "OWNER" ? "OWNER" : "STAFF",
    tv: staff.tokenVersion,
    exp: newExpiry(),
  });
  (await cookies()).set(SESSION_COOKIE, token, sessionCookieOptions());
  redirect("/admin/admissions");
}

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE);
  redirect("/admin/login");
}