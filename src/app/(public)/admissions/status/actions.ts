"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { clientKey, rateLimit } from "@/lib/antispam";
import { createStatusToken, STATUS_COOKIE_NAME, statusCookieOptions } from "@/lib/admissions-status";
import { db } from "@/lib/db";

export type LookupState = { error?: string };

const LOOKUP_ERROR = "We couldn't match those details. Check the reference and phone number and try again.";

function normalizeKenyanPhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  const match = cleaned.match(/^(?:\+?254|0)([17]\d{8})$/);
  return match ? `+254${match[1]}` : null;
}

export async function lookupApplication(_previousState: LookupState, form: FormData): Promise<LookupState> {
  const reference = String(form.get("reference") ?? "").trim().toUpperCase();
  const phone = normalizeKenyanPhone(String(form.get("phone") ?? "").trim());
  if (!reference || reference.length > 32 || !phone) return { error: LOOKUP_ERROR };

  if (!(await rateLimit(await clientKey("status-lookup"), 5, 900))) {
    return { error: "Too many attempts. Please wait a little while and try again." };
  }

  const application = await db.application.findFirst({
    where: { reference, phone },
    select: { id: true },
  });
  if (!application) return { error: LOOKUP_ERROR };

  const { token, session } = createStatusToken(application.id);
  const cookieStore = await cookies();
  cookieStore.set(STATUS_COOKIE_NAME, token, statusCookieOptions(session.exp));
  redirect("/admissions/status");
}

export async function signOutStatus(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(STATUS_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admissions",
    expires: new Date(0),
    maxAge: 0,
  });
  redirect("/admissions/status");
}
