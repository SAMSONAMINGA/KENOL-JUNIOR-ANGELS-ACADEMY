"use server";

import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/lib/db";
import { nextReference } from "@/lib/reference";
import { emailSchool } from "@/lib/mailer";
import { LEVEL_OPTIONS, levelLabel, type LevelCode } from "@/lib/levels";
import { checkFormToken, rateLimit, clientKey } from "@/lib/antispam";

export type ApplyResult = { error: string };

const MAX = {
  childName: 100, gender: 10, level: 20, previousSchool: 150,
  parentName: 100, relationship: 50, phone: 20, altPhone: 20, area: 100,
  otherParentName: 100, otherRelationship: 50, otherPhone: 20,
} as const;

const MIN_AGE = 2;
const MAX_AGE = 16;
const DUPLICATE_WINDOW_DAYS = 7;
const PHONE_ERROR = "Please enter a valid Kenyan phone number, for example 0712 345 678.";

function text(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}
function optional(form: FormData, key: string): string | null {
  const v = text(form, key);
  return v === "" ? null : v;
}

/** Accepts 07xx/01xx, 254..., +254... (spaces, dashes and brackets allowed). Returns +254XXXXXXXXX or null. */
function normalizeKenyanPhone(raw: string): string | null {
  const cleaned = raw.replace(/[\s\-().]/g, "");
  const m = cleaned.match(/^(?:\+?254|0)([17]\d{8})$/);
  return m ? `+254${m[1]}` : null;
}

function ageOn(dob: Date, now = new Date()): number {
  let age = now.getUTCFullYear() - dob.getUTCFullYear();
  const m = now.getUTCMonth() - dob.getUTCMonth();
  if (m < 0 || (m === 0 && now.getUTCDate() < dob.getUTCDate())) age--;
  return age;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function submitApplication(form: FormData): Promise<ApplyResult> {
  // ---- Anti-spam (cheap checks first; no database used here) ----
  if (text(form, "website")) redirect("/admissions");
  if (!checkFormToken(text(form, "ft"))) {
    return { error: "Please wait a moment and submit again." };
  }

  // ---- Length caps ----
  for (const key of Object.keys(MAX) as (keyof typeof MAX)[]) {
    if (text(form, key).length > MAX[key]) {
      return { error: "One of your answers is too long. Please shorten it and try again." };
    }
  }

  // ---- Required fields ----
  const childName = text(form, "childName");
  const dob = text(form, "dateOfBirth");
  const gender = text(form, "gender");
  const level = text(form, "level");
  const parentName = text(form, "parentName");
  const relationship = text(form, "relationship");
  const phoneRaw = text(form, "phone");
  const area = text(form, "area");

  if (!childName || !dob || !gender || !level || !parentName || !relationship || !phoneRaw || !area) {
    return { error: "Please fill in all the required fields." };
  }
  if (form.get("consent") !== "on") {
    return { error: "Please tick the box to agree to how we use your information." };
  }

  // ---- Value checks ----
  if (!LEVEL_OPTIONS.some((l) => l.code === level)) {
    return { error: "Please choose a valid level." };
  }
  if (gender !== "Girl" && gender !== "Boy") {
    return { error: "Please choose a valid gender." };
  }

  // Date of birth: real date, not in the future, learner aged MIN_AGE to MAX_AGE
  const dateOfBirth = new Date(dob);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dob) || Number.isNaN(dateOfBirth.getTime())) {
    return { error: "Please enter a valid date of birth." };
  }
  const age = ageOn(dateOfBirth);
  if (dateOfBirth > new Date() || age < MIN_AGE || age > MAX_AGE) {
    return { error: `Please check the date of birth. We admit learners aged ${MIN_AGE} to ${MAX_AGE}.` };
  }

  // Phones
  const phone = normalizeKenyanPhone(phoneRaw);
  if (!phone) return { error: PHONE_ERROR };

  const altPhoneRaw = optional(form, "altPhone");
  const altPhone = altPhoneRaw ? normalizeKenyanPhone(altPhoneRaw) : null;
  if (altPhoneRaw && !altPhone) return { error: PHONE_ERROR };

  // "Other parent" is optional but all-or-nothing
  const otherParentName = optional(form, "otherParentName");
  const otherRelationship = optional(form, "otherRelationship");
  const otherPhoneRaw = optional(form, "otherPhone");
  const otherStarted = otherParentName || otherRelationship || otherPhoneRaw;
  if (otherStarted && (!otherParentName || !otherRelationship || !otherPhoneRaw)) {
    return { error: "Please complete all three fields for the other parent/guardian, or leave all three blank." };
  }
  const otherPhone = otherPhoneRaw ? normalizeKenyanPhone(otherPhoneRaw) : null;
  if (otherPhoneRaw && !otherPhone) return { error: PHONE_ERROR };

  // ---- Rate limit: only counts submissions that passed validation ----
  if (!(await rateLimit(await clientKey("apply"), 5, 3600))) {
    return { error: "Too many applications from this connection. Please call 0723 248 400." };
  }

  // ---- Duplicate check: same child + date of birth + phone within the last few days ----
  const since = new Date(Date.now() - DUPLICATE_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  const existing = await db.application.findFirst({
    where: {
      childName: { equals: childName, mode: "insensitive" },
      dateOfBirth,
      phone,
      createdAt: { gte: since },
    },
    select: { id: true },
  });
  if (existing) {
    return {
      error:
        "We have already received an application for this child. The school will contact you. " +
        "If you need to change something, please call 0723 248 400.",
    };
  }

  // ---- Save ----
  const saved = await db.$transaction(async (tx) => {
    const reference = await nextReference(tx);
    return tx.application.create({
      data: {
        reference,
        childName,
        dateOfBirth,
        gender,
        level: level as LevelCode,
        previousSchool: optional(form, "previousSchool"),
        parentName,
        relationship,
        phone,
        altPhone,
        area,
        otherParentName,
        otherRelationship,
        otherPhone,
        consentAt: new Date(),
      },
    });
  });

  // ---- Notify the school after the response; only a link goes by email ----
  // Retries once. If it still fails, it is logged and the application is flagged
  // (notifyFailed) so staff can see it in the admin list.
  const base = process.env.SITE_URL ?? "";
  const subject = `New application ${saved.reference}: ${saved.childName} (${levelLabel(saved.level)})`;
  const body = [
    `A new application has been received.`,
    ``,
    `Reference: ${saved.reference}`,
    `Child: ${saved.childName}`,
    `Level: ${levelLabel(saved.level)}`,
    ``,
    `View it (staff sign-in required):`,
    `${base}/admin/admissions/${saved.id}`,
  ].join("\n");

  after(async () => {
    let sent = false;
    for (let attempt = 0; attempt < 2 && !sent; attempt++) {
      try {
        const result: unknown = await emailSchool(subject, body);
        sent = result !== false;
      } catch (err) {
        console.error(`[apply] school email failed (${saved.reference}, attempt ${attempt + 1})`, err);
      }
      if (!sent && attempt === 0) await sleep(1500);
    }
    if (!sent) {
      console.error(`[apply] school NOT notified for ${saved.reference}`);
      try {
        await db.application.update({ where: { id: saved.id }, data: { notifyFailed: true } });
      } catch (err) {
        console.error(`[apply] could not flag ${saved.reference} as notifyFailed`, err);
      }
    }
  });

  redirect(`/admissions/confirmation?ref=${saved.reference}&t=${saved.accessToken}`);
}