import type { Prisma } from "@prisma/client";

/**
 * Generates the next reference number, e.g. KJAC-2026-0043.
 * Must run INSIDE a transaction (pass the `tx` from db.$transaction).
 * The counter is incremented atomically, so two parents submitting at the
 * same instant can never collide. Restarts at 0001 each new year.
 */
export async function nextReference(tx: Prisma.TransactionClient): Promise<string> {
  const year = String(new Date().getFullYear());

  const counter = await tx.referenceCounter.upsert({
    where: { year },
    create: { year, last: 1 },
    update: { last: { increment: 1 } },
  });

  return `KJAC-${year}-${String(counter.last).padStart(4, "0")}`;
}