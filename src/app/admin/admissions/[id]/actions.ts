"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { requireStaff, requireOwner } from "@/lib/auth";
import { isStatus } from "@/lib/status";

export async function updateStatus(applicationId: string, form: FormData) {
  await requireStaff();

  const status = String(form.get("status") ?? "");
  if (!isStatus(status)) return;

  const exists = await db.application.findUnique({ where: { id: applicationId } });
  if (!exists) return;

  await db.application.update({ where: { id: applicationId }, data: { status } });
  revalidatePath(`/admin/admissions/${applicationId}`);
  revalidatePath("/admin/admissions");
}

export async function addNote(applicationId: string, form: FormData) {
  const staff = await requireStaff();

  const body = String(form.get("body") ?? "").trim().slice(0, 1000);
  if (!body) return;

  const exists = await db.application.findUnique({ where: { id: applicationId } });
  if (!exists) return;

  await db.$transaction([
    db.note.create({ data: { body, applicationId, authorId: staff.id } }),
    db.application.update({ where: { id: applicationId }, data: { updatedAt: new Date() } }),
  ]);
  revalidatePath(`/admin/admissions/${applicationId}`);
}

export async function deleteApplication(applicationId: string, form: FormData) {
  await requireOwner();

  const app = await db.application.findUnique({ where: { id: applicationId } });
  if (!app) redirect("/admin/admissions");

  if (String(form.get("confirm") ?? "").trim() !== app.reference) {
    redirect(`/admin/admissions/${applicationId}?error=confirm`);
  }

  await db.application.delete({ where: { id: applicationId } });
  revalidatePath("/admin/admissions");
  redirect("/admin/admissions");
}