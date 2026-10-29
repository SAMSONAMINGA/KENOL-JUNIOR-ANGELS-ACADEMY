import { createHmac, timingSafeEqual } from "crypto";
import { headers } from "next/headers";
import { db } from "@/lib/db";

function secret(): string {
  const s = process.env.ANTISPAM_SECRET;
  if (!s || s.length < 32) throw new Error("ANTISPAM_SECRET must be set (32+ chars).");
  return s;
}

const mac = (v: string) => createHmac("sha256", secret()).update(v).digest("hex");

/** Signs small server-only tokens using the same secret as form tokens. */
export function signPayload(payload: Record<string, string | number>): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${mac(body)}`;
}

/** Verifies a signed payload and rejects any field set other than the exact expected shape. */
export function verifyPayload(token: string, fields: readonly string[]): Record<string, unknown> | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, signature] = parts;
  if (!body || !signature || !/^[0-9a-f]{64}$/.test(signature)) return null;

  const expected = mac(body);
  const suppliedBytes = Buffer.from(signature, "hex");
  const expectedBytes = Buffer.from(expected, "hex");
  if (suppliedBytes.length !== expectedBytes.length || !timingSafeEqual(suppliedBytes, expectedBytes)) {
    return null;
  }

  try {
    const payload: unknown = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
    const values = payload as Record<string, unknown>;
    const keys = Object.keys(values);
    if (keys.length !== fields.length || fields.some((field) => !Object.hasOwn(values, field))) return null;
    return values;
  } catch {
    return null;
  }
}

/** Called on the server when the apply page renders. */
export function makeFormToken(): string {
  const ts = String(Date.now());
  return `${ts}.${mac(ts)}`;
}

/** Rejects tokens under 3 seconds old (bots) or over 2 hours old (stale page). */
export function checkFormToken(token: string): boolean {
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;
  const expected = mac(ts);
  if (sig.length !== expected.length) return false;
  if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  const age = Date.now() - Number(ts);
  return age >= 3_000 && age <= 2 * 60 * 60 * 1000;
}

/** Returns true if allowed. Stored in Postgres so it works on serverless. */
export async function rateLimit(key: string, max: number, windowSec: number): Promise<boolean> {
  const now = new Date();
  const row = await db.rateLimit.upsert({
    where: { key },
    create: { key, resetAt: new Date(now.getTime() + windowSec * 1000) },
    update: { count: { increment: 1 } },
  });
  if (row.resetAt < now) {
    await db.rateLimit.update({
      where: { key },
      data: { count: 1, resetAt: new Date(now.getTime() + windowSec * 1000) },
    });
    return true;
  }
  return row.count <= max;
}

/** Hashed so raw IPs are never stored. */
export async function clientKey(prefix: string): Promise<string> {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  return `${prefix}:${mac(ip)}`;
}