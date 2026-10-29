/**
 * Creates (or resets) the school Owner account. Run once after setup:
 *
 *   OWNER_NAME="Mary Wanjiru" OWNER_PHONE="0723248400" OWNER_PASSWORD="a-long-password" npx tsx prisma/seed.ts
 *
 * Running it again with the same phone number resets that account's
 * password, which is also how the Owner recovers a forgotten one.
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  const name = process.env.OWNER_NAME;
  const phone = process.env.OWNER_PHONE;
  const password = process.env.OWNER_PASSWORD;

  if (!name || !phone || !password) {
    throw new Error("Set OWNER_NAME, OWNER_PHONE and OWNER_PASSWORD before running the seed.");
  }
  if (password.length < 8) {
    throw new Error("OWNER_PASSWORD must be at least 8 characters.");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const owner = await db.staffUser.upsert({
    where: { phone },
    create: { name, phone, passwordHash, role: "OWNER" },
    update: { name, passwordHash, role: "OWNER", active: true },
  });

  console.log(`Owner ready: ${owner.name} (${owner.phone})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());