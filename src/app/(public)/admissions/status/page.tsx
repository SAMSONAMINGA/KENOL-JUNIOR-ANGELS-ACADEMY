import { cookies } from "next/headers";
import { Fraunces, Manrope } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { db } from "@/lib/db";
import { levelLabel } from "@/lib/levels";
import { isStatus, STATUS_COLOR, STATUS_LABEL, type StatusCode } from "@/lib/status";
import { STATUS_COOKIE_NAME, verifyStatusToken } from "@/lib/admissions-status";
import LookupForm from "./LookupForm";
import { signOutStatus } from "./actions";

const display = Fraunces({ subsets: ["latin"], weight: ["500", "600"], style: ["normal", "italic"], variable: "--font-display" });
const body = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Application Status | Kenol Junior Angels Academy",
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};

const date = (value: Date) =>
  value.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const RESULT_STATUSES = new Set<StatusCode>(["APPROVED", "ENROLLED", "WAITLISTED", "REJECTED"]);
const RESULT_RECONFIRM_SECONDS = 24 * 60 * 60;

export default async function ApplicationStatusPage() {
  const cookieStore = await cookies();
  const savedToken = cookieStore.get(STATUS_COOKIE_NAME)?.value;
  const session = verifyStatusToken(savedToken);
  const application = session
    ? await db.application.findUnique({
        where: { id: session.applicationId },
        select: { childName: true, level: true, status: true, createdAt: true, updatedAt: true },
      })
    : null;

  const validStatus = application && isStatus(application.status) ? application.status : null;
  const colors = validStatus ? STATUS_COLOR[validStatus] : null;
  const needsResultConfirmation =
    Boolean(validStatus && RESULT_STATUSES.has(validStatus) && session && Date.now() / 1000 - session.iat > RESULT_RECONFIRM_SECONDS);

  return (
    <>
      <Header />
      <main className={`${display.variable} ${body.variable} min-h-[60vh] px-6 py-14 sm:px-10 md:py-20`} style={{ background: "#fbf5ec", fontFamily: "var(--font-body)" }}>
        <section className="mx-auto max-w-2xl rounded-2xl border border-[#eadfce] bg-white p-6 shadow-sm sm:p-10">
          <span className="mb-5 block h-1 w-16 rounded-full bg-[#e8b23d]" />
          <h1 className="text-4xl italic leading-tight text-[#2a0d0d] sm:text-5xl" style={{ fontFamily: "var(--font-display)" }}>
            Application status
          </h1>

          {application && validStatus && colors ? (
            <>
              <p className="mt-4 text-lg leading-8 text-[#4a3636]">
                Progress for <span className="font-semibold">{application.childName}</span>
              </p>
              <div className="mt-7 rounded-xl border border-[#eadfce] bg-[#fdfaf5] p-5 sm:p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-[#6e0000]">Current status</p>
                {needsResultConfirmation ? (
                  <p className="mt-2 leading-7 text-[#4a3636]">
                    Your application has an update. For privacy, confirm the application details again to see the current decision.
                  </p>
                ) : (
                  <p className="mt-1 inline-flex rounded-full px-4 py-2 text-lg font-bold" style={{ background: colors.bg, color: colors.fg }}>
                    {STATUS_LABEL[validStatus]}
                  </p>
                )}
                <dl className="mt-5 space-y-3 text-[#4a3636]">
                  <div className="flex flex-wrap justify-between gap-2 border-t border-[#eadfce] pt-3">
                    <dt className="font-semibold">Level applied for</dt>
                    <dd>{levelLabel(application.level)}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-t border-[#eadfce] pt-3">
                    <dt className="font-semibold">Application received</dt>
                    <dd>{date(application.createdAt)}</dd>
                  </div>
                  <div className="flex flex-wrap justify-between gap-2 border-t border-[#eadfce] pt-3">
                    <dt className="font-semibold">Last updated</dt>
                    <dd>{date(application.updatedAt)}</dd>
                  </div>
                </dl>
              </div>
              <p className="mt-5 text-sm leading-6 text-[#6a5555]">
                For questions about your application, please call the school on 0723 248 400.
              </p>
              {needsResultConfirmation && <LookupForm />}
              <form action={signOutStatus} className="mt-7">
                <button type="submit" className="rounded-full border border-[#6e0000] px-6 py-3 font-semibold text-[#6e0000] hover:bg-red-50">
                  Not your device? Sign out
                </button>
              </form>
            </>
          ) : (
            <>
              <p className="mt-4 leading-7 text-[#4a3636]">
                Enter the reference number and parent or guardian phone number used for the application to see its progress.
              </p>
              {savedToken && (
                <p className="mt-4 rounded-lg bg-[#fdf4e7] px-4 py-3 text-sm text-[#6a4a20]">
                  Your saved check-in is no longer available. Please enter the application details again.
                </p>
              )}
              <LookupForm />
              {savedToken && (
                <form action={signOutStatus} className="mt-5">
                  <button type="submit" className="rounded-full border border-[#6e0000] px-6 py-3 font-semibold text-[#6e0000] hover:bg-red-50">
                    Not your device? Sign out
                  </button>
                </form>
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
