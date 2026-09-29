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

function text(form: FormData, key: string): string {
  return String(form.get(key) ?? "").trim();
}
function optional(form: FormData, key: string): string | null {
  const v = text(form, key);
  return v === "" ? null : v;
}

export async function submitApplication(form: FormData): Promise<ApplyResult> {
  // ---- Anti-spam ----
  if (text(form, "website")) redirect("/admissions");
  if (!checkFormToken(text(form, "ft"))) {
    return { error: "Please wait a moment and submit again." };
  }
  if (!(await rateLimit(await clientKey("apply"), 5, 3600))) {
    return { error: "Too many applications from this connection. Please call 0723 248 400." };
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
  const phone = text(form, "phone");
  const area = text(form, "area");

  if (!childName || !dob || !gender || !level || !parentName || !relationship || !phone || !area) {
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
  const dateOfBirth = new Date(dob);
  if (Number.isNaN(dateOfBirth.getTime()) || dateOfBirth > new Date()) {
    return { error: "Please enter a valid date of birth." };
  }
  if (phone.replace(/\D/g, "").length < 9) {
    return { error: "Please enter a valid phone number." };
  }

  // "Other parent" is optional but all-or-nothing
  const otherParentName = optional(form, "otherParentName");
  const otherRelationship = optional(form, "otherRelationship");
  const otherPhone = optional(form, "otherPhone");
  const otherStarted = otherParentName || otherRelationship || otherPhone;
  if (otherStarted && (!otherParentName || !otherRelationship || !otherPhone)) {
    return { error: "Please complete all three fields for the other parent/guardian, or leave all three blank." };
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
        altPhone: optional(form, "altPhone"),
        area,
        otherParentName,
        otherRelationship,
        otherPhone,
        consentAt: new Date(),
      },
    });
  });

  // ---- Notify the school after the response; only a link goes by email ----
  const base = process.env.SITE_URL ?? "";
  after(() =>
    emailSchool(
      `New application ${saved.reference}: ${saved.childName} (${levelLabel(saved.level)})`,
      [
        `A new application has been received.`,
        ``,
        `Reference: ${saved.reference}`,
        `Child: ${saved.childName}`,
        `Level: ${levelLabel(saved.level)}`,
        ``,
        `View it (staff sign-in required):`,
        `${base}/admin/admissions/${saved.id}`,
      ].join("\n")
    )
  );

  redirect(`/admissions/confirmation?ref=${saved.reference}&t=${saved.accessToken}`);
}