/**
 * Minimal signed-cookie sessions using Web Crypto (crypto.subtle), so the
 * same code runs in proxy.ts (Edge runtime) and in server components/actions.
 * Set SESSION_SECRET in .env to a long random string (32+ chars).
 */

export type SessionPayload = {
  sub: string;   // staff user id
  name: string;
  role: "OWNER" | "STAFF";
  tv: number;    // tokenVersion at the time of login; invalidated if it changes
  exp: number;   // unix seconds
};

const COOKIE_NAME = "kjac_session";
const SESSION_DAYS = 7;

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set to a random string of 32+ characters.");
  }
  return secret;
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const bin = String.fromCharCode(...view);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str: string) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(str.length / 4) * 4, "=");
  const bin = atob(padded);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder().encode(getSecret());
  return crypto.subtle.importKey("raw", enc, { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function signSession(payload: SessionPayload): Promise<string> {
  const key = await hmacKey();
  const body = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const sig = toBase64Url(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(body)));
  return `${body}.${sig}`;
}

export async function verifySession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [body, sig] = parts;
    if (!body || !sig) return null;

    const key = await hmacKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sig),
      new TextEncoder().encode(body)
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(body))) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = COOKIE_NAME;

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  };
}

export function newExpiry(): number {
  return Math.floor(Date.now() / 1000) + SESSION_DAYS * 24 * 60 * 60;
}