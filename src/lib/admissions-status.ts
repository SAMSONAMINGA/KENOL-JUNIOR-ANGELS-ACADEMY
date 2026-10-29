import { signPayload, verifyPayload } from "@/lib/antispam";

const STATUS_SESSION_SECONDS = 7 * 24 * 60 * 60;
const STATUS_SESSION_FIELDS = ["applicationId", "iat", "exp"] as const;

export const STATUS_COOKIE_NAME = "kjac_application_status";

export type StatusSession = {
  applicationId: string;
  iat: number;
  exp: number;
};

export function createStatusToken(applicationId: string): { token: string; session: StatusSession } {
  const iat = Math.floor(Date.now() / 1000);
  const session = { applicationId, iat, exp: iat + STATUS_SESSION_SECONDS };
  return { token: signPayload(session), session };
}

export function verifyStatusToken(token: string | undefined): StatusSession | null {
  if (!token) return null;
  const payload = verifyPayload(token, STATUS_SESSION_FIELDS);
  if (
    typeof payload?.applicationId !== "string" ||
    payload.applicationId.length === 0 ||
    payload.applicationId.length > 128 ||
    typeof payload.iat !== "number" ||
    !Number.isSafeInteger(payload.iat) ||
    typeof payload.exp !== "number" ||
    !Number.isSafeInteger(payload.exp)
  ) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (
    payload.iat > now + 30 ||
    payload.exp <= now ||
    payload.exp !== payload.iat + STATUS_SESSION_SECONDS
  ) {
    return null;
  }

  return {
    applicationId: payload.applicationId,
    iat: payload.iat,
    exp: payload.exp,
  };
}

export function statusCookieOptions(exp: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/admissions",
    expires: new Date(exp * 1000),
    maxAge: STATUS_SESSION_SECONDS,
  };
}
