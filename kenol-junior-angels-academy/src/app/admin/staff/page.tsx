import Link from "next/link";
import { db } from "@/lib/db";
import { requireOwner } from "@/lib/auth";
import { createStaff, deleteStaff, resetPassword, setActive } from "./actions";

export const dynamic = "force-dynamic";

const field = "w-full rounded-sm px-3 py-2.5";
const fieldStyle = { border: "1px solid #d9c9b4" } as const;

export default async function StaffPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const owner = await requireOwner();
  const sp = await searchParams;
  const staff = await db.staffUser.findMany({ orderBy: [{ role: "asc" }, { createdAt: "asc" }] });

  return (
    <main className="min-h-screen px-4 py-8 sm:px-8" style={{ background: "#fbf5ec", color: "#2a0d0d" }}>
      <div className="mx-auto max-w-4xl">
        <Link href="/admin/admissions" className="text-sm font-semibold underline" style={{ color: "#6e0000" }}>
          &larr; Admissions
        </Link>
        <h1 className="mb-6 mt-4 text-3xl font-bold" style={{ color: "#6e0000" }}>Staff accounts</h1>

        {sp.error && (
          <p role="alert" className="mb-6 rounded-sm px-4 py-3 font-semibold" style={{ background: "#fbe9d0", color: "#7a2e00" }}>
            {sp.error}
          </p>
        )}

        <section className="mb-8 rounded-sm bg-white p-6" style={{ border: "1px solid #e2d5c4" }}>
          <h2 className="mb-4 text-xl font-bold">Add a staff member</h2>
          <form action={createStaff} className="grid gap-4 sm:grid-cols-3">
            <input name="name" placeholder="Full name" required className={field} style={fieldStyle} />
            <input name="phone" type="tel" placeholder="Phone (their login)" required className={field} style={fieldStyle} />
            <input name="password" type="password" placeholder="Password (8+ characters)" required minLength={8} className={field} style={fieldStyle} />
            <button className="rounded-full px-5 py-2.5 font-semibold text-white sm:col-span-3 sm:w-fit" style={{ background: "#6e0000" }}>
              Create account
            </button>
          </form>
        </section>

        <section className="space-y-4">
          {staff.map((s) => {
            const isOwner = s.role === "OWNER";
            return (
              <div key={s.id} className="rounded-sm bg-white p-5" style={{ border: "1px solid #e2d5c4", opacity: s.active ? 1 : 0.65 }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <p className="text-lg font-bold">
                      {s.name}
                      {isOwner && <span className="ml-2 text-sm font-semibold" style={{ color: "#6e0000" }}>Owner</span>}
                      {!s.active && <span className="ml-2 text-sm font-semibold" style={{ color: "#7a2222" }}>Deactivated</span>}
                    </p>
                    <p className="text-sm" style={{ color: "#4a3636" }}>{s.phone}</p>
                  </div>

                  {!isOwner && s.id !== owner.id && (
                    <div className="flex gap-2">
                      <form action={setActive.bind(null, s.id, !s.active)}>
                        <button className="rounded-full border-2 px-4 py-1.5 text-sm font-semibold" style={{ borderColor: "#6e0000", color: "#6e0000" }}>
                          {s.active ? "Deactivate" : "Reactivate"}
                        </button>
                      </form>
                      <form action={deleteStaff.bind(null, s.id)}>
                        <button className="rounded-full px-4 py-1.5 text-sm font-semibold text-white" style={{ background: "#7a2222" }}>
                          Delete
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                <form action={resetPassword.bind(null, s.id)} className="mt-4 flex flex-wrap gap-3">
                  <input name="password" type="password" placeholder="New password (8+ characters)" required minLength={8}
                    className="min-w-[14rem] flex-1 rounded-sm px-3 py-2" style={fieldStyle} />
                  <button className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: "#6e0000" }}>
                    Reset password
                  </button>
                </form>
              </div>
            );
          })}
        </section>

        <p className="mt-6 text-sm" style={{ color: "#4a3636" }}>
          Deleting someone who has written notes deactivates them instead, so
          the notes keep their author. They can&rsquo;t sign in either way.
          Resetting a password or deactivating an account signs that person out everywhere immediately.
        </p>
      </div>
    </main>
  );
}