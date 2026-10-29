import { randomInt } from "crypto";
import type { Prisma } from "@prisma/client";

/**
 * Generates a random reference such as KJAC-7K2M-9QXA.
 * Random (crypto.randomInt), so it can't be guessed or counted.
 * Uses 32 characters with no 0, O, 1 or I, so it is easy to read aloud.
 * Must run INSIDE a transaction (pass the `tx` from db.$transaction).
 * Keeps the name nextReference so actions.ts needs no change.
 */
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomCode(length: number): string {
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[randomInt(ALPHABET.length)];
  return out;
}

export async function nextReference(tx: Prisma.TransactionClient): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const reference = `KJAC-${randomCode(4)}-${randomCode(4)}`;
    const clash = await tx.application.findUnique({
      where: { reference },
      select: { id: true },
    });
    if (!clash) return reference;
  }
  throw new Error("Could not generate a unique reference number.");
}