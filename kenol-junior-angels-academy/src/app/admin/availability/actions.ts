"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireStaff } from "@/lib/auth";
import { LEVEL_OPTIONS } from "@/lib/levels";
import { AVAIL_STATUSES, type AvailStatus } from "@/lib/availability";

const text = (f: FormData, k: string) => String(f.get(k) ?? "").trim();

function fail(message: string): never {
  redirect(`/admin/availability?error=${encodeURIComponent(message)}`);
}

/** Saves all ten grades in one go. Any signed-in staff member may do this. */
export async function saveAvailability(form: FormData) {
  await requireStaff(); // every action checks for itself, not just the page

  const writes = LEVEL_OPTIONS.map((l) => {
    const status = text(form, `status_${l.code}`);
    if (!(AVAIL_STATUSES as readonly string[]).includes(status)) {
      fail(`Please choose a status for ${l.label}.`);
    }

    const placesRaw = text(form, `places_${l.code}`);
    let places: number | null = null;
    if (placesRaw !== "") {
      if (!/^\d{1,3}$/.test(placesRaw)) fail(`"Places left" for ${l.label} must be a whole number.`);
      places = Number(placesRaw);
    }
    if (status === "FULL") places = null; // a full class has no places to count
    if (places === 0) fail(`${l.label} has 0 places, so please set its status to "Full (waiting list)".`);

    const note = text(form, `note_${l.code}`).slice(0, 80) || null;

    return db.gradeAvailability.upsert({
      where: { level: l.code },
      create: { level: l.code, status: status as AvailStatus, places, note },
      update: { status: status as AvailStatus, places, note },
    });
  });

  await db.$transaction(writes);

  revalidatePath("/admissions");
  revalidatePath("/admissions/apply");
  for (const slug of ["pre-primary", "lower-primary", "upper-primary", "junior-secondary"]) {
    revalidatePath(`/levels/${slug}`);
  }
  redirect("/admin/availability?saved=1");
}