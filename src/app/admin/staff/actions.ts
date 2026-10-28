"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireOwner } from "@/lib/auth";

const MIN_PASSWORD = 8;

function back(error?: string): never {
  redirect(error ? `/admin/staff?error=${encodeURIComponent(error)}` : "/admin/staff");
}

export async function createStaff(form: FormData) {
  await requireOwner();

  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const password = String(form.get("password") ?? "");

  if (!name || !phone) back("Name and phone number are required.");
  if (password.length < MIN_PASSWORD) back(`Password must be at least ${MIN_PASSWORD} characters.`);

  const exists = await db.staffUser.findUnique({ where: { phone } });
  if (exists) back("A staff account with that phone number already exists.");

  await db.staffUser.create({
    data: { name, phone, passwordHash: await bcrypt.hash(password, 10), role: "STAFF" },
  });
  revalidatePath("/admin/staff");
  back();
}

export async function resetPassword(staffId: string, form: FormData) {
  await requireOwner();

  const password = String(form.get("password") ?? "");
  if (password.length < MIN_PASSWORD) back(`Password must be at least ${MIN_PASSWORD} characters.`);

  await db.staffUser.update({
    where: { id: staffId },
    data: {
      passwordHash: await bcrypt.hash(password, 10),
      tokenVersion: { increment: 1 },
    },
  });
  revalidatePath("/admin/staff");
  back();
}

export async function setActive(staffId: string, active: boolean) {
  const owner = await requireOwner();

  const target = await db.staffUser.findUnique({ where: { id: staffId } });
  if (!target) back();
  if (target.role === "OWNER" || target.id === owner.id) back("The owner account can't be deactivated.");

  await db.staffUser.update({
    where: { id: staffId },
    data: { active, tokenVersion: { increment: 1 } },
  });
  revalidatePath("/admin/staff");
  back();
}

export async function deleteStaff(staffId: string) {
  const owner = await requireOwner();

  const target = await db.staffUser.findUnique({
    where: { id: staffId },
    include: { _count: { select: { notes: true } } },
  });
  if (!target) back();
  if (target.role === "OWNER" || target.id === owner.id) back("The owner account can't be removed.");

  if (target._count.notes > 0) {
    await db.staffUser.update({ where: { id: staffId }, data: { active: false, tokenVersion: { increment: 1 } } });
  } else {
    await db.staffUser.delete({ where: { id: staffId } });
  }
  revalidatePath("/admin/staff");
  back();
}