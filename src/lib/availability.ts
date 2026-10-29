import { cache } from "react";
import { db } from "@/lib/db";

export const AVAIL_STATUSES = ["OPEN", "LIMITED", "FULL"] as const;
export type AvailStatus = (typeof AVAIL_STATUSES)[number];

/** What staff see in the admin dropdown */
export const AVAIL_ADMIN_LABEL: Record<AvailStatus, string> = {
  OPEN: "Places available",
  LIMITED: "Few places left",
  FULL: "Full (waiting list)",
};

export type Availability = { status: AvailStatus; places: number | null; note: string | null };
export type AvailabilityData = {
  byLevel: Record<string, Availability>;
  /** Most recent save, or null if staff have never set anything */
  updatedAt: Date | null;
};

/** Text shown to parents, for example "5 places left" or "Full, waiting list" */
export function availText(a: Availability): string {
  if (a.status === "FULL") return "Full, waiting list";
  if (a.status === "LIMITED") return a.places ? `${a.places} place${a.places === 1 ? "" : "s"} left` : "Few places left";
  return a.places ? `${a.places} places available` : "Places available";
}

/**
 * Reads availability once per request (React cache), so the admissions page can
 * show it in four cards without four database trips. If the database cannot be
 * reached, or staff have never set anything, nothing is shown rather than guessing.
 */
export const getAvailability = cache(async (): Promise<AvailabilityData> => {
  try {
    const rows = await db.gradeAvailability.findMany();
    const byLevel: Record<string, Availability> = {};
    let updatedAt: Date | null = null;
    for (const r of rows) {
      const status = (AVAIL_STATUSES as readonly string[]).includes(r.status) ? (r.status as AvailStatus) : "OPEN";
      byLevel[r.level] = { status, places: r.places, note: r.note };
      if (!updatedAt || r.updatedAt > updatedAt) updatedAt = r.updatedAt;
    }
    return { byLevel, updatedAt };
  } catch (err) {
    console.error("[availability] could not load", err);
    return { byLevel: {}, updatedAt: null };
  }
});